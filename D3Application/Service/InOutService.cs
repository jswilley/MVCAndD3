using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace D3Application.Service
{
    public class InOutService
    {
        internal IEnumerable<KeyValuePair<DateTime, int>> GetOutHisotry(string aggregate, DateTime startDate, DateTime endDate, string fpath)
        {
            return LoadDataFromFile(fpath+@"\OutHistory.json");
        }

        internal IEnumerable<KeyValuePair<DateTime, int>> GetInHistory(string aggregate, DateTime startDate, DateTime endDate, string fpath)
        {

            return LoadDataFromFile(fpath+@"\InHistory.json");
        }


        private IEnumerable<KeyValuePair<DateTime, int>> LoadDataFromFile(string filePath)
        {
            var KeyValDto = new List<KeyValuePair<DateTime, int>>();
                
                    using (StreamReader file = File.OpenText(filePath))
                    {
                        JsonSerializer serializer = new JsonSerializer();
                        var json = serializer.Deserialize(file, typeof(List<KeyValuePair<DateTime, int>>));
                        KeyValDto.AddRange(json as IEnumerable<KeyValuePair<DateTime, int>>);
                    }

                    return KeyValDto.OrderBy(a => a.Key).ToList();
                
                   }
    }
}