// ==UserScript==
// @name        YouTube stuff (brssnkl)
// @description  Sets YouTube's top bar position to relative and adds clipconverter download links to menu
// @include      https://youtube.com/watch?*
// @include      https://*.youtube.com/watch?*
// @include      https://youtube.com/watch#*
// @include      https://*.youtube.com/watch#*
// @include      http://youtube.com/watch?*
// @include      http://*.youtube.com/watch?*
// @include      http://youtube.com/watch#*
// @include      http://*.youtube.com/watch#*
// @version      1.3
// @grant        none
// @author       barissenkal@gmail.com
// ==/UserScript==

/* Stop youtube top bar from sticking */
var arg1 = document.getElementById("masthead-positioner"),
  arg2 = document.getElementById("masthead-positioner-height-offset");
if(arg1 && arg2 && arg1.style && arg2.style){
  arg1.style.position = 'relative';
  arg2.style.height = '0px';
}

/* Color changes with opacity and background colors */

var mcontainter = document.getElementById('yt-masthead-container'),
  pplayer = document.getElementById('placeholder-player'),
  theater = document.getElementById('theater-background'); //the theater background

if(mcontainter && pplayer && theater && mcontainter.style && pplayer.style && theater.style){

  mcontainter.style.background = 'transparent';
  mcontainter.style.opacity = '0.3';
  mcontainter.style.borderBottom = '1px solid #131313';

  arg1.style.background = '#131313';

  pplayer.style.background = '#131313';
  pplayer.style.paddingBottom = '50px';
  pplayer.style.marginBottom = '0px';
  pplayer.style.marginLeft = '-200px';
  pplayer.style.marginRight = '-200px';
  pplayer.style.height = window.innerHeight - 50 +'px';

  theater.style.background = '#131313';
}

/* Player size */

if(document.querySelector){
  var papi = document.getElementById('player-api'), // player api
    ytcontent = document.getElementById('content'), // the bottom content
    html5content = document.querySelector('.html5-video-content'), // ?
    mainvideo = document.querySelector('.video-stream'), //video itself
    bar = document.querySelector('.ytp-chrome-bottom'), //buttom bar
    annotations = document.querySelector('.video-annotations'), //buttom bar
    wbutton = document.querySelector('.ytp-size-button'); //wide size button

    if(window.innerWidth > 1344 && papi && theater && ytcontent && html5content && mainvideo && bar && wbutton && papi.style && theater.style && ytcontent.style && html5content.style && mainvideo.style && bar.style && wbutton.style){
      papi.style.width = '1280px';
      papi.style.height = '720px';
      papi.style.marginLeft = '488px';

      theater.style.height = '720px';

      ytcontent.style.top = '250px;'

      //html5content.style.width = '1280px';

      if(annotations && annotations.style){
        annotations.style.transform = 'scale(1.5,1.5)';
        annotations.style.left = '214px';
      }

      mainvideo.style.width = '1280px';
      mainvideo.style.height = '720px';

      bar.style.left = '225px';

      wbutton.style.display = "none";
      //Setting cookie to keep player wide
      if(document.cookie) document.cookie="wide=1; path=/; domain=.youtube.com";

    } else {
      console.log('Html of youtube changed?');
    }
} else {
  console.log("No querySelector");
}

/* Add clipconverter links to submenu */
var div_embed = document.getElementById('action-panel-overflow-menu');
if(div_embed && div_embed.innerHTML) {
  var clipconverterpath = "http://www.clipconverter.cc/?ref=addon&version=141&browser=userscript&url=" + encodeURIComponent(document.URL);
  var pre = '<li><button type="button" class="yt-ui-menu-item has-icon yt-uix-menu-close-on-select"><span class="yt-ui-menu-item-label"><a href="',
  middle = '" target="_blank" style="color:inherit; font-weight:600;">',
  after = '</a></span></button></li>';

  div_embed.innerHTML = pre + clipconverterpath + middle + 'ClipConverter' + after
  + pre + clipconverterpath + '&format=mp3' + middle + 'ClipConverter MP3' + after + div_embed.innerHTML;

} else {
  if(window.console && window.console.warn){
    console.warn('action-panel-overflow-menu not found');
  } else if (window.console && window.console.log){
    console.log('action-panel-overflow-menu not found');
  }
}

// borrowed from https://github.com/smiler/Prevent-youtube-HTML5-autoplay/blob/master/prevent_youtube_html_autoplay.js

function onLoad() {
  var video = document.getElementsByTagName('video')[0];
	if (video && !document.hasFocus()) {
    video.mute();
    setTimeout(function(){
      if (video) {
          video.unMute();
          video.pause();
          video.currentTime = 0;
      }
    },300);
  }
}
window.addEventListener('load', onLoad, false);
