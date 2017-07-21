using System.Linq;
using Score.Custom.Pipelines.ContentSearch.SearchCriteria;
using Score.Data.ContentSearch;
using Sitecore.ContentSearch.Pipelines;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.ContentSearch.Utilities;

namespace sc821.Custom.Pipelines
{
    public class ApplyCustomCriteria : ApplyCustomCriteria<AllegisSearchResult> { }

    public class ApplyCustomCriteria<T> : SearchPipelineProcessor<SearchCriteriaArgs<T>> where T : SearchResultItem
    {
        /// <summary>
        /// Processes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        public override void Process(SearchCriteriaArgs<T> args)
        {
            var language = Sitecore.Context.Language;

            args.IndexQueryable = args.IndexQueryable.OrderBy(x => x.Fields["article date"]);

            args.IndexQueryable = args.IndexQueryable.Where(q => q.Language.Equals(language.Name));
        }
    }
}
