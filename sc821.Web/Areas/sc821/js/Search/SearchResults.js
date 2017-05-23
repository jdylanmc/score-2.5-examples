define([
    "jquery",
    "knockout",
    "eventManager",
    "score_bootstrap/Models/Tile",
    "score_bootstrap/Models/Search/PromoTile",
    "score_bootstrap/Models/Search/SearchRequest",
    "score_bootstrap/Events/SearchResponseEvent",
    "imagesLoaded",
    "score_bootstrap/Utils/UrlHelper",
    "score_ccf/ModuleLoader",
    "matchHeight"
], function (
    $,
    ko,
    eventManager,
    Tile,
    PromoTile,
    SearchRequest,
    SearchResponseEvent,
    imagesLoaded,
    urlHelper,
    moduleLoader
) {
    "use strict";

    var tileCache = {};

    SearchResults.selector = ".js-search-results";

    function howManyTilesPerRow($list) {
        var tilesInRow = 0;
        $list.find("li").each(function () {
            var $this = $(this), $prev = $this.prev();
            if ($prev.length && $this.position().top !== $prev.position().top) {
                return false;
            }

            tilesInRow = tilesInRow + 1;
        });

        return tilesInRow;
    }

    function SearchResults(scope, uniqueId, refreshEvents) {
        var $list = $(SearchResults.selector, scope),
            page = 0,
            appendTiles = this.appendTiles.bind(this),
            onSearchResponseEvent = this.onSearchResponseEvent.bind(this),
            self = this,
            promoTiles = $(".score-promo-tile", scope).remove().toArray().map(PromoTile.fromElement).sort(PromoTile.sort);

        this.query = ko.observable("");
        this.serviceUnavailable = ko.observable(false);
        this.results = ko.observableArray([]);
        this.numberOfResults = ko.observable("");
        this.canShowMore = ko.observable(false);
        tileCache[uniqueId] = {};

        Object.defineProperties(this, {
            scope: { enumerable: false, value: scope },
            tilesPerRow: {
                enumerable: false,
                get: function () {
                    return howManyTilesPerRow($list);
                }
            },
            searchClient: {
                enumerable: false,
                get: function () {
                    return $(".score-search-client", scope).data("ccf_module");
                }
            },
            promoTiles: { enumerable: false, value: promoTiles },
            tiles: {
                enumerable: false,
                get: function () {
                    return $("li", $list);
                }
            },
            id: { enumerable: false, value: uniqueId },
            page: {
                enumerable: false,
                get: function () { return page; },
                set: function (val) { page = parseInt(val, 10) || 0; }
            }
        });

        function serverError() {
            self.serviceUnavailable(true);
        }

        // Cannot add lister to Search Client's module because it may not be initialized yet. But the DOM element is definitely there.
        $(".score-search-client", scope).on(SearchResponseEvent.eventName, function (ignore /*event*/, response) {
            onSearchResponseEvent(response);
        });

        if (refreshEvents.length) {
            refreshEvents.forEach(function (ev) {
                eventManager.subscribe(SearchResponseEvent.serverError + ":" + ev, serverError);
            });
        }

        this.showMore = function showMore() {
            var searchClient = this.searchClient, newPage = page + 1;
            urlHelper.setHashValue(window.location, uniqueId + "page", newPage);
            searchClient.searchRequest.page = newPage;
            searchClient.searchRequest.startPage = newPage;
            searchClient.search().done(appendTiles);
        };

        this.reset = function reset() {
            $list.empty();
            this.results.removeAll();
            page = 0;
        };

        ko.applyBindings(this, scope);
    }

    function injectPromoTiles(component, originalQuantity) {
        var newPromoTiles = [];

        component.promoTiles.forEach(function (promoTile) {
            if (promoTile.index <= originalQuantity || promoTile.index > (component.tiles.length + 1)) {
                return;
            }

            var insertElement = $("<li class='promo-tile-li'></li>").append(promoTile.tileHtml);

            if (promoTile.index === 1) {
                $(component.tiles[0]).before(insertElement);
            } else {
                $(component.tiles.get(promoTile.index - 2)).after(insertElement);
            }

            $(".score-promo-tile", insertElement);
            newPromoTiles.push(insertElement[0]);
        });

        return newPromoTiles;
    }

    function getLastRowTiles(component) {
        var tiles = component.tiles.toArray(), lastRowTiles;

        // When additional tiles are appended via 'show more', we want to run matchHeight on just
        // the new tiles to avoid changing the tiles already on the screen and causing the scroll
        // position to jump. However, if the math of tiles-per-page works out so that the last row
        // of the old tiles ends up with both, old and new, tiles, then the tiles in that row should
        // be included in matchHeight

        // Divides total number of elements by number of tiles-per-row, returning remainder. This is
        // how we figure out which elements are in the last row.
        lastRowTiles = tiles.slice(-1 * (tiles.length % component.tilesPerRow));

        return lastRowTiles;
    }

    SearchResults.prototype.appendTiles = function appendTiles(response) {
        var newTiles = [], lastRowTiles = [], self = this;

        if ($(this.scope).hasClass("js-hide-on-load")) {
            $(this.scope).removeClass("js-hide-on-load");
        }

        this.serviceUnavailable(false);

        if (response.page !== this.page) {
            urlHelper.setHashValue(window.location, this.id + "page", String(response.page));
        }

        if (response.page <= this.page) {
            // When there is a new search response, current tiles should always be cleared out first,
            // unless the 'page' value has been incremeneted, which means that 'show more' was clicked
            this.reset();
        } else {
            // 'show more' was clicked, so page should be incremented
            this.page = response.page;

            lastRowTiles = getLastRowTiles(this);
        }

        var originalQuantity = this.tiles.length;

        response.items.forEach(function (item) {
            var id = item.id.toString(), tile, cache = tileCache[this.id];

            if (!cache.hasOwnProperty(id)) {
                cache[id] = new Tile(item);
            }

            tile = cache[id];
            this.results.push(tile);
            newTiles.push(tile.element());
        }, this);

        this.canShowMore((response.page + 1) < response.totalPages);
        this.numberOfResults(response.totalItems);
        this.query(response.query);

        if (!newTiles.length) {
            return;
        }

        newTiles = $(newTiles).add(injectPromoTiles(this, originalQuantity));

        // Wait to run matchHeight until all the images are loaded since
        // height of images affect the height of the tiles
        imagesLoaded($("img", newTiles), function matchHeightOnNewTiles() {
            var emptySpots = self.tilesPerRow - lastRowTiles.length;
            if (emptySpots > 0) {
                $(newTiles.slice(0, emptySpots)).add(lastRowTiles).matchHeight(true);
                newTiles = newTiles.slice(emptySpots);
            }

            $(newTiles).matchHeight(true);
        });
    };

    SearchResults.prototype.onSearchResponseEvent = function onSearchResponseEvent(searchResponse) {
        this.appendTiles(searchResponse);
        eventManager.trigger("search-rendered");
    };

    SearchResults.init = function init(args) {
        if (args.IsEditorEditing === true) {
            $(args.scope).removeClass("js-hide-on-load");
            return null;
        }

        return new SearchResults(args.scope, args.UniqueId, args.RefreshActionMessages || []);
    };

    return SearchResults;
});