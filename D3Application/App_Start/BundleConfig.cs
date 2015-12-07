using System.Web;
using System.Web.Optimization;

namespace D3Application
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            //bundles.Add(new ScriptBundle("~/bundles/require").Include(
            //            "~/Scripts/require.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/d3/d3.min.js",
                      "~/Scripts/lodash.min.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/moment.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/apps").Include(
                      "~/Scripts/apps/main.js",
                      "~/Scripts/apps/d3Legend.js",
                      "~/Scripts/apps/barchart.js",
                      "~/Scripts/apps/MultilineChart.js"));

        }
    }
}
