define([
    "jquery",
    "eventManager",
    "score_bootstrap/Events/SearchRequestChangeEvent",
    "score_bootstrap/Events/SearchResponseEvent"
], function (
    $,
    eventManager,
    SearchRequestChangeEvent,
    SearchResponseEvent
) {
    "use strict";

    function Sort(scope, customData) {
        var sortData;

        eventManager.subscribe("SearchResponseEvent:sort", function (data) {
            sortData = data;
        });

        $(".btn", scope).click(function () {
            eventManager.trigger("SearchRequestChangeEvent:sort", { prop: "value", proptwo: "another-value" });
        });
    }

    return function initSort(args) {
        return new Sort(args.scope, args.Something);
    }
});