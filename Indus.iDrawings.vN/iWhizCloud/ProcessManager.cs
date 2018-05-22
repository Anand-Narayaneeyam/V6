////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.IO;
using Newtonsoft.Json;
using NetMQ;
using System.Net;
using System.Net.Sockets;
using NetMQ.Sockets;
using Microsoft.AspNet.SignalR;
using System.Threading;
using Indus.iDrawings.Common;

namespace Indus.iDrawings.vN
{
    public class ProcessManager
    {

        private Dictionary<string, Process> m_runningProcesses;      
        /////////////////////////////////////////////EDIT MODE////////////////////////////////////////////////////////

        private NetMQSocket m_Socket;
        public Process m_Proc;
        public bool m_IsBusy = false;
        public string m_ConnectionString;
        public string m_IPAddress = "127.0.0.1:";
        private object syncLock = new object();
        private object queueLock = new object();

        //For GS Update 
        private NetMQPoller m_poller;
        public string m_gsConnectionString;
        public string m_ConnectionId;

        public bool m_IsFirstCache;
        public ManualResetEvent[] m_WaitOpen = new ManualResetEvent[2];
        public string m_CacheString;

        public ManualResetEvent[] m_WaitCommand = new ManualResetEvent[1];
        public event EventHandler Changed;

        PullSocket m_GsSocket = new PullSocket();
        public struct CommandData
        {
            public List<string> m_Commands;
            public Func<List<string>, short> m_Callback;
        }

        public Queue<CommandData> m_CommandQueue;

        /////////////////////////////////////////////EDIT MODE////////////////////////////////////////////////////////
        public ProcessManager()
        {
            m_runningProcesses = new Dictionary<string, Process>();        
            m_IsFirstCache = false;
            m_WaitOpen[0] = new ManualResetEvent(false);
            m_WaitOpen[1] = new ManualResetEvent(false);
            m_WaitCommand[0] = new ManualResetEvent(false);
            m_CommandQueue = new Queue<CommandData>();
        }
        protected virtual void OnChanged()
        {
            if (Changed != null) Changed(this, EventArgs.Empty);
        }

        public void ResetEvents()
        {
            m_WaitOpen[0].Reset();
            m_WaitOpen[1].Reset();
        }

        public Process runService(string id, string servicePath, object args)
        {
            Process childProc = new Process();
            childProc.StartInfo.FileName = servicePath;
            childProc.StartInfo.Arguments = args.ToString();///JsonConvert.SerializeObject(args,Formatting.Indented).Replace(","," ");//String.Join(" ",args);
            childProc.StartInfo.UseShellExecute = false;
            childProc.StartInfo.RedirectStandardOutput = true;
            childProc.EnableRaisingEvents = true;

            childProc.Start();

            if (childProc.Id > 0)
            {
                if (id != "")
                    id = Path.GetFileNameWithoutExtension(servicePath) + childProc.Id;

                m_runningProcesses[id] = childProc;
                Console.WriteLine(childProc.Id + servicePath);
                childProc.Exited += (sender, e) => {
                    m_runningProcesses.Remove(id);
                    Debug.WriteLine("closed" + id + "from");//+ Object.keys(runningProcesses)
                };

                childProc.ErrorDataReceived += (sender, e) => {
                    Debug.WriteLine(id + childProc.Id + ':' + e.Data.ToString());
                };


                return childProc;
            }
            return null;
        }

        public Process runTxHost(object args, string servicePath)
        {
            string[] parameters;

            if (args.GetType().ToString() == "string")
            {
                parameters = args.ToString().Split(' ');
                return runService(null, servicePath + "\\TXHost.exe", parameters);
            }
            else
                return runService(null, servicePath + "\\TXHost.exe", args);
        }

        /////////////////////////////////////////////EDIT MODE - Zero MQ////////////////////////////////////////////////////////
        public void initSockets(string ConnectionId)
        {
            m_ConnectionId = ConnectionId;
            m_ConnectionString = m_IPAddress + FreeTcpPort();
            m_Socket = new RequestSocket();
            m_Socket.Connect("tcp://" + m_ConnectionString);

            //////////////////////////////////
            //AppSettings appSettings = new AppSettings();
            //string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
            //FileLocation = Path.Combine(FileLocation, "connection ports.txt");       
            //File.AppendAllText(FileLocation, m_ConnectionString + Environment.NewLine);
            //////////////////////////////////

            //For GS Update
            EventHandler<NetMQSocketEventArgs> handleMessage = (sender, args) =>
            {
                lock (syncLock)
                {
                    PullSocket GsSocket = (PullSocket)args.Socket;
                    sendCache(GsSocket);
                }
            };
            lock (syncLock)
            {
                m_gsConnectionString = "tcp://" + m_IPAddress + FreeTcpPort();
                //PullSocket m_GsSocket = new PullSocket();
                m_poller = new NetMQPoller();

                m_GsSocket.ReceiveReady += handleMessage;
                m_poller.Add(m_GsSocket);
                m_GsSocket.Connect(m_gsConnectionString);
                m_poller.RunAsync();
            }
        }

