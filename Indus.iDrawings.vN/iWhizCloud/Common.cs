////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

using System.IO;

namespace Indus.iDrawings.vN
{
    static class Common
    {
        public static FileStorage FS = new FileStorage();
        public static string CommandDelimieter = "";
        //public static string ServicePath;
    }

    public class CompressionHelper
    {
        public static byte[] DeflateByte(byte[] str)
        {
            if (str == null)
            {
                return null;
            }

            using (var output = new MemoryStream())
            {
                using (
                    var compressor = new Ionic.Zlib.DeflateStream(
                    output, Ionic.Zlib.CompressionMode.Compress,
                    Ionic.Zlib.CompressionLevel.BestSpeed))
                {
                    compressor.Write(str, 0, str.Length);
                }

                return output.ToArray();
            }
        }
        public static byte[] DeflateByteByDefault(byte[] str)
        {
            if (str == null)
            {
                return null;
            }
            return Ionic.Zlib.ZlibStream.CompressBuffer(str);
        }
    }
}
////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////