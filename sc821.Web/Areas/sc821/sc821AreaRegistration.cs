using System.Web.Mvc;

namespace sc821.Web.Areas.sc821
{
    public class sc821AreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "sc821";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            // Register your MVC routes in here
        }
    }
}
