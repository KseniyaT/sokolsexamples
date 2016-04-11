"use strict";

function doAtOnload() {
  changeHeader();
  birdsSong();
  fifteenPuzzle();
  race();
}

if (window.addEventListener) {
  window.addEventListener("load", doAtOnload, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", doAtOnload);
} else {
  window.onload = doAtOnload
}