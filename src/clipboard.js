var arCon = document.getElementsByClassName('post-body');
for (var i = 0; i < arCon.length; i++) {
  arCon[i].addEventListener('copy', function (e) {
    if (window.getSelection().toString() && window.getSelection().toString().length > 42) {
      setClipboardText(e);
      //alert('商业转载请联系作者获得授权，非商业转载请注明出处，谢谢合作。');
      notie('商业转载请联系作者获得授权，非商业转载请注明出处，谢谢合作。', {
        type: 'info',
        autoHide: true,
      });
    }
  });
}

function setClipboardText (event) {
  var clipboardData = event.clipboardData || window.clipboardData;
  if (clipboardData) {
    event.preventDefault();

    var htmlData = ''
      + '著作权归作者所有。<br>'
      + '商业转载请联系作者获得授权，非商业转载请注明出处。<br>'
      + '作者：' + CONFIG.site.author + '<br>'
      + '链接：' + window.location.href + '<br>'
      + '来源：' + CONFIG.site.title + '<br><br>'
      + window.getSelection().toString();
    var textData = ''
      + '著作权归作者所有。\n'
      + '商业转载请联系作者获得授权，非商业转载请注明出处。\n'
      + '作者：' + CONFIG.site.author + '\n'
      + '链接：' + window.location.href + '\n'
      + '来源：' + CONFIG.site.title + '\n\n'
      + window.getSelection().toString();

    clipboardData.setData('text/html', htmlData);
    clipboardData.setData('text/plain', textData);
  }
}
