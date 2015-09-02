// ==UserScript==
// @name        YouTube stuff (brssnkl)
// @description  Sets YouTube's top bar position to relative and adds clipconverter download links to menu
// @include      https://www.youtube.com/watch*
// @version      1.2
// @grant        unsafeWindow
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

/* borrowed from https://github.com/svnpenn/bm/blob/gh-pages/yt.js */
/* var allDownloadLinks =  function(){

  function qry(sr) {
    var qa = [];
    for (var prs of sr.split('&')) {
      var pra = prs.split('=');
      qa[pra[0]] = pra[1];
    }
    return qa;
  }

  function rpc(tx) {
    return tx.replace(/"/g, '&quot;');
  }

  function sprintf(nw) {
    var i = 0;
    while (/%s/.test(nw))
      nw = nw.replace('%s', arguments[++i])
    return nw;
  }

  var qua = {
    _141: '256k AAC',
    _140: '128k AAC',
    _251: '160k Opus',
    _250: '70k Opus',
    _249: '50k Opus',
    _171: '128k Vorbis',
     _22: '720p H.264 192k AAC',
     _84: '720p 3D 192k AAC',
     _18: '360p H.264 96k AAC',
     _82: '360p 3D 96k AAC',
     _36: '240p MPEG-4 36k AAC',
     _17: '144p MPEG-4 24k AAC',
     _43: '360p VP8 128k Vorbis',
    _100: '360p 3D 128k Vorbis',
      _5: '240p H.263 64k MP3',
    _138: '1440p 4400k H.264',
    _264: '1440p 3700k H.264',
    _137: '1080p H.264',
    _136: '720p H.264',
    _135: '480p H.264',
    _134: '360p H.264',
    _133: '240p H.264',
    _160: '144p H.264',
    _271: '1440p VP9',
    _248: '1080p VP9',
    _247: '720p VP9',
    _244: '480p VP9',
    _243: '360p VP9',
    _242: '240p VP9',
    _278: '144p VP9'
  };

  var args = [
    ytplayer.config.args.adaptive_fmts,
    ytplayer.config.args.url_encoded_fmt_stream_map
  ].join(',').split(',')

  function curl(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://allow-any-origin.appspot.com/' + url, false);
    xhr.send();
    return xhr.responseText;
  }

  for (var frt of args) {
    var qst = qry(frt);
    var qty = qua['_' + qst.itag] || qst.itag;
    var hrf = unescape(qst.url);
    if (qst.sig)
      hrf += '&signature=' + qst.sig;
    if (qst.s) {
      if (typeof rpt == 'undefined') {
        var rpt = curl('https:' + ytplayer.config.assets.js)
        .replace(/^\(function\(\){/, '').replace(/}\)\(\);\n$/, '');
        try {eval(rpt)} catch(e) {}
        var fcnm = /signature\W+(\w+)/.exec(rpt)[1];
      }
      hrf += '&signature=' + eval(sprintf('%s("%s")', fcnm, qst.s));
    }
    var fn = (ytplayer.config.args.title + '-' + qty)
      .replace(/[:~’]/g, '')//.replace(/[!"#&'()*,:?@|~’]/g, '')
      .replace(/h.264/, 'h264')
      //.replace(/[+./[\]]/g, '-')
      .replace(/-+/g, '-');
    //var pm = sprintf('prompt("", "%s"); return false', fn);
    qua['_' + qst.itag] = sprintf('<a href="%s&title=%s&ratebypass=yes" download="%s.mp4">%s</a>',
      hrf, encodeURIComponent(fn), fn, qty);
  }

  var dw = document.querySelector('#bm');
  if (!dw) {
    dw = document.createElement('div');
    dw.id = 'bm';
    document.body.insertBefore(dw, document.body.firstChild);
  }

  dw.innerHTML = [
    '<span style="float:right;color:white;cursor:pointer;font-size:15px;" onclick="document.getElementById(\'bm\').remove();">Close</span>',
    ''
  ].concat(
    Object.keys(qua).map(ky => qua[ky]).filter(vu => /href/.test(vu))
  ).join('<br>');

  dw.style.position = 'fixed';
  dw.style.top = '0';
  dw.style.left = '50%';
  dw.style.width = '200px';
  dw.style.marginLeft = '-120px';
  dw.style.zIndex = '100';
  dw.style.background = 'rgba(170, 170, 170, 0.3)';
  dw.style.padding = '20px';

}*/


/* UNUSED Center youtube chrome bar (player bottom bar)
if(document.querySelector){
  var bar = document.querySelector('.ytp-chrome-bottom');
  if(bar && bar.style){
    bar.style.left = '225px';
  }
}else {
  console.log("No querySelector");
}*/
