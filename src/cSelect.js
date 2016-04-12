/**
* <select> framework
*
* @class cSelect
* @version 0.0.3
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
* @version 0.0.3
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

	var active = undefined;
	var list = document.createElement(opt.elementWrap || 'div');
	list.className = opt.classWrap;
	for ( var i = 0; i < l; i++) {

		var btn = document.createElement(opt.elementItem || 'button');
		btn.textContent = root.options[i].innerText;
		if (!root.options[i].innerText) {
			btn.style.display = 'none';
		}
		btn.className = opt.classItem;
		btn.mySelect = {
			value: i
		};
		btn.onclick = function (e) {
			e.preventDefault();
			root.selectedIndex = e.target.mySelect.value;
			if (active) {
				active.classList.remove('active');
			}
			e.target.classList.add('active');
			active = e.target;
			if (onclickEvent && typeof onclickEvent === 'function') {
				onclickEvent(e.currentTarget.mySelect, e, root);
			}
			return false;
		};
		list.appendChild(btn);
	}

	root.style.display = 'none';
	root.parentNode.insertBefore(list, root.nextSibling);

	return this;

};
