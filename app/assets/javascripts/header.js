function changeHeader(){
  var header_root = document.getElementById("header_root");
  if (header_root != null && typeof header_root != 'undefined') {
    var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
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