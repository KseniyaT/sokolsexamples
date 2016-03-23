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
