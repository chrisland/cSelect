/**
* <select> framework
*
* @class cSelect
* @version 0.0.1
* @license MIT
*
* @author Christian Marienfeld post@chrisand.de
*
* ### Examples:
*
*	var mySelect = new cSelect( document.getElementById('mySelect') );
*
* @return {Object} cSelect Object
*
* @api public
*/

"use strict";

function cSelect(root, param) {

	if (!root) {
		throw new Error("missing main container");
		return false;
	}
	this._root = root;

	this._opt = {};

	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				this._opt[i] = param[i];
			}
		}
	}

	return this;


}



/**
* select to button list
*
* ### Examples:
*
*	var mySelect = new cSelect()
*
*	mySelect.toButtons();
*
*
*
* @function toButtons
* @version 0.0.1
*
* @return {Object} cSelect Object
*
* @api public
*/


cSelect.prototype.toButtons = function (param, onclickEvent) {

	var opt = {
		max: false,
		classWrap: 'cSelect-wrap',
		classItem: 'cSelect-item',
		elementWrap: 'div',
		elementItem: 'button'
	};

	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				opt[i] = param[i];
			}
		}
	}

	var root = this._root;
	var l = root.options.length;

	if (opt.max && !isNaN(opt.max)) {
		if (opt.max > l) {
			return this;
		}
	}

	var list = document.createElement(opt.elementWrap || 'div');
	list.className = opt.classWrap;
	for ( var i = 0; i < l; i++) {

		var btn = document.createElement(opt.elementItem || 'button');
		btn.textContent = root.options[i].innerText;
		btn.className = opt.classItem;
		btn.mySelect = {
			value: i
		};
		btn.onclick = function (e) {
			root.selectedIndex = this.mySelect.value;
			if (onclickEvent && typeof onclickEvent === 'function') {
				onclickEvent(this.mySelect, e, root);
			}
		};
		list.appendChild(btn);
	}

	root.style.display = 'none';
	document.body.insertBefore(list, root);

	return this;

};
