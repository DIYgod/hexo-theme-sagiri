require('jquery-pjax');
const NProgress = require('nprogress');

NProgress.configure({
  showSpinner: false,
  easing: 'ease-out',
  speed: 1000
});

$(document).pjax('a:not(.fancybox):not([target="_blank"])', '#main', {
  scrollTo: $('.main').position().top - 60,
  fragment: '#main',
  timeout: 5000,
});

$(document).on('pjax:start', function () {
    NProgress.start();
    $('html, body').animate({
      scrollTop: $('.main').position().top - 60
    }, 500);

    if (window.dplayers) {
      for (let i = 0; i < window.dplayers.length; i++) {
          window.dplayers[i].destroy();
      }
      window.dplayers = [];
    }
    if (window.aplayers) {
      for (let i = 0; i < window.aplayers.length; i++) {
        window.aplayers[i].destroy();
      }
      window.aplayers = [];
    }
});

$(document).on('pjax:end', function () {
    NProgress.done();
    require('./post-details')();
    require('./leancloud')();
    require('./share')();
    require('./pisces')();
    require('./zoom')();
    window.originTitle = document.title;

    if (ga) {
      ga('set', 'location', window.location.href);
      ga('send', 'pageview');
    }

    $('.site-overview, .post-toc').css('max-height', document.body.clientHeight - 164);
});
