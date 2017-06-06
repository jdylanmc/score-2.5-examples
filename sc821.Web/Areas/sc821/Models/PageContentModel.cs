using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sc821.Custom.RenderingParameters;
using Score.UI.Web.Areas.ScoreUI.Models;
using Sitecore.Mvc.Presentation;

namespace sc821.Web.Areas.sc821.Models
{
    public class PageContentModel : RenderingModelBase<PageContentRenderingParameters>
    {
        public PageContentModel() : base("page-content") { }

        public string Markup { get; set; }

        public string Field { get; set; }

        public bool Initialized
        {
            get
            {
                return !string.IsNullOrWhiteSpace(this.Markup) && !string.IsNullOrWhiteSpace(this.Field);
            }
        }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            this.Markup = this.RenderingParameters.Markup;
            this.Field = this.RenderingParameters.FieldName;
        }
    }
}