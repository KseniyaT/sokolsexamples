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