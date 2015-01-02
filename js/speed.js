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

  $.extend = $.fn.extend = function(target) {
    var isBool = typeof(target) === 'boolean' && target === true ? true : false;
    target = isBool ? {} : target || {};
    var key;
    for(var i = 1; i < arguments.length; i++) {
      if(isBool) {
        var obj = arguments[i];
        if(!obj) continue;
        for(key in obj) {
          if(obj.hasOwnProperty(key)) {
            if(typeof(obj[key]) === 'object')
              target[key] = $.extend({},target[key],obj[key]);
            else
              target[key] = obj[key];
          }
        }
      }else{
        if(!arguments[i]) continue;
        for(key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key)) target[key] = arguments[i][key];
        }
      }
    }
    return target;
  };

  $.fn.each = function(callback) {
    this.elements.forEach(function(element) {
      if(typeof(element)==='object') callback.call(element);
    });
  };

  $.fn.css = function(prop, val) {
    val = typeof val !== 'undefined' ? val : null;
    switch(typeof(prop)){
      case 'object':
        this.each(function() {
          for(var i in prop) {
            if(typeof(i) === 'string') {
              this.style[i] = prop[i];
            }
          }
        });
        break;
      case 'string':
        this.each(function() {
          this.style[prop] = val;
        });
        break;
    }
    return this;
  };

  $.fn.show = function() {
    this.css('display','block');
    return this;
  };

  $.fn.hide = function() {
    this.css('display','none');
    return this;
  };

  window.$ = $;

})();
