using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Score.Data.Extensions;
using Score.Data;
using Score.UI.Data.DatasourceItems;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Score.Data.Items.Base;

namespace sc821.Custom.Items
{
    public class ArticlePageBase : ScoreUIItem
    {
        public static readonly ID TemplateId = ID.Parse("{95AF041F-3DF7-435A-B717-1A3593F49943}");

        public static class Fields
        {
            public static string ArticleDate = "Article Date";
            public static string ArticleTitle = "Article Title";
            public static string ArticleDescription = "Article Description";
            public static string ArticleAuthor = "Article Author";
            public static string ArticleThumbnail = "Article Thumbnail";
            public static string ArticleType = "Article Type";
        }

        public DateField ArticleDate
        {
            get { return this.InnerItem.Fields[Fields.ArticleDate]; }
        }

        public string ArticleTitle
        {
            get { return this.InnerItem.Fields[Fields.ArticleTitle]?.Value; }
        }

        public string ArticleDescription
        {
            get { return this.InnerItem.Fields[Fields.ArticleDescription]?.Value; }
        }

        public string ArticleAuthor
        {
            get { return this.InnerItem.Fields[Fields.ArticleAuthor]?.Value; }
        }

        public ImageField ArticleThumbnail
        {
            get { return (ImageField)this.InnerItem.Fields[Fields.ArticleThumbnail]; }
        }

        public ListItem ArticleType
        {
            get
            {
                var targetId = ((ReferenceField)this.InnerItem.Fields[Fields.ArticleType]).TargetID;
                var database = ((ReferenceField)this.InnerItem.Fields[Fields.ArticleType]).Database;
                return database.GetItem(targetId, Sitecore.Context.Language);
            }
        }

        public DateTime ArticleDatetime
        {
            get { return this.ArticleDate.DateTime; }
        }

        public ArticlePageBase(Item item) : base(item)
        {
        }

        #region implicit casting
        public static implicit operator ArticlePageBase(Item innerItem)
        {
            return innerItem != null && innerItem.IsDerived(TemplateId) ? new ArticlePageBase(innerItem) : null;
        }

        public static implicit operator Item(ArticlePageBase customItem)
        {
            return customItem != null ? customItem.InnerItem : null;
        }
        #endregion

        public static bool TryParse(Item item, out ArticlePageBase parsedItem)
        {
            parsedItem = item == null || item.IsDerived(TemplateId) == false ? null : new ArticlePageBase(item);
            return parsedItem != null;
        }
    }

}
