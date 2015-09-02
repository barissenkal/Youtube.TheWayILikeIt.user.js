# Youtube.TheWayILikeIt.user.js
This repo is for sharing my userscript for Youtube. I guess one more YouTube userscript won't hurt anyone :)

Like the title says It changes YouTube better for my liking. Only designed for Chrome on Macbook Air 13 (What I use daily), might work anywhere else but no guarantees.

Feel free to look into, grab some part of and use on your browser.

### How it Works (Useful parts of the code)

Youtube doesn't fully load the new page when a link is clicked. (At least on my browser)
So I am using events of the Html5 video element that is present (but sometimes hidden) on all pages.

```javascript
//Finding the Html5 video element on page
var video = document.querySelector('.video-stream.html5-main-video');

/*
  When the page with video opens, 'canplaythrough' event is triggered.
  Source is set on the video, a bit of the source is loaded, Html of page is ready.
*/
video.addEventListener('canplaythrough',function(){
  /* Code to run on video page  */
},false);

/*
  When another page (like homepage) opens, 'abort' event is triggered.
  Video from a previous page is stopped, source is deleted and new page is loading.
*/
video.addEventListener('abort',function(){
  /* Code to run when navigation away from video page  */
},false);
```


Annotations on YouTube Player use `top`, `left`, `width`, `height` to properly display it on player. By adding `transform: scale()` to div containing annotations, I managed to scale up Annotations to my custom player size.

```javascript
var annotations = document.querySelector('.video-annotations')
annotations.style.transform = 'scale(1.5,1.5)'; //Scale up to predetermined size.
annotations.style.left = '214px'; //Realign on page (assumed static page width)
```
