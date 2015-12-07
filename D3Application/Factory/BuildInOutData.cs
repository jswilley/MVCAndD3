using D3Application.Models;
using D3Application.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace D3Application.Factory
{
    public class BuildInOutData
    {

        public static InOutDTO GetData(string aggregate, DateTime startDate, DateTime endDate)
        {
            var inOutSrvc = new InOutService();
            var inOutHistory = new InOutDTO();
            string fpath = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            inOutHistory.InHistory = inOutSrvc.GetInHistory(aggregate, startDate, endDate, fpath).ToList<KeyValuePair<DateTime, int>>();
            inOutHistory.OutHistory = inOutSrvc.GetOutHisotry(aggregate, startDate, endDate, fpath).ToList<KeyValuePair<DateTime, int>>();
            inOutHistory.Aggregate = aggregate;

            
            AggregateData(inOutHistory);
            setMinMaxValues(inOutHistory);
            return inOutHistory;
        }

        private static void setMinMaxValues(InOutDTO inOutHistory)
        {
            inOutHistory.StartDate = inOutHistory.InHistory.Min(a => a.Key);
            inOutHistory.EndDate = inOutHistory.InHistory.Max(a => a.Key);

            var minCntIn = inOutHistory.InHistory.Min(a => a.Value);
            var maxCntIn = inOutHistory.InHistory.Max(a => a.Value);

            var minCntOut = inOutHistory.OutHistory.Min(a => a.Value);
            var maxCntOut = inOutHistory.OutHistory.Max(a => a.Value);

            inOutHistory.MinCount = minCntIn < minCntOut ? minCntIn : minCntOut;
            inOutHistory.MaxCount = maxCntIn > maxCntOut ? maxCntIn : maxCntOut;
        }

        private static InOutDTO AggregateData(InOutDTO data)
        {
            if (data.Aggregate.ToLower() == "day") return data;

            if (data.Aggregate.ToLower() == "month")
            {
                
                var query = data.InHistory.GroupBy(i => i.Key.Year * 100 + i.Key.Month)
              .Select(g => new
              {
                  Key = new DateTime(int.Parse(g.Key.ToString().Substring(0, 4)), int.Parse(g.Key.ToString().Substring(4, 2)), 1),
                  Value = g.Average(i => i.Value)
              }).ToList();
           
                data.InHistory = new List<KeyValuePair<DateTime,int>>();

                foreach(var kval in query)
                {
                    data.InHistory.Add(new KeyValuePair<DateTime, int>(kval.Key, Convert.ToInt32(kval.Value)));
                }

                query = data.OutHistory.GroupBy(i => i.Key.Year * 100 + i.Key.Month)
              .Select(g => new
              {
                  Key = new DateTime(int.Parse(g.Key.ToString().Substring(0, 4)), int.Parse(g.Key.ToString().Substring(4, 2)), 1),
                  Value = g.Average(i => i.Value)
              }).ToList();

                data.OutHistory = new List<KeyValuePair<DateTime, int>>();

                foreach (var kval in query)
                {
                    data.OutHistory.Add(new KeyValuePair<DateTime, int>(kval.Key, Convert.ToInt32(kval.Value)));
                }

                return data;
            }
            else
            {
                return data;
            }

        }
    }
}