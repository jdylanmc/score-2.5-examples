using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sc821.Custom.Items;
using Score.UI.Data.RenderingParameters;
using Score.UI.Web.Areas.ScoreUI.Models;

namespace sc821.Web.Areas.sc821.Models
{
    public class ArticleDescriptionModel : RenderingModelBase<BaseComponentParameters>
    {
        public ArticleDescriptionModel() : base("article-description") { }

        public ArticlePageBase ArticlePage
        {
            get { return this.PageItem; }
        }

        public string ArticleDescriptionField
        {
            get { return ArticlePageBase.Fields.ArticleDescription; }
        }
    }
}