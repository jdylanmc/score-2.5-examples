using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Score.Data.Extensions;
using Score.UI.Data.DatasourceItems;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace sc821.Custom.Items
{
    public class DateSettings : ScoreUIItem
    {
        public static readonly ID TemplateId = ID.Parse("{10A1C72C-7AA6-4C5D-BB29-48D1F96661E6}");

        public DateSettings(Item item) : base(item)
        {
        }

        public static class Fields
        {
            public static string DateFormat = "Date Format";
        }

        public string DateFormat
        {
            get { return this.InnerItem.Fields[Fields.DateFormat]?.ToString(); }
        }

        public static DateSettings FindDateSettings()
        {
            var startItem = Sitecore.Context.Item;
            var root = startItem.Axes.GetAncestors().Where(x => x.IsDerived(ID.Parse("{1469DFF6-C07C-4EAA-9E07-2D42D996E57E}")));
            var path = root + "/Settings/Date Settings";
            return Sitecore.Context.Database.GetItem(path);
        }

        #region implicit casting
        public static implicit operator DateSettings(Item innerItem)
        {
            return innerItem != null && innerItem.IsDerived(TemplateId) ? new DateSettings(innerItem) : null;
        }

        public static implicit operator Item(DateSettings customItem)
        {
            return customItem != null ? customItem.InnerItem : null;
        }
        #endregion

        public static bool TryParse(Item item, out DateSettings parsedItem)
        {
            parsedItem = item == null || item.IsDerived(TemplateId) == false ? null : new DateSettings(item);
            return parsedItem != null;
        }
    }
}
