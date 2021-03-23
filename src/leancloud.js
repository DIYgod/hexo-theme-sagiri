let AV;
if (window.CONFIG.leancloud.enable) {
  AV = require('leancloud-storage');
  AV.init({
    appId: window.CONFIG.leancloud.appID,
    appKey: window.CONFIG.leancloud.appKey,
    serverURLs: 'https://leancloud.diygod.me',
  });
  window.AV = AV;
}

function leancloud () {

  if (window.CONFIG.leancloud.enable) {

    function showTime (Counter) {
      var query = new AV.Query(Counter);
      var entries = [];
      var $visitors = $(".leancloud_visitors");

      $visitors.each(function () {
        entries.push($(this).attr("id").trim());
      });

      query.containedIn('url', entries);
      query.find()
        .then(function (results) {
          var COUNT_CONTAINER_REF = '.leancloud-visitors-count';

          if (results.length === 0) {
            $visitors.find(COUNT_CONTAINER_REF).text(0);
            return;
          }

          for (var i = 0; i < results.length; i++) {
            var item = results[i];
            var url = item.get('url');
            var time = item.get('time');
            var element = document.getElementById(url);

            if (!$(element).find(COUNT_CONTAINER_REF).text()) {
              $(element).find(COUNT_CONTAINER_REF).text(time);
            }
          }
          for (var i = 0; i < entries.length; i++) {
            var url = entries[i];
            var element = document.getElementById(url);
            var countSpan = $(element).find(COUNT_CONTAINER_REF);
            if (countSpan.text() == '') {
              countSpan.text(0);
            }
          }
        });
    }

    function addCount (Counter) {
      var $visitors = $(".leancloud_visitors");
      var url = $visitors.attr('id').trim();
      var title = $visitors.attr('data-flag-title').trim();
      var query = new AV.Query(Counter);

      query.equalTo("url", url);
      query.find()
        .then(function (results) {
          if (results.length > 0) {
            var counter = results[0];
            counter.save(null, {
              fetchWhenSave: true
            });
            counter.increment("time");
            counter.save()
              .then(function (counter) {
                var $element = $(document.getElementById(url));
                $element.find('.leancloud-visitors-count').text(counter.get('time'));
              })
              .then(function (counter, error) {
                console.log('Failed to save Visitor num, with error message: ' + error.message);
              });
          } else {
            var newcounter = new Counter();
            /* Set ACL */
            var acl = new AV.ACL();
            acl.setPublicReadAccess(true);
            acl.setPublicWriteAccess(true);
            newcounter.setACL(acl);
            /* End Set ACL */
            newcounter.set("title", title);
            newcounter.set("url", url);
            newcounter.set("time", 1);
            newcounter.save()
              .then(function (newcounter) {
                var $element = $(document.getElementById(url));
                $element.find('.leancloud-visitors-count').text(newcounter.get('time'));
              })
              .then(function (newcounter, error) {
                console.log('Failed to create');
              });
          }
        });
    }

    function showTop (Counter) {
      var query = new AV.Query(Counter);
      query.descending("time");
      query.limit(5);
      query.find().then((results) => {
        let tpl = '';
        results.forEach((item) => {
          tpl += `<li><a href="${item.attributes.url}"><span class="views-top-title">${item.attributes.title}</span><span class="views-top-time">${item.attributes.time}次看爆</span></a></li>`;
        })
        $('.views-top').html(tpl);
      }, function (error) { }
      );
    }

    $(function () {
      var Counter = AV.Object.extend("Counter");
      if ($('.leancloud_visitors').length == 1) {
        addCount(Counter);
      } else if ($('.post-title-link').length > 1) {
        showTime(Counter);
      }
      if ($('.views-top-wrap').length) {
        let viewsInited = false;
        $('.views-top-wrap').on('toggle', (event) => {
          if (!viewsInited && $('.views-top-wrap')[0].open) {
            showTop(Counter);
            viewsInited = true;
          }
        });
      }
    });
  }

}

module.exports = leancloud;
