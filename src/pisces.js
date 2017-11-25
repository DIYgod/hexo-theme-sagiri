function pisces () {

  $(document).ready(function () {

    var sidebarInner = $('.sidebar-inner');

    initAffix();
    resizeListener();

    function initAffix () {
      var headerOffset = getHeaderOffset(),
        // footerOffset = getFooterOffset(),
        sidebarHeight = $('#sidebar').height(),
        contentHeight = $('#content').height();

      // Not affix if sidebar taller then content (to prevent bottom jumping).
      if (sidebarHeight < contentHeight) {
        sidebarInner.affix({
          offset: {
            top: headerOffset - 2 * CONFIG.sidebar.offset,
            bottom: 540
          }
        });
      }

      // setSidebarMarginTop(headerOffset).css({ 'margin-left': 'initial' });
    }

    function resizeListener () {
      var mql = window.matchMedia('(min-width: 991px)');
      mql.addListener(function (e) {
        if (e.matches) {
          recalculateAffixPosition();
        }
      });
    }

    function getHeaderOffset () {
      return $('.header-inner').height() + CONFIG.sidebar.offset;
    }

    // function getFooterOffset () {
    //   var footerInner = $('.footer-inner'),
    //       footerMargin = footerInner.outerHeight(true) - footerInner.outerHeight(),
    //       footerOffset = footerInner.outerHeight(true) + footerMargin;
    //   return footerOffset;
    // }

    function setSidebarMarginTop (headerOffset) {
      return $('#sidebar').css({ 'margin-top': headerOffset });
    }

    function recalculateAffixPosition () {
      $(window).off('.affix');
      sidebarInner.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
      initAffix();
    }

  });
}

module.exports = pisces;
