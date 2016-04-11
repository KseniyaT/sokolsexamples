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



