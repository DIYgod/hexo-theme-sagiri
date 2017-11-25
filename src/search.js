$('.search-form').submit(function (e) {
  e.preventDefault();
  window.open(`https://www.google.com/search?&q=site%3A${window.location.host}+${encodeURIComponent($('.search-form input[name="keyword"]').val())}`);
});
