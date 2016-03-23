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





;
function fifteenPuzzle() {
  var puzzleCanvas = document.getElementById("puzzle_canvas");
  if (puzzleCanvas != null && typeof puzzleCanvas != 'undefined') {
    var puzzleCanvasCtx = puzzleCanvas.getContext('2d');
    var canvasWidth = 320, canvasHeight = 320;
    puzzleCanvasCtx.strokeRect(0, 0, canvasWidth, canvasHeight);

    var puzzleNumberArr = []
      , colorsArr = ["#E3E6ED", "#E798AD", "#93747A", "#9E6DBE",
        "#8865C9", "#D777B7", "#FA8F99", "#FDC4B9",
        "#B9C6E9", "#F7D4AA", "#AA95A6", "#3A559C",
        "#A2BEC2", "#5F7C82", "#2B6E7E", "#1B3848" ];

    for (var i=1; i<17; i++) {
      puzzleNumberArr.push({index: i, color: colorsArr[i-1]});
    }

    var shuffleNumberArr = shuffleArray(puzzleNumberArr.slice());
    var step = 80, index = 0;
    var index16 = 0, cellX = 0, cellY = 0;
    for (var x=0; x<4; x++) {
      for (var y=0; y<4; y++) {
        setCellValue(x, y, puzzleCanvasCtx, step, index, shuffleNumberArr);
        if (shuffleNumberArr[index].index == 16) {
          cellX = x*step;
          cellY = y*step;
          index16= index;
        }
        index++;
      }
    }

//    TODO: Дубляж
    document.onkeydown = function(e) {
      var keyCode = getKeyCode(e);
      if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) e.preventDefault();
      var curNumberArr = movePuzzle(keyCode, cellX, cellY, canvasWidth, canvasHeight, step, index16, shuffleNumberArr);
      if (curNumberArr && typeof curNumberArr != 'undefined') {
        puzzleCanvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        index = 0;
        for (var x=0; x<4; x++) {
          for (var y=0; y<4; y++) {
            setCellValue(x, y, puzzleCanvasCtx, step, index, curNumberArr);
            if (curNumberArr[index].index == 16) {
              cellX = x*step;
              cellY = y*step;
              index16= index;
            }
            index++;
          }
        }
        if(isPuzzleComplete(puzzleNumberArr, curNumberArr)) alert('Bingo!');
      }
    }
  }
}

function isPuzzleComplete(arr1, arr2){
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function setCellValue(x, y, puzzleCanvasCtx, step, index, shuffleNumberArr){
  puzzleCanvasCtx.fillStyle = "#1B3848";
  puzzleCanvasCtx.fillRect(x*step, y*step, step, step); // Рисует прямоугольник
  puzzleCanvasCtx.fillStyle = shuffleNumberArr[index].color;
  puzzleCanvasCtx.fillRect(x*step+1, y*step+1, step-2, step-2); // Рисует прямоугольник
  puzzleCanvasCtx.font = "normal 30px sans-serif";
  puzzleCanvasCtx.fillStyle = "#1B3848"; //TODO: Передавать калор
  var xk = 2.5, yk = 1.5;
  if (shuffleNumberArr[index].index > 9) {
    xk = 3.5;
  }
  var cellX = x*step, cellY = y*step;
  puzzleCanvasCtx.fillText(shuffleNumberArr[index].index, cellX + step/xk, cellY + step/yk); //random numbers and coordinates x, y for the puzzle
}

function movePuzzle(keyCode, cellX, cellY, canvasWidth, canvasHeight, step, index16, shuffleNumberArr) {
  var a = shuffleNumberArr[index16]
    , b
    , i = index16;
  if (keyCode == 39 || keyCode == 68) { //->
    if (cellX+step == canvasWidth) return false;
    i = index16+4;
  } else if (keyCode == 40 || keyCode == 83) { //down
    if (cellY+step == canvasHeight) return false;
    i = index16+1;
  } else if (keyCode == 37 || keyCode == 65) { //<-
    if (cellX == 0) return false;
    i = index16-4;
  } else if (keyCode == 38 || keyCode == 87) { //up
    if (cellY == 0) return false;
    i = index16-1;
  }
  b = shuffleNumberArr[i];
  shuffleNumberArr[index16] = b; //we change places of the 2 cells
  shuffleNumberArr[i] = a;

  return shuffleNumberArr;
}


function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getKeyCode(e) {
  var event = window.event ? window.event : e;
  return event.keyCode;
}
;
//function changeHeader(){
//  var header = document.getElementById("header");
//  if (header != null && typeof header != 'undefined') {
//    var w = window,
//      d = document,
//      e = d.documentElement,
//      g = d.getElementsByTagName('body')[0],
//      //x = w.innerWidth || e.clientWidth || g.clientWidth,
//      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
//    console.log(y);
//
//    window.onscroll = function() {
//      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;//and dor IE
//      if (scrollTop >= y-70) {
//        header.addClass('header_top');
//      } else {
//        header.removeClass('header_top');
//      }
//    }
//  }
//}
;
Object.prototype.addClass = Object.prototype.addClass || function(userClassName){
  var re = new RegExp("(^|\\s)" + userClassName + "(\\s|$)", "g")
  if (re.test(this.className)) return
  this.className = (this.className + " " + userClassName).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
};

Object.prototype.removeClass = Object.prototype.removeClass || function(userClassName){
  var re = new RegExp("(^|\\s)" + userClassName + "(\\s|$)", "g");
  this.className = this.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
};

Object.prototype.hover =  Object.prototype.hover || function(mouseenter, mouseleave) {
  this.onmouseenter = mouseenter;
  this.onmouseleave = mouseleave;
};
function doAtOnload() {
//  changeHeader();
  birdsSong();
  fifteenPuzzle();
}


if (window.addEventListener) {
  window.addEventListener("load", doAtOnload, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", doAtOnload);
} else {
  window.onload = doAtOnload
};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

;
