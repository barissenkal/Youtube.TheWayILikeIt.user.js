// ==UserScript==
// @name        Youtube TheWayILikeIt
// @description  Sets YouTube's top bar position to relative. Makes the area around player #131313. Makes player size 1280px by 720px. Stops Autoplay. Adds clipconverter links to more menu.
// @include      https://*.youtube.com/*
// @include      http://*.youtube.com/*
// @version      1.4.8
// @grant        none
// @author       Baris Senkal etekmekketcap.com
// ==/UserScript==

var prepPlayer = function() {
  
  if(document.webkitIsFullScreen){
    removeCustomPlayerStyle();
    return;
  }
  
  var mcontainter = document.getElementById('yt-masthead-container'),
  theater = document.getElementById('theater-background'), //the theater background
  pplayer = document.getElementById('placeholder-player'),
  pplaylist = document.getElementById('watch-appbar-playlist');
  
  var style = document.getElementById("customstyle");
  
  style.media = "";
  
  if(mcontainter && pplayer && theater){
    
    pplayer.style.height = window.innerHeight +'px';
    theater.style.height = (window.innerHeight - 10) +'px';
    
    if(pplaylist) pplaylist.style.marginTop = (window.innerHeight - 460) + "px";
    
  } else {
    console.log('Html of youtube changed?');
  }
  
}

var removeCustomPlayerStyle = function(){
  var style = document.getElementById("customstyle");
  style.media = "none";
}

function start() {
  var video = document.querySelector('.video-stream.html5-main-video');
  
  //Not waiting window load but making sure video item is present.
  if(!video){
    setTimeout(start,300);
    return;
  }
  
  //Disable autoplay
  //Borrowed fom https://github.com/smiler/Prevent-youtube-HTML5-autoplay/
  if (!document.hasFocus()) {
    video.muted = true;
    setTimeout(function(){
      if (video) {
        var videoWasPaused = video.paused;
        video.muted = false;
        video.pause();
        video.currentTime = 0;
        if(!videoWasPaused){
          var playbutton = document.querySelector('.ytp-play-button');
          if (playbutton) playbutton.click();
        }
      }
    },300);
  }
  
  // When a page with video opens
  video.addEventListener('canplaythrough',function(){
    prepPlayer();
  },false);
  
  //When another page (like homepage) opens.
  video.addEventListener('abort',function(){
    submenuSet = false;//Player page is now gone
    removeCustomPlayerStyle();
  },false);
  
  var timeout;
  
  //Detecting fullscreen as well?
  window.addEventListener("resize", function (event) {
    if(!document.webkitIsFullScreen) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        prepPlayer();
      }, 1000); // Timeout with an arbitary number is bad solution but it works.
    } else {
      removeCustomPlayerStyle();
    }
  }, false);
  
  if(console.info) console.info('Youtube Stuff ready to go');
}

//For the case If video 'canplaythrough' before script runs
(function(){
  
  //Setting cookie to keep player wide
  if(document.cookie) document.cookie="wide=1; path=/; domain=.youtube.com";
  
  var style = document.createElement('style');
  style.id = 'customstyle';
  style.type = 'text/css';
  style.innerHTML = '#masthead-positioner{position:relative;background:#131313}#masthead-positioner-height-offset{height:0!important}#theater-background{background:#131313!important}#yt-masthead-container{background:transparent;opacity:.3;border-bottom:1px solid #131313}@media screen and (max-width: 1000px){#movie_player{position:fixed!important;top:0;right:0;bottom:0;left:0}#masthead-positioner{position:fixed}}@media screen and (min-width: 1344px){#player-api{width:1280px;height:720px;margin-left:488px}#content{overflow:hidden}.video-stream{width:1280px!important;height:720px!important;left:0!important}.ytp-chrome-bottom{left:225px}.ytp-size-button{display:none!important}}';
  document.getElementsByTagName('head')[0].appendChild(style);
  
  if(document.location.pathname.indexOf('watch') > 0){
    prepPlayer();
  } else {
    style.media = "none";
  }
  
  
})();

//The Function that starts it all.
start();
