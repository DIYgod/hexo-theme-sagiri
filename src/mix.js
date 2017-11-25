// 顶部头像动画
// $('.site-master-avatar, .site-title').on('mouseover', function () {
//   this.classList.add('animated', 'tada');
// });
$('.site-master-avatar, .site-title').on('mouseout', function () {
  this.classList.remove('animated', 'tada');
});
