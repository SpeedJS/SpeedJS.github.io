(function() {
  
  var $ = function (selector) {
    return new init(selector);
  };

  $.fn = $.prototype;

  var init = $.fn.init = function(selector) {
    this.selector = selector;
    var elements = document.querySelectorAll(this.selector);
    this.elements = [];
    for(var i in elements) {
      if(typeof(elements[i])==="object") {
        this.elements.push(elements[i]);
      }
    }
  };

  init.fn = init.prototype = $.fn;

  $.fn.each = function(callback) {
    this.elements.forEach(function(element) {
      if(typeof(element)==='object') callback.call(element);
    });
  };

  $.fn.css = function(prop, val) {
    val = typeof val !== 'undefined' ? val : null;
    switch(typeof(prop)){
      case 'object':
        $(this.selector).each(function() {
          for(var i in prop) {
            if(typeof(i) === 'string') {
              this.style[i] = prop[i];
            }
          }
        });
        break;
      case 'string':
        $(this.selector).each(function() {
          this.style[prop] = val;
        });
        break;
    }
    return this;
  };

  $.fn.show = function() {
    $(this.selector).css('display','block');
    return this;
  };

  $.fn.hide = function() {
    $(this.selector).css('display','none');
    return this;
  };

  window.$ = $;

})();
