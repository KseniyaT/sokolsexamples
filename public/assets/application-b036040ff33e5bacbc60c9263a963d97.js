function birdsSong(){var e=document.getElementById("player"),t=document.getElementById("bird-main");null!=t&&"undefined"!=typeof t&&t.hover(function(){e.volume=1,e.play()},function(){fadeAudio(e)})}function fadeAudio(e){var t=e.duration-2,n=setInterval(function(){e.currentTime<=t&&(10*e.volume>0?e.volume=(10*e.volume-1)/10:(clearInterval(n),e.pause()))},100)}function fifteenPuzzle(){var e=document.getElementById("puzzle_canvas");if(null!=e&&"undefined"!=typeof e){var t=e.getContext("2d"),n=320,o=320;t.strokeRect(0,0,n,o);for(var r=[],a=["#E3E6ED","#E798AD","#93747A","#9E6DBE","#8865C9","#D777B7","#FA8F99","#FDC4B9","#B9C6E9","#F7D4AA","#AA95A6","#3A559C","#A2BEC2","#5F7C82","#2B6E7E","#1B3848"],l=1;17>l;l++)r.push({index:l,color:a[l-1]});for(var i=shuffleArray(r.slice()),c=80,d=0,s=0,u=0,f=0,m=0;4>m;m++)for(var p=0;4>p;p++)setCellValue(m,p,t,c,d,i),16==i[d].index&&(u=m*c,f=p*c,s=d),d++;document.onkeydown=function(e){var a=getKeyCode(e);(37==a||38==a||39==a||40==a)&&e.preventDefault();var l=movePuzzle(a,u,f,n,o,c,s,i);if(l&&"undefined"!=typeof l){t.clearRect(0,0,n,o),d=0;for(var m=0;4>m;m++)for(var p=0;4>p;p++)setCellValue(m,p,t,c,d,l),16==l[d].index&&(u=m*c,f=p*c,s=d),d++;isPuzzleComplete(r,l)&&alert("Bingo!")}}}}function isPuzzleComplete(e,t){for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function setCellValue(e,t,n,o,r,a){n.fillStyle="#1B3848",n.fillRect(e*o,t*o,o,o),n.fillStyle=a[r].color,n.fillRect(e*o+1,t*o+1,o-2,o-2),n.font="normal 30px sans-serif",n.fillStyle="#1B3848";var l=2.5,i=1.5;a[r].index>9&&(l=3.5);var c=e*o,d=t*o;n.fillText(a[r].index,c+o/l,d+o/i)}function movePuzzle(e,t,n,o,r,a,l,i){var c,d=i[l],s=l;if(39==e||68==e){if(t+a==o)return!1;s=l+4}else if(40==e||83==e){if(n+a==r)return!1;s=l+1}else if(37==e||65==e){if(0==t)return!1;s=l-4}else if(38==e||87==e){if(0==n)return!1;s=l-1}return c=i[s],i[l]=c,i[s]=d,i}function shuffleArray(e){for(var t,n,o=e.length;0!==o;)n=Math.floor(Math.random()*o),o-=1,t=e[o],e[o]=e[n],e[n]=t;return e}function getKeyCode(e){var t=window.event?window.event:e;return t.keyCode}function changeHeader(){var e=document.getElementById("header_root");if(null!=e&&"undefined"!=typeof e){var t=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight;console.log(t),toggleHeaderClass(t,e),window.onscroll=function(){toggleHeaderClass(t,e)},window.onresize=function(){t=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight,toggleHeaderClass(t,e)}}}function toggleHeaderClass(e,t){var n=window.pageYOffset||document.documentElement.scrollTop,o=getDocumentHeight(),r=o-e,a=e-70;e>=r&&(a=r),console.log(a),n>=a?t.addClass("header_top"):t.removeClass("header_top")}function getDocumentHeight(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function doAtOnload(){changeHeader(),birdsSong(),fifteenPuzzle(),race()}function race(){var e=["Billy","Willy","Dilly"];fillRateSelect("rate-select",e);var t="hedgehog";drawRacers("race",t);var n=document.querySelectorAll("."+t);drawNames(n,e),submitRateForm(t)}function disableRateSelect(e,t){e.disabled=t}function compareRateValue(e,t){return e===t}function showRateResult(e,t,n){var o,r=document.createElement("div"),a=document.createElement("div"),l=document.createElement("span"),i=document.createElement("h3"),c=document.createElement("button");o=e?"You are <span class='danger'>winner!!!</span>":"You lose. </br> Do not worry! Try again!",r.addClass("rate-result"),l.addClass("fa fa-times popup-cross close-result-popup"),a.addClass("rate-popup"),i.html(o),c.html("Play again").addClass("btn close-result-popup"),a.appendChild(l),a.appendChild(i),a.appendChild(c),r.appendChild(a),t.appendChild(r),r.onclick=function(){doAfterCloseResult(this,n)},l.onclick=c.onclick=function(){doAfterCloseResult(r,n)},a.onclick=function(e){e.stopPropagation()}}function doAfterCloseResult(e,t){e.remove(),disableRateSelect(t,!1)}function submitRateForm(e){var t=document.querySelectorAll("."+e);document.getElementById("rate-form").onsubmit=function(e){e.preventDefault();var n=document.getElementById("rate-select"),o=n.selectedIndex;disableRateSelect(n,!0);var r=shuffleArray([1,1.2,1.4]),a=getMaxArrayIndex(r),l=compareRateValue(a,o);[].slice.call(t).forEach(function(e,t,o){e.removeClass("hedgehog_winner"),animate(function(n){movingRacers(e,n,r[t])},2e3,function(){t===a&&e.addClass("hedgehog_winner"),0===t&&showRateResult(l,document.getElementById("race-container"),n)})})}}function drawRacers(e,t){var n=document.getElementById(e);if(null!=n&&"undefined"!=typeof n)for(var o,r=[56,56,56],a=[40,40,40],l=20,i=0;3>i;i++)o=document.createElement("div"),o.id=t+i,o.className=t,o.css({width:r[i]+"px",height:a[i]+"px",position:"absolute",top:i*(a[i]+l)+"px"}),n.appendChild(o)}function drawNames(e,t){var n;n="[object Array]"===Object.prototype.toString.call(e)?e:[].slice.call(e),n.forEach(function(e,n){var o=document.createElement("p");o.className="hedgehog-name",o.innerHTML=t[n],e.appendChild(o)})}function movingRacers(e,t,n){if(1>n)throw new Error("ERROR. Acceleration coefficient should be greater than or equal 1!");400>t*n/5?e.css({left:t*n/5+"px"}):e.css({left:"400px"})}function fillRateSelect(e,t){for(var n,o=document.getElementById(e),r=0;r<t.length;r++)n=document.createElement("option"),n.value=r,n.innerHTML=t[r],o.appendChild(n)}function animate(e,t,n){var o=performance.now();requestAnimationFrame(function r(a){var l=a-o;l>t&&(l=t),e(l),t>l?requestAnimationFrame(r):n&&"function"==typeof n&&n()})}function getMaxArrayIndex(e){for(var t=e[0],n=0,o=1;o<e.length;o++)e[o]>t&&(n=o,t=e[o]);return n}Object.prototype.addClass=Object.prototype.addClass||function(e){var t=new RegExp("(^|\\s)"+e+"(\\s|$)","g");if(!t.test(this.className))return this.className=(this.className+" "+e).replace(/\s+/g," ").replace(/(^ | $)/g,""),this},Object.prototype.removeClass=Object.prototype.removeClass||function(e){var t=new RegExp("(^|\\s)"+e+"(\\s|$)","g");return this.className=this.className.replace(t,"$1").replace(/\s+/g," ").replace(/(^ | $)/g,""),this},Object.prototype.hover=Object.prototype.hover||function(e,t){this.onmouseenter=e,this.onmouseleave=t},Object.prototype.css=Object.prototype.css||function(e){if(null===e||"object"!=typeof e)throw new Error("ERROR. Incorrect property value: "+e);for(var t in e)if(e.hasOwnProperty(t))try{this.style[t]=e[t]}catch(n){throw new Error(n)}return this},Element.prototype.remove=function(){this.parentElement.removeChild(this)},NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var e=this.length-1;e>=0;e--)this[e]&&this[e].parentElement&&this[e].parentElement.removeChild(this[e])},Object.prototype.html=Object.prototype.html||function(e){return this.innerHTML=e,this},window.addEventListener?window.addEventListener("load",doAtOnload,!1):window.attachEvent?window.attachEvent("onload",doAtOnload):window.onload=doAtOnload;