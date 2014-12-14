/*///////////////////////////////////////////////////////////
					MODULE LOADER
///////////////////////////////////////////////////////////*/

!function(a){"use strict";function k(d,g,i){function r(){if(4==q.readyState){if(200!=q.status)throw new b("unable to load "+o.id+" ("+q.status+" "+q.statusText+")");if(f[p])return console.warn("module locked: "+o.id),g&&setTimeout(r,0),void 0;if(!e[p]){var d=i?i(q.responseText):q.responseText;a(o,e,c,"function(){\n"+d+"\n}")}g&&g(e[p])}}if(d instanceof Array){for(var j=new Array,m=d.length,n=0;n<d.length;n++)!function(a,b){j.push(k(a,g&&function(a){j[b]=a,0==--m&&g(j)},i))}(d[n],n);return j}i=void 0!==i?i:h;var o=l(d),p="$"+o.id;if(e[p])return"string"==typeof e[p]&&a(o,e,c,e[p]),g&&setTimeout(function(){g(e[p])},0),e[p];var q=new XMLHttpRequest;return g&&(q[null===q.onload?"onload":"onreadystatechange"]=r),q.open("GET",o.uri,!!g),f[p]=f[p]++||1,q.send(),f[p]--,!g&&r(),e[p]}function l(a){var e=a.match(/^(?:([^:\/]+):)?(\.\.?)?\/?((?:.*\/)?)([^\.]+)?(\..*)?$/),f=c[0].match(/^(?:([^:\/]+):)?(.*)/),h=e[2]?g[f[1]?parseInt(f[1]):0]:g[e[1]?parseInt(e[1]):0];d.href=(e[2]?h+f[2]+e[2]+"/":h)+e[3]+(e[4]?e[4]:"index");var i="/"+d.href.replace(/^[^:]*:\/\/[^\/]*\/|\/(?=\/)/,""),j=i+(e[5]?e[5]:".js");if(i.substr(0,h.length)!=h)throw new b("Relative identifier outside of module root");return i=(e[1]?e[1]+":":"0:")+i.substr(h.length),{id:i,uri:j}}var b=function(a){this.name="SmoothieError",this.message=a};b.prototype=Object.create(Error.prototype);for(var c=Array(""),d=document.createElement("A"),e=document.createElement("DIV"),f=new Object,g=window.Smoothie&&void 0!==window.Smoothie.requirePath?window.Smoothie.requirePath.slice(0):["./"],h=window.Smoothie&&void 0!==window.Smoothie.requireCompiler?window.Smoothie.requireCompiler:null,i=0;i<g.length;i++)d.href=g[i],g[i]="/"+d.href.replace(/^[^:]*:\/\/[^\/]*\/|\/(?=\/)/g,"");for(var j in window.Smoothie&&window.Smoothie.requirePreloaded)e["$"+l(j).id]=window.Smoothie.requirePreloaded[j].toString();for(var j in window.Smoothie&&window.Smoothie.requireOverrides)e["$"+l(j).id]=window.Smoothie.requireOverrides[j];if(void 0!==window.require)throw new b("'require' already defined in global scope");try{Object.defineProperty(window,"require",{value:k}),Object.defineProperty(window.require,"resolve",{value:l}),Object.defineProperty(window.require,"path",{get:function(){return g.slice(0)}})}catch(m){window.require=k,window.require.resolve=l,window.require.path=g.slice(0)}}(function(module){var global=window,exports=new Object;if(Object.defineProperty(module,"exports",{get:function(){return exports},set:function(a){exports=a}}),arguments[2].unshift(module.id.match(/(?:.*\/)?/)[0]),Object.defineProperty(arguments[1],"$"+module.id,{get:function(){return exports}}),arguments[3]="("+arguments[3]+")();\n//# sourceURL="+module.uri,eval(arguments[3]),"string"!=typeof module.id)for(id in module)arguments[1]["$"+require.resolve(id).id]=module[id].toString();arguments[2].shift()});

/*///////////////////////////////////////////////////////////
				   END MODULE LOADER
///////////////////////////////////////////////////////////*/

