(function() {

  var $ = function (selector) {
    return new init(selector);
  };

  $.fn = $.prototype;

  var init = $.fn.init = function(selector) {
    this.selector = selector;
    var elements;
    var isAttrSelector = (this.selector.indexOf('[') >= 0);
    var selectorType = isAttrSelector ? "attr" : this.selector.charAt(0);
    switch(selectorType) {
      case "#":
        elements = document.getElementById(this.selector.substring(1));
        break;
      case ".":
        elements = document.getElementsByClassName(this.selector.substring(1));
        break;
      case "attr":
        elements = document.querySelectorAll(this.selector);
        break;
      default:
        elements = document.getElementsByTagName(this.selector);
    }
    this.elements = [];
    for(var i in elements) {
      if(typeof(elements[i])==="object") {
        this.elements.push(elements[i]);
      }
    }

    if(this.elements.length === 0) {
      console.log([]);
    }else {
      console.dirxml(this.elements);
    }
  };

  init.fn = init.prototype = $.fn;

  $.fn.addClass = function(cname) {
    this.each(function() {
      if(this.classList)
        this.classList.add(cname);
      else
        this.className += ' ' + cname;
    });
    return this;
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

  $.fn.each = function(callback) {
    this.elements.forEach(function(element) {
      if(typeof(element)==='object') callback.call(element);
    });
  };

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
            if(typeof(obj[key]) === 'object') {
              target[key] = $.extend({},target[key],obj[key]);
            }else{
              target[key] = obj[key];
            }
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

  $.fn.hasClass = function(cname) {
    var result;
    this.each(function() {
      if(this.classList)
        result = this.classList.contains(cname);
      else
        result = new RegExp('(^| )' + cname + '( |$)', 'gi').test(this.cname);
    });
    return result;
  };

  $.fn.hide = function() {
    this.css('display','none');
    return this;
  };

  $.fn.is = function(selector) {
    var result;
    this.each(function() {
      result = (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector).call(this, selector);
    });
    return result;
  };

  $.fn.removeClass = function(cname) {
    this.each(function() {
      if (this.classList)
        this.classList.remove(cname);
      else
        this.className = this.className.replace(new RegExp('(^|\\b)' + cname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
    return this;
  };

  $.fn.toggleClass = function(cname) {
    this.each(function() {
      if(this.classList) {
        this.classList.toggle(cname);
      }else{
        var classes = this.className.split(' ');
        var existingIndex = classes.indexOf(cname);
        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        }else {
          classes.push(cname);
        }
        this.className = classes.join(' ');
      }
    });
    return this;
  };

  $.fn.show = function() {
    this.css('display','block');
    return this;
  };

  window.$ = $;

})();
