loadVideo = (element) => {
  // const youTubeJson = 'https://www.youtube.com/oembed?url=' + url + '&format=json';

  const url = element.getAttribute('data-video');
  let video = null;
  let isValid = false;
  let markup = '';

  // check whether the url is valid
  if(url !== null) {
    video = retrieveData(url);
    isValid = video.isValid;
  }

  // put together the wallpaper dom element
  const wallpaper = document.createElement('div');
  wallpaper.classList.add('video__wallpaper');
  isValid ?  markup = '<a class="video__play" />' : markup = '<p class="video__error">Invalid video</p>';
  wallpaper.innerHTML = markup;

  // place the wallpaper markup into the DOM
  element.appendChild(wallpaper);

  // check if a valid youtube or vimeo url has been used
  // if so, return the type (youtube or vimeo) and the ID of the video
  function retrieveData(url) {
    let videoID = null;
    let isValid = false;
    let videoArray = [];
    const urlArray = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if(urlArray) {
      if (urlArray[3].indexOf('youtu') > -1) {
        isValid = true;
        type = 'youtube';
        videoID = urlArray[6];
      } else if (urlArray[3].indexOf('vimeo') > -1) {
        isValid = true;
        type = 'vimeo';
        videoID = urlArray[6];
      }
    } else {
      // an invalid url was passed through. Nothing to load here
      return { isValid : false }
    }

    videoArray = { isValid: isValid, type: type, videoID: videoID }
    return videoArray;
  }
}
