var $ = function (selector) {
  return new init(selector);
};

$.fn = $.prototype;

var init = $.fn.init = function(selector) {
  this.selector = selector;
  this[0] = document.querySelectorAll(this.selector);
};

init.fn = init.prototype = $.fn;
