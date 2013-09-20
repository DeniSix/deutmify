/*! Drop dead simple URL cleaner from UTM's crap.
 *  Copyright (c) 2013 Denis Shemanaev
 *  License: MIT
 */
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(exports);
  } else {
    // Browser globals
    factory(root.deUTMify = {});
  }
}(this, function (exports) {
  // Query parameters that we'll kill ]:->
  var TRASH_PARAMS = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign'];

  function cleanArray(params, trash) {
    var res = [];

    for (var i = params.length - 1; i >= 0; i--) {
      var param = params[i].split('=')[0];
      if (trash.indexOf(param) === -1) res.push(params[i]);
    }

    return res;
  }

  /**
   * Get cleaned up URL.
   *
   * @return {String}
   */
  function cleanUrl() {
    var url = location.origin + location.pathname
      , params = location.search.slice(1).split('&')
      , hash
      , hashPrefix = 1
      , alpha = /[a-zA-Z0-9_]/;

    // Search for non-alphanum hash prefix (like twitter's '!/')
    for (var i = 1; i < location.hash.length; i++) {
      if (alpha.test(location.hash[i])) {
        hashPrefix = i;
        break;
      }
    }
    if (location.hash.indexOf('?') > hashPrefix) hashPrefix = location.hash.indexOf('?') + 1;

    hash = location.hash.slice(hashPrefix).split('&');

    // Clean up query part
    params = cleanArray(params, TRASH_PARAMS);

    // Clean up hash part
    hash = cleanArray(hash, TRASH_PARAMS);

    if (params.length) url += '?' + params.join('&');
    if (hash.length) url += location.hash.substr(0, hashPrefix) + hash.join('&');

    return url;
  }

  /**
   * Cleanup URL in address bar.
   *
   * @return {Boolean}
   */
  function cleanup() {
    if (!history) return false;
    history.replaceState(history.state, document.title, cleanUrl());
    return true;
  }

  exports.url = cleanUrl;
  exports.cleanup = cleanup;
}));