        private void sendCache(PullSocket GsSocket)
        {
            try
            {
                if (GsSocket != null)
                {
                    List<byte[]> CacheList = GsSocket.ReceiveMultipartBytes();
                    if (CacheList != null)//
                    {
                        foreach (byte[] Cache in CacheList)
                        {                            
                            //if (!m_IsFirstCache)
                            {
                                byte[] CompressedCache = CompressionHelper.DeflateByteByDefault(Cache);
                                var context = Microsoft.AspNet.SignalR.GlobalHost.ConnectionManager.GetHubContext("UpdateHub");
                                if (CompressedCache.Length > 90000)
                                {
                                    List<byte[]> SplittedArray = SplitByteArraytoChunks(CompressedCache, 80000);
                                    context.Clients.Client(m_ConnectionId).updateCache("", SplittedArray.Count);
                                    foreach (byte[] Chunk in SplittedArray)
                                    {
                                        string finalMsg = Convert.ToBase64String(Chunk);
                                        context.Clients.Client(m_ConnectionId).updateCache(finalMsg, 0, m_IsFirstCache).Wait();
                                    }
                                }
                                else
                                {
                                    context.Clients.Client(m_ConnectionId).updateCache(Convert.ToBase64String(CompressedCache), 0, m_IsFirstCache);
                                }
                            }
                            //else
                            if (m_IsFirstCache)
                            {
                                //////////
                                // AppSettings appSettings = new AppSettings();
                                //string strFilePath = Common.ServicePath;//appSettings[AppSettingsKey.FileLocation].Value;
                                //strFilePath = Path.Combine(strFilePath, "OpenTime.txt");
                                //DateTime curTime = DateTime.Now;
                                //string strToWrite = "First cache: h: " + curTime.Hour.ToString() + ",m: " + curTime.Minute.ToString() + ",s: " + curTime.Second.ToString() + Environment.NewLine;
                                //File.AppendAllText(strFilePath, strToWrite);
                                //////////

                                // m_CacheString = Convert.ToBase64String(Cache);
                                m_IsFirstCache = false;
                                m_WaitOpen[0].Set();
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }
        }

        public List<byte[]> SplitByteArraytoChunks(byte[] Source, int BlockLength)
        {
            List<byte[]> SplittedArray = new List<byte[]>();
            byte[] buffer;//= new byte[BlockLength];
            int PendingLength = Source.Length;
            // ASSUMES SOURCE IS padded to BlockLength
            for (int i = 0; i < Source.Length; i += BlockLength)
            {
                if (PendingLength > BlockLength)
                {
                    buffer = new byte[BlockLength];
                    Buffer.BlockCopy(Source, i, buffer, 0, BlockLength);
                }
                else
                {
                    buffer = new byte[PendingLength];
                    Buffer.BlockCopy(Source, i, buffer, 0, PendingLength);
                }
                SplittedArray.Add(buffer);
                PendingLength -= BlockLength;
            }
            return SplittedArray;
        }
        
        public short runTxHostZMQ(string servicePath, List<string> args)
        {
            string commands = String.Join(" ", args.ToArray());
            m_Proc = runService(null, servicePath + "\\TXHost.exe", commands);
            executeFromQueue();
            string requestText = "handshake";
            m_Socket.SendFrame(requestText);

            List<string> msg = m_Socket.ReceiveMultipartStrings().ToList();

            if (msg.Count > 1)
            {
                short retCode = Convert.ToInt16(msg[0].Replace("\"", ""));
                return retCode;
            }
            else
            {
                return 0;
            }
        }
        
        public short executeCommand(List<string> args, ref List<string> outputs)
        {
            try
            {
                List<string> outList = new List<string>();
                short retCode = 0;

                ManualResetEvent[] WaitCommand = new ManualResetEvent[1];
                WaitCommand[0] = new ManualResetEvent(false);
                Thread commandExecute = new Thread(() =>
                {
                    Func<List<string>, short> callback = (outparams) =>
                    {

                        if (outparams.Count != 0)
                        {
                            int retValue;
                            bool isNumerical = int.TryParse(outparams[0], out retValue);

                            if (isNumerical)
                            {
                                retCode = Convert.ToInt16(outparams[0]);
                                outList = outparams;
                                outparams.RemoveAt(0);
                            }
                            else
                            {
                                int index = outparams.FindIndex(item => int.TryParse(item, out retValue));
                                outparams.RemoveRange(0, index );
                                retCode = Convert.ToInt16(outparams[0]);
                                outList = outparams;
                                outparams.RemoveAt(0);
                                //retCode = -1;
                                //outList = outparams;
                            }
                                
                        }
                        else
                            retCode = 0;

                        WaitCommand[0].Set();
                        return 0;
                    };
                    CommandData objTemp = new CommandData();
                    objTemp.m_Commands = args;
                    objTemp.m_Callback = callback;
                    lock (queueLock)
                    {
                        m_CommandQueue.Enqueue(objTemp);
                        if(m_CommandQueue.Count == 1) OnChanged();
                    }

                });
                commandExecute.Start();
                WaitHandle.WaitAll(WaitCommand);

                outputs = outList;
                return retCode;
            }
            catch (Exception e)
            {
                return 9;
            }
        }

        public void executeFromQueue()
        {          
            this.Changed += new EventHandler ((sender, args) =>
            {
                while (m_CommandQueue.Count > 0)
                {
                    CommandData objTemp;
                    lock (queueLock)
                    {
                        objTemp = m_CommandQueue.Dequeue();
                        List<string> outputs = new List<string>();
                        short retCode = runCommand(objTemp.m_Commands, ref outputs);
                        objTemp.m_Callback(outputs);
                    }
                }
            });
        }

        public short runCommand(List<string> args, ref List<string> outputs)
        {
            try
            {
                m_IsBusy = true;
                outputs = new List<string>();
                
                if(args.Contains(null))
                {
                    AppSettings appSettings = new AppSettings();
                    string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                    FileLocation = Path.Combine(FileLocation, "NullInput.txt");
                    string textToWrite = "";
                    foreach (string s in args)
                    {
                        textToWrite += s + ",";
                    }
                    File.AppendAllText(FileLocation, textToWrite + Environment.NewLine);
                    outputs.Insert(0, "141");
                    return 141;
                }
                foreach (string s in args)
                {
                    string command = s.Replace("\n", "\\n").ToString();
                    command = command.Replace("\r", "\\r").ToString();
                    command = command.Replace("\t", "\\t").ToString();
                    command = command.Replace("\"", "\'").ToString();
                    
                    m_Socket.SendFrame("\"" + command + "\"");
                    outputs = m_Socket.ReceiveMultipartStrings().ToList();

                }
                
                if (args.Contains("Streaming"))
                {
                    m_IsFirstCache = true;
                }
                if (outputs.Count > 1)
                {
                    if (outputs[1] == "goodbye")
                    {
                        outputs.Clear();
                        return 0;
                    }
                   // Dictionary<string, object> result = JsonConvert.DeserializeObject<Dictionary<string, object>>(outputs[0]);
                   // short retCode = Convert.ToInt16(result["msg"].ToString());
                    short retCode = Convert.ToInt16(outputs[0].Replace("\"", ""));

                    // outputs.RemoveAt(0);
                    outputs.RemoveAt(outputs.Count - 1);
                    for (int i = 0; i < outputs.Count; i++)
                    {
                        //result = JsonConvert.DeserializeObject<Dictionary<string, object>>(outputs[0]);
                        //outputs[i] = result["msg"].ToString();
                         outputs[i] = outputs[i].Replace("\"", "");
                    }


                    m_IsBusy = false;
                    return retCode;
                }
                else if (outputs.Count == 1)
                {
                    if (outputs[0] == "Command")
                        outputs.Clear();
                    m_IsBusy = false;
                    return 0;
                }
                else
                {
                    m_IsBusy = false;
                    return 0;
                }
            }
            catch (Exception e)
            {
                return 9;
            }

        }
      
        public void killProcess()
        {
            ResetEvents();
            if(m_Proc != null)
            {
                if (!m_Proc.HasExited)
                    m_Proc.Kill();
            }
            m_poller.Stop();
            
            m_GsSocket.Close();
            
            m_Socket.Close();
            return;
        }

        public bool IsExited()
        {
            if (m_Proc != null)
                return m_Proc.HasExited;
            else
                return false;
        }

        public static string FreeTcpPort()
        {
            TcpListener l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();
            int port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port.ToString();
        }

        /////////////////////////////////////////////EDIT MODE////////////////////////////////////////////////////////
    }
}

////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////