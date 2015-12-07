using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(D3Application.Startup))]
namespace D3Application
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
