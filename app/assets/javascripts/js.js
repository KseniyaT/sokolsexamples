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

