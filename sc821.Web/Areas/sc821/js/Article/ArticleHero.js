define(["jquery", "moment"], function ($, moment) {
    "use strict";

    function ArticleHero(scope, dateFormat, date, language) {
        moment.locale(language);
        var displayDate = moment(date).format(dateFormat);


        $(".article-date", scope).html(displayDate);
    }

    return function initArticleHero(args) {
        return args.IsExperienceEditorEditing ? null : new ArticleHero(args.scope, args.DateFormat, args.ArticleDate, args.Language);
    };
});