// ==UserScript==
// @name        Youtube TheWayILikeIt
// @description  Sets YouTube's top bar position to relative. Makes the area around player #131313. Makes player size 1280px by 720px. Stops Autoplay. Adds clipconverter links to more menu.
// @include      https://*.youtube.com/*
// @include      http://*.youtube.com/*
// @version      1.4
// @grant        none
// @author       Baris Senkal etekmekketcap.com
// ==/UserScript==

var submenuSet = false;

var prepPlayer = function() {
  var mpoisitioner = document.getElementById("masthead-positioner"),
    mpoisitionerOffset = document.getElementById("masthead-positioner-height-offset"),
    mcontainter = document.getElementById('yt-masthead-container'),
    theater = document.getElementById('theater-background'), //the theater background
    papi = document.getElementById('player-api'), // player api
    ytcontent = document.getElementById('content'), // the bottom content
    html5content = document.querySelector('.html5-video-content'), // ?
    mainvideo = document.querySelector('.video-stream'), //video itself
    bar = document.querySelector('.ytp-chrome-bottom'), //buttom bar
    annotations = document.querySelector('.video-annotations'), //buttom bar
    wbutton = document.querySelector('.ytp-size-button'), //wide size button
    pplayer = document.getElementById('placeholder-player'),
    div_embed = document.getElementById('action-panel-overflow-menu');

  /* Stop youtube top bar from sticking */
  if(mpoisitioner && mpoisitionerOffset && mpoisitioner.style && mpoisitionerOffset.style){
    mpoisitioner.style.position = 'relative';
    mpoisitionerOffset.style.height = '0px';
  } else {
    console.log('Html of youtube changed? topbar', mpoisitioner, mpoisitionerOffset);
  }

  /* Color changes with opacity and background colors */
  if(mcontainter && pplayer && theater && mcontainter.style && pplayer.style && theater.style){

    mcontainter.style.background = 'transparent';
    mcontainter.style.opacity = '0.3';
    mcontainter.style.borderBottom = '1px solid #131313';

    mpoisitioner.style.background = '#131313';

    pplayer.style.background = '#131313';
    pplayer.style.paddingBottom = '50px';
    pplayer.style.marginBottom = '10px';
    pplayer.style.marginLeft = '-200px';
    pplayer.style.marginRight = '-200px';
    pplayer.style.height = window.innerHeight - 50 +'px';

    theater.style.background = '#131313';
  } else {
    console.log('Html of youtube changed? color changes', mcontainter , pplayer , theater);
  }

  /* Player size */
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
    mainvideo.style.left = '0px';

    bar.style.left = '225px';

    wbutton.style.display = "none";
    //Setting cookie to keep player wide
    if(document.cookie) document.cookie="wide=1; path=/; domain=.youtube.com";

  } else {
    console.log('Html of youtube changed? player size', window.innerWidth > 1344 , papi , theater , ytcontent , html5content , mainvideo , bar , wbutton);
  }

  /* Add ClipConverter links to submenu */
  if(div_embed && div_embed.innerHTML) {
    if(submenuSet) {
      var items = document.getElementsByClassName('ClipPlayerSubmenuItem');
      for (var i = 0; i < items.length; i++) {
        items[0].remove();
      }
    }
    submenuSet = true;

    var clipconverterpath = "http://www.clipconverter.cc/?ref=addon&version=141&browser=userscript&url=" + encodeURIComponent(document.URL);
    var pre = '<li class="ClipPlayerSubmenuItem"><button type="button" class="yt-ui-menu-item has-icon yt-uix-menu-close-on-select"><span class="yt-ui-menu-item-label"><a href="',
    middle = '" target="_blank" style="color:inherit; font-weight:600;">',
    after = '</a></span></button></li>';

    div_embed.innerHTML = pre + clipconverterpath + middle + 'ClipConverter' + after
    + pre + clipconverterpath + '&format=mp3' + middle + 'ClipConverter MP3' + after + div_embed.innerHTML;

  } else {
    console.log('Html of youtube changed? clipconverter submenu', div_embed);
  }
}

var resetTopBar = function(){
  var mpoisitioner = document.getElementById("masthead-positioner"),
    mpoisitionerOffset = document.getElementById("masthead-positioner-height-offset"),
    mcontainter = document.getElementById('yt-masthead-container');

  if(mpoisitioner && mpoisitionerOffset && mcontainter && mpoisitioner.style && mpoisitionerOffset.style && mcontainter.style){
    mpoisitioner.style.background = '#fff';
    mpoisitioner.style.position = 'fixed';

    mpoisitionerOffset.style.height = '';

    mcontainter.style.borderBottomColor = '';
    mcontainter.style.opacity = 1;
  }
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
          video.muted = false;
          video.pause();
          video.currentTime = 0;
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
    resetTopBar();
  },false);

  //Making Youtube Logo to link Subscriptions page (by preference)
  document.getElementById('logo-container').href = '/feed/subscriptions';

  if(console.info) console.info('Youtube Stuff ready to go');
}

if(document.location.pathname.indexOf('watch') > 0) prepPlayer(); //For the case If video 'canplaythrough' before script runs

//The Function that starts it all.
start();