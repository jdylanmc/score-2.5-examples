using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Score.Data.ContentSearch;
using Sitecore.ContentSearch;

namespace sc821.Custom.Pipelines
{
    public class AllegisSearchResult : ScoreSearchResult
    {
        [IndexField("articledate")]
        public DateTime ArticleDate { get; set; }
    }
}
