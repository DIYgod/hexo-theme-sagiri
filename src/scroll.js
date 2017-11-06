const Headroom = require('headroom.js');

if (!NexT.utils.isMobile()) {
  var headroom = new Headroom($('.site-nav')[0], {
    "tolerance": 5,
    "offset": 205,
    "classes": {
      "initial": "head-animated",
      "pinned": "slideDown",
      "unpinned": "slideUp"
    }
  });
  headroom.init();
}
