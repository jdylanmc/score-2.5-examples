window.require = window.require || {};
window.require.baseUrl = "/Areas/sc821/js";

window.require.paths = window.require.paths || {};

window.require.paths.sc821 = "/Areas/sc821/js";

window.require.paths.moment = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min";


window.require.shim = window.require.shim || {};
window.require.shim.bootstrap                 = { deps: ["jquery"] };
window.require.shim.matchHeight               = { deps: ["jquery"] };
window.require.shim.jqueryValidate            = { deps: ["jquery"] };
window.require.shim.jqueryUnobtrusiveAjax     = { deps: ["jquery", "jqueryValidate", "jqueryValidateUnobtrusive"] };
window.require.shim.jqueryValidateUnobtrusive = { deps: ["jqueryValidate"] };
window.require.shim.scorevalidation           = { deps: ["jqueryUnobtrusiveAjax", "jqueryValidateUnobtrusive"] };
