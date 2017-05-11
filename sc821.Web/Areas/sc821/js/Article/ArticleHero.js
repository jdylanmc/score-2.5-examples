define(["jquery"], function ($) {
    "use strict";

    function ArticleHero(scope, dateFormat, date, language) {
        console.log("Article hero here, I have these things");
        console.log(scope);
        console.log(dateFormat);
        console.log(date);
        console.log(language);
    }

    return function initArticleHero(args) {
        return args.IsExperienceEditorEditing ? null : new ArticleHero(args.scope, args.DateFormat, args.ArticleDate, args.Language);
    };
});