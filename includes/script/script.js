window.addEventListener('DOMContentLoaded', function(e) {
  var videos = document.querySelectorAll('.js-video');
  for(i=0; i<videos.length; i++) {
    loadVideo(videos[i]);
  }
});
