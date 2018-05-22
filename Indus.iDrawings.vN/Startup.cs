using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
using System;

[assembly: OwinStartupAttribute(typeof(Indus.iDrawings.vN.Startup))]
namespace Indus.iDrawings.vN
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(110);
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromSeconds(90);//this should be three times of keepalive
            GlobalHost.Configuration.KeepAlive = TimeSpan.FromSeconds(30);//default value 10

            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
            // Branch the pipeline here for requests that start with "/signalr"
            app.Map("/updategs", map =>
            {
                // Setup the CORS middleware to run before SignalR.
                // By default this will allow all origins. You can 
                // configure the set of origins and/or http verbs by
                // providing a cors options with a different policy.
                // map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    // EnableJSONP = true
                };
                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch already runs under the "/signalr"
                // path. 
                map.RunSignalR(hubConfiguration);
            });
            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

        }
    }
}