var $ = function(e) {
	var isAttrSelector = (e.indexOf('[') >= 0),
		selector = e.substring(1),
		selectorType = isAttrSelector ? "attr" : e.charAt(0),
		elements = {};
	switch(selectorType) {
		case "#":
			elements = document.getElementById(selector);
			break;
		case ".":
			elements = document.getElementsByClassName(selector);
			break;
		case "attr":
			elements = document.querySelectorAll(e);
			break;
		default:
			elements = document.getElementsByTagName(e);
	}

	elements.selector = e;

	elements.each = function(callback) {
		if(elements.length){
			for(var element in elements) {
				if(typeof(elements[element])==='object'){
					callback.call(elements[element], element);
				}
			}	
		}else{
			if(typeof(elements)==='object'){
				callback.call(elements);
			}
		}
	};

	elements.css = function(attrObj, attrVal) {
		attrVal = typeof attrVal !== 'undefined' ? attrVal : null;
		var applyCssStyles = function(attr, value) {
			$(elements.selector).each(function() {
				if(this.style.cssText){
					this.style.cssText = this.style.cssText + " " + attr + ":" + value;
				}else{
					this.style.cssText = attr + ":" + value;
				}
			});
		};
		switch(typeof(attrObj)){
			case 'object':
				for(var attr in attrObj) {
					applyCssStyles(attr, attrObj[attr]);
				}
				break;
			case 'string':
				applyCssStyles(attrObj, attrVal);
				break;
		}
	};

	elements.show = function() {
		elements.css('display', 'block');
	};

	elements.hide = function() {
		elements.css('display', 'none');
	};

	elements.toggle = function() {
		for(var elem in elements) {
			if(typeof(elements[elem])==='object'){
				elements[elem].style.display = (elements[elem].style.display==="none") ? "block" : "none";
			}
		}
	};

	elements.addClass = function(classNames) {
		var hasWhiteSpace = (classNames.indexOf(' ') >= 0),
			applyClassName = function(newClass) {
				$(elements.selector).each(function() {
					if(this.className){
						var classExists = (this.className.indexOf(newClass) >= 0);
						this.className = classExists ? this.className : this.className + " " + newClass;
					}else{
						this.className = newClass;
					}
				});
			};
		classNames = hasWhiteSpace ? classNames.split(' ') : classNames;
		switch(typeof(classNames)){
			case 'object':
				for(var cName in classNames) {
					applyClassName(classNames[cName]);
				}
				break;
			case 'string':
				applyClassName(classNames);
				break;
		}
	};

	elements.removeClass = function(classNames) {
		var hasWhiteSpace = (classNames.indexOf(' ') >= 0),
			removeClassName = function(newClass) {
				$(elements.selector).each(function() {
					if(this.className){
						var classExists = (this.className.indexOf(newClass) >= 0),
							classnames = classExists ? this.className.replace(newClass,'') : this.className;
						classnames = classnames.trim();
						classnames = classnames.replace(/\s+/g, " ");
						this.className = classnames;
					}
				});
			};
		classNames = hasWhiteSpace ? classNames.split(' ') : classNames;
		switch(typeof(classNames)){
			case 'object':
				for(var cName in classNames) {
					removeClassName(classNames[cName]);
				}
				break;
			case 'string':
				removeClassName(classNames);
				break;
		}
	};

	elements.toggleClass = function(classNames) {
		var hasWhiteSpace = (classNames.indexOf(' ') >= 0);
		classNames = hasWhiteSpace ? classNames.split(' ') : classNames;
		var toggleClassName = function(tclass) {
			$(elements.selector).each(function() {
				if(this.className) {
					var classExists = (this.className.indexOf(tclass) >= 0);
					var classnames = classExists ? this.className.replace(tclass,'') : this.className + " " + tclass;
					classnames = classnames.trim();
					classnames = classnames.replace(/\s+/g, " ");
					this.className = classnames;
				}else{
					this.className = tclass;
				}
			});
		};
		switch(typeof(classNames)){
			case 'object':
				for(var cName in classNames) {
					toggleClassName(classNames[cName]);
				}
				break;
			case 'string':
				toggleClassName(classNames);
				break;
		}
	};

	elements.append = function(obj) {
		switch(typeof(obj)){
			case 'object':
				$(elements.selector).each(function() {
					this.appendChild(obj);
				});
				break;
			case 'string':
				$(elements.selector).each(function() {
					this.innerHTML = this.innerHTML + obj;
				});
				break;
		}
	};

	elements.appendTo = function(obj) {
		var elementContent = (elements.length===0) ? elements.selector : elements;
		switch(typeof(elementContent)){
			case 'object':
				switch(typeof(obj)){
					case 'object':
						obj.each(function() {
							this.appendChild(elementContent);
						});
						break;
					case 'string':
						$(obj).each(function() {
							this.appendChild(elementContent);
						});
						break;
				}
				break;
			case 'string':
				switch(typeof(obj)){
					case 'object':
						obj.each(function() {
							this.innerHTML = this.innerHTML + elementContent;
						});
						break;
					case 'string':
						$(obj).each(function() {
							this.innerHTML = this.innerHTML + elementsContent;
						});
						break;
				}
				break;
		}
	};

	elements.prepend = function(obj) {
		switch(typeof(obj)){
			case 'object':
				$(elements.selector).each(function() {
					this.insertBefore(obj,this.childNodes[0]);
				});
				break;
			case 'string':
				$(elements.selector).each(function() {
					this.innerHTML = obj + this.innerHTML;
				});
				break;
		}
	};

	elements.prependTo = function(obj) {
		var elementContent = (elements.length===0) ? elements.selector : elements;
		switch(typeof(elementContent)){
			case 'object':
				switch(typeof(obj)){
					case 'object':
						obj.each(function() {
							this.insertBefore(elementContent,this.childNodes[0]);
						});
						break;
					case 'string':
						$(obj).each(function() {
							this.insertBefore(elementContent,this.childNodes[0]);
						});
						break;
				}
				break;
			case 'string':
				switch(typeof(obj)){
					case 'object':
						obj.each(function() {
							this.innerHTML = elementContent + this.innerHTML;
						});
						break;
					case 'string':
						$(obj).each(function() {
							this.innerHTML = elementsContent + this.innerHTML;
						});
						break;
				}
				break;
		}
	};

	elements.copy = function(obj) {
		switch(typeof(obj)){
			case 'object':
				$(elements.selector).each(function() {
					var newObject = obj.cloneNode(true);
					this.appendChild(newObject);
				});
				break;
		}
	};

	elements.html = function(newHtml) {
		switch(typeof(newHtml)) {
			case "function":
				$(elements.selector).each(function() {
					this.innerHTML = newHtml.call(this);
				});
				break;
			case "object":
				$(elements.selector).each(function() {
					this.innerHTML = newHtml.innerHTML;
				});
				break;
			case "string":
				$(elements.selector).each(function() {
					this.innerHTML = newHtml;
				});
				break;
			case "undefined":
				newHtml = null;
				var getHTML = elements.length ? elements[0].innerHTML : elements.innerHTML;
				return getHTML;
				break;
		}
	};

	elements.val = function(newVal) {
		switch(typeof(newVal)) {
			case "function":
				$(elements.selector).each(function() {
					this.value = newVal.call(this);
				});
				break;
			case "object":
				$(elements.selector).each(function() {
					this.value = newVal.innerHTML;
				});
				break;
			case "string":
				$(elements.selector).each(function() {
					this.value = newVal;
				});
				break;
			case "undefined":
				newVal = null;
				var getVal = elements.length ? elements[0].value : elements.value;
				return getVal;
				break;
		}
	};

	elements.text = function(newText) {
		switch(typeof(newText)) {
			case "function":
				$(elements.selector).each(function() {
					this.innerHTML = newText.call(this);
				});
				break;
			case "object":
				$(elements.selector).each(function() {
					this.innerHTML = newText.innerHTML;
				});
				break;
			case "string":
				$(elements.selector).each(function() {
					this.innerHTML = newText;
				});
				break;
			case "undefined":
				newText = null;
				var getText = elements.length ? ((elements[0].textContent===undefined) ? elements[0].innerText : elements[0].textContent) : ((elements.textContent===undefined) ? elements.innerText : elements.textContent);
				return getText;
				break;
		}
	};

	elements.attr = function(newAttr, newValue) {
		switch(typeof(newValue)) {
			case "function":
				$(elements.selector).each(function() {
					this.setAttribute(newAttr, newValue.call(this));
				});
				break;
			case "object":
				$(elements.selector).each(function() {
					this.setAttribute(newAttr, newValue.innerHTML);
				});
				break;
			case "string":
				$(elements.selector).each(function() {
					this.setAttribute(newAttr, newValue);
				});
				break;
			case "undefined":
				newValue = null;
				var getValue = elements.length ? elements[0].getAttribute(newAttr) : elements.getAttribute(newAttr);
				return getValue;
		}
	};

	elements.removeAttr = function(oldAttr) {
		$(elements.selector).each(function() {
			this.removeAttribute(oldAttr);
		});
	};

	elements.prop = function(newProp, newValue) {
		switch(typeof(newValue)) {
			case "undefined":
				newValue = null;
				var currentValue = $(elements.selector)[0][newProp];
				return currentValue;
			default:
				$(elements.selector).each(function() {
					this[newProp] = newValue;
				});
				break;
		}
	};

	return elements;
};