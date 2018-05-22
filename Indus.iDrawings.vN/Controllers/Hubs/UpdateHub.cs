using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace Indus.iDrawings.vN
{
    public class UpdateHub : Hub
    {     
        public override Task OnConnected()
        {
            string UserId = Context.User.Identity.GetUserId();// (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//"0";// Context.User.Identity.GetUserId();
            string ConnectionId;
            if(UserId != null)
            {
                if (DrawingHost.UsertoConnction.TryGetValue(UserId, out ConnectionId))
                {
                    DrawingHost.UsertoConnction.Remove(UserId.ToString());
                }
                ConnectionId = Context.ConnectionId;
                DrawingHost.UsertoConnction.Add(UserId, ConnectionId);
            }
            return base.OnConnected();
        }             
    }
}