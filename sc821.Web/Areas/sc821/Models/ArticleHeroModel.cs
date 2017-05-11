using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sc821.Custom.Items;
using Score.UI.Data.RenderingParameters;
using Score.UI.Web.Areas.ScoreUI.Models;

namespace sc821.Web.Areas.sc821.Models
{
    public class ArticleHeroModel : RenderingModelBase<BaseComponentParameters>
    {
        public ArticleHeroModel() : base("article-hero") { }

        public ArticlePageBase ArticlePage
        {
            get { return this.PageItem; }
        }

        public string DateFormat
        {
            get { return "MMM, Do YYYY"; } // DateSettings.FindDateSettings().DateFormat; }
        }

        public string ArticleType
        {
            get { return this.ArticlePage.ArticleType.Text; }
        }

        public DateTime ArticleDate
        {
            get { return this.ArticlePage.ArticleDatetime; }
        }
    }
}