function doAtOnload() {
  var sound = document.getElementById('player')
    , birds = document.getElementById('bird-main');
  if (birds && birds.length > 0) {
    birds.hover(function(){
      sound.volume = 1.0;
      sound.play();
    }, function(){
      fadeAudio(sound);
    });
  }
}

Object.prototype.hover =  Object.prototype.hover || function(mouseenter, mouseleave) {
  this.onmouseenter = mouseenter;
  this.onmouseleave = mouseleave;
};


function fadeAudio (sound) {
  var fadePoint = sound.duration - 2; // Set the point in playback that fadeout begins. This is for a 2 second fade out.
  var fadeAudio = setInterval(function () {
    if ((sound.currentTime <= fadePoint) ) { // Only fade if past the fade out point or not at zero already
      if (sound.volume*10 > 0) {
        sound.volume = (sound.volume*10 -1)/10;
      } else { // When volume at zero stop all the intervalling
        clearInterval(fadeAudio);
        sound.pause();
      }
    }
  }, 100);
}


if (window.addEventListener)
  window.addEventListener("load", doAtOnload, false);
else if (window.attachEvent)
  window.attachEvent("onload", doAtOnload);
else window.onload = doAtOnload;



