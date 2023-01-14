import lightGallery from "https://cdn.skypack.dev/lightgallery@2.1.2";

import lgZoom from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/zoom";

import lgThumbnail from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/thumbnail";

import lgVideo from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/video";

import lgShare from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/share";

import lgRotate from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/rotate";

import lgAutoplay from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/autoplay";
import lgFullscreen from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/fullscreen";

lightGallery(document.querySelector("#lightgallery"), {
  autoplayFirstVideo: false,
  pager: false,
  galleryId: "barbershop",
  flipHorizontal: false,
  flipVertical: false,
  rotateLeft: false,
  plugins: [lgZoom, lgThumbnail, lgShare, lgRotate, lgFullscreen, lgAutoplay],
  mobileSettings: {
    controls: false,
    showCloseIcon: false,
    download: false,
    rotate: false,
  },
});

lightGallery(document.querySelector("#gallery-videos-demo"), {
  plugins: [lgVideo],
  pager: false,
  download: false,
});

lightGallery(document.querySelector("#gallery-videos-demo-2"), {
  plugins: [lgVideo],
  pager: false,
  download: false,
});
