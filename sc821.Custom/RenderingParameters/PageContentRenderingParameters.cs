using Score.Data.Extensions;
using Score.UI.Data.RenderingParameters;
using Sitecore.Mvc.Presentation;

namespace sc821.Custom.RenderingParameters
{
    public class PageContentRenderingParameters : BaseComponentParameters
    {
        public static class Fields
        {
            public static string FieldName = "Field Name";
            public static string Markup = "Markup";
        }

        public string FieldName { get; set; }
        public string Markup { get; set; }

        public override void LoadRenderingParameters(Rendering rendering)
        {
            base.LoadRenderingParameters(rendering);
            this.FieldName = rendering.Parameters.GetUserFriendlyValue(Fields.FieldName);
            this.Markup = rendering.Parameters.GetUserFriendlyValue(Fields.Markup);
        }
    }
}
