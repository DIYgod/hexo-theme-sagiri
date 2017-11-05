window.FastClick = require('fastclick');
require('lazyload');
require('fancybox')(window.$);
require('../source/lib/velocity-animate')
require('../source/lib/velocity-animate/velocity.ui')

require('./utils');
require('./motion');
require('./affix');
require('./pisces');
require('./scrollspy');
require('./post-details');
require('./bootstrap');
require('./evanyou');
// require('./disqus');
if (window.CONFIG.leancloud.enable) {
  require('./leancloud');
}
