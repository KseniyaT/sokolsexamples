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
function changeHeader(){
  var header_root = document.getElementById("header_root");
  if (header_root != null && typeof header_root != 'undefined') {
    var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
    console.log(y);
    toggleHeaderClass(y, header_root);
    window.onscroll = function() {
      toggleHeaderClass(y, header_root);
    };
    window.onresize = function(){
      y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      toggleHeaderClass(y, header_root);
    };
  }
}

function toggleHeaderClass(y, header){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop //and for IE
    , scrollHeight = getDocumentHeight()
    , delta = scrollHeight - y
    , alfa = y-70;
  if (delta <= y) {
    alfa = delta;
  }
  console.log(alfa);
  if (scrollTop >= alfa) {
    header.addClass('header_top');
  } else {
    header.removeClass('header_top');
  }
}

function getDocumentHeight() {
  return(Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  ));
}
;
Object.prototype.addClass = Object.prototype.addClass || function(userClassName){
  var re = new RegExp("(^|\\s)" + userClassName + "(\\s|$)", "g");
  if (re.test(this.className)) return;
  this.className = (this.className + " " + userClassName).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
  return this;
};

Object.prototype.removeClass = Object.prototype.removeClass || function(userClassName){
  var re = new RegExp("(^|\\s)" + userClassName + "(\\s|$)", "g");
  this.className = this.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
  return this;
};

Object.prototype.hover =  Object.prototype.hover || function(mouseenter, mouseleave) {
  this.onmouseenter = mouseenter;
  this.onmouseleave = mouseleave;
};

Object.prototype.css = Object.prototype.css || function(propertyObject){
  if (propertyObject === null || typeof propertyObject !== 'object') throw new Error("ERROR. Incorrect property value: " + propertyObject);
  for (var key in propertyObject) {
    if (propertyObject.hasOwnProperty(key)) {
      try {
        this.style[key] = propertyObject[key];
      } catch(e) {
        throw new Error(e);
      }
    }
  }
  return this;
};

Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

Object.prototype.html = Object.prototype.html || function(text){
  this.innerHTML = text;
  return this;
};

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
;
function race(){
  var hedgehodsNamesArr = ["Billy", "Willy", "Dilly"];
  fillRateSelect("rate-select", hedgehodsNamesArr);

  var hedgehog = "hedgehog";
  drawRacers("race", hedgehog);
  var hedgehogs = document.querySelectorAll("."+hedgehog);
  drawNames(hedgehogs, hedgehodsNamesArr);
  submitRateForm(hedgehog);
}

function disableRateSelect(select, flag){
  select.disabled = flag;
}

function compareRateValue(maxIndex, selectedIndex){
  return (maxIndex === selectedIndex);
}

function showRateResult(win, container, select){
  var resultDiv = document.createElement("div")
    , popup = document.createElement("div")
    , cross = document.createElement("span")
    , h3 = document.createElement("h3")
    , closeBtn = document.createElement("button")
    , text;
  if (win) {
    text = "You are <span class='danger'>winner!!!</span>";
  } else {
    text = "You lose. </br> Do not worry! Try again!";
  }
  resultDiv.addClass("rate-result");
  cross.addClass("fa fa-times popup-cross close-result-popup");
  popup.addClass("rate-popup");
  h3.html(text);
  closeBtn.html("Play again").addClass("btn close-result-popup");
  popup.appendChild(cross);
  popup.appendChild(h3);
  popup.appendChild(closeBtn);
  resultDiv.appendChild(popup);
  container.appendChild(resultDiv);
  resultDiv.onclick = function(){
    doAfterCloseResult(this, select);
  };
  cross.onclick = closeBtn.onclick = function(){
    doAfterCloseResult(resultDiv, select);
  };
  popup.onclick = function(e){
    e.stopPropagation();
  };
}

function doAfterCloseResult(obj, select){
  obj.remove();
  disableRateSelect(select, false);
}

function submitRateForm(hedgehog){
  var hedgehogs = document.querySelectorAll("."+hedgehog);

  document.getElementById("rate-form").onsubmit = function(event){
    event.preventDefault();

    var select = document.getElementById("rate-select")
      , selectedIndex = select.selectedIndex;
    disableRateSelect(select, true);

    var accelerate_coefs = shuffleArray([1, 1.2, 1.4]) // shuffleArray see at fifteen-puzzle.js
      , maxIndex = getMaxArrayIndex(accelerate_coefs)
      , win = compareRateValue(maxIndex, selectedIndex);

    [].slice.call(hedgehogs).forEach(function(item, i, arr) {
      item.removeClass("hedgehog_winner");
      animate(
        function(timePassed) {
          movingRacers(item, timePassed, accelerate_coefs[i]);
        }, 2000, function(){
          if (i === maxIndex) {
            item.addClass("hedgehog_winner");
          }
          if(i === 0) {
            showRateResult(win, document.getElementById("race-container"), select);
          }
        }
      );
    });
  }
}

function drawRacers(_id, hedgehog){
  var race = document.getElementById(_id);
  if (race != null && typeof race != 'undefined') {
    var widths = [56, 56, 56]
      , heights = [40, 40, 40]
      , marginBottom = 20;
    var div;
    for (var n=0; n<3; n++) {
      div = document.createElement("div");
      div.id = hedgehog+n;
      div.className = hedgehog;
      div.css({
        width: widths[n] + "px",
        height: heights[n] + "px",
        position: "absolute",
        top: n*(heights[n]+marginBottom) + "px"
      });
      race.appendChild(div);
    }
  }
}

function drawNames(hedgehogs, namesArr){
  var hedgehogArr;
  if (Object.prototype.toString.call(hedgehogs) === '[object Array]' ) {
    hedgehogArr = hedgehogs;
  } else {
    hedgehogArr = [].slice.call(hedgehogs);
  }
  hedgehogArr.forEach(function(item, i){
    var p = document.createElement("p");
    p.className = "hedgehog-name";
    p.innerHTML = namesArr[i];
    item.appendChild(p);
  });
}

// в то время как timePassed идёт от 0 до 2000
// left принимает значения от 0 до 400px
function movingRacers(obj, timePassed, coef) {
  if (coef < 1) throw new Error("ERROR. Acceleration coefficient should be greater than or equal 1!");
  if (timePassed*coef / 5 < 400 ){
    obj.css({left: timePassed*coef / 5 + "px"});
  } else {
    obj.css({left: "400px"});
  }
}

function fillRateSelect(_id, optionValue){
  var select = document.getElementById(_id)
    , option;
  for(var i=0; i < optionValue.length; i++) {
    option = document.createElement("option");
    option.value = i;
    option.innerHTML = optionValue[i];
    select.appendChild(option);
  }
}

// Рисует функция draw
// Продолжительность анимации duration
function animate(draw, duration, callback) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;
    // возможно небольшое превышение времени, в этом случае зафиксировать конец
    if (timePassed > duration) timePassed = duration;
    // нарисовать состояние анимации в момент timePassed
    draw(timePassed);
    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < duration) {
      requestAnimationFrame(animate);
    } else {
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
}

function getMaxArrayIndex(arr) {
  //var i = arr.indexOf(Math.max.apply(Math, arr)); //Shorter way
  var max = arr[0]
    , maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}



;
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
