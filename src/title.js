if (window.CONFIG.favicon.visibilitychange) {
  // title变化
  var OriginTitile = document.title;
  var titleTime;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      $('[rel="icon"]').attr('href', window.CONFIG.favicon.hidden);
      document.title = window.CONFIG.favicon.hide_text;
      clearTimeout(titleTime);
    }
    else {
      $('[rel="icon"]').attr('href', window.CONFIG.favicon.narmal);
      document.title = window.CONFIG.favicon.show_text + OriginTitile;
      titleTime = setTimeout(function () {
        document.title = OriginTitile;
      }, 2000);
    }
  });

}
