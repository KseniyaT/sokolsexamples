function birdsSong() {
  var sound = document.getElementById('player')
    , birds = document.getElementById('bird-main');
  if (birds != null && typeof birds != 'undefined') {
    birds.hover(function(){
      sound.volume = 1.0;
      sound.play();
    }, function(){
      fadeAudio(sound);
    });
  }
}

function fadeAudio (sound) {
  var fadePoint = sound.duration - 2; // This is for a 2 second fade out.
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





