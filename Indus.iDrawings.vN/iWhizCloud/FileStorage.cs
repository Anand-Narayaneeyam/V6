////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace Indus.iDrawings.vN
{
    public class FileStorage
    {
        public FileStorage()
        {          
           
        }
        public void createFolder(string strFolderPath)
        {
            if (Directory.Exists(strFolderPath))
            return;

            Console.WriteLine("Create folder " +  strFolderPath);

            char[] splitChar = {'\\','/'};
            List<string> list = strFolderPath.Split(splitChar).ToList();

            string iter = "";
            for (var i = 0; i < list.Count; ++i) {
                string fld = list[i];
                if (fld == "" && i == 0) {
                  iter = "\\";
                  continue;
                }
                iter = (iter == "" ) ? fld : string.Concat(iter,  "\\"+fld);

                if (!Directory.Exists(iter))
                {
                    Console.WriteLine("  mkdirSync" + iter);
                    Directory.CreateDirectory(iter);
                }
              }
         }

        public void clearFolder (string strFolderPath)
        {  
            if(Directory.Exists(strFolderPath))
            {
                Console.WriteLine("Clear folder" + strFolderPath);
                Directory.Delete(strFolderPath, true);
            }       
        }
      
        public void createPath (string path) 
        {
            if (!Directory.Exists(path)) 
            this.createFolder(path);
        }

        public int getFilesCount (string folder)
        {
          return File.ReadAllText(folder).Length;
        }

        public long getFilesSize(string folder)
        {
            long size = 0;
            size = new FileInfo(folder).Length;           
            return size;
        }
    }
}
////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////