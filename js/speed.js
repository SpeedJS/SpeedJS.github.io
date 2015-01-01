var $ = function (selector) {
  return new init(selector);
};

$.fn = $.prototype;

var init = $.fn.init = function(selector) {
  this.selector = selector;
  this[0] = $.fn.elements(this.selector);
};

$.fn.elements = function(selector) {
  console.log(selector);
  console.log(document.querySelectorAll(selector));
};

init.fn = init.prototype = $.fn;
