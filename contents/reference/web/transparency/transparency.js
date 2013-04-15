/*global document, window*/
var CurrentOpacity = 99, ImageFade = null;

function setObjectOpacity(obj_name, percent) {
	'use strict';
	var menuobj;

	// Compensate for odd parameters and flicker bug
	if (percent > 99) {
		percent = 99;
	}

	if (percent < 0) {
		percent = 0;
	}

	if (document.all) {
		// Internet Explorer
		menuobj = document.all[obj_name];
		menuobj.filters.alpha.opacity = percent;
	} else if (document.getElementById) {
		// The rest
		menuobj = document.getElementById(obj_name);
		menuobj.style.MozOpacity = percent / 100;
		menuobj.style.opacity = percent / 100;
	}
}

function SetOpacityStep(target) {
	'use strict';
	if (window.ImageFade) {
		clearTimeout(ImageFade);
	}

	if (CurrentOpacity === target) {
		return;
	}

	if (CurrentOpacity > target) {
		CurrentOpacity -= 4;
	} else {
		CurrentOpacity += 4;
	}

	setObjectOpacity('testImage', CurrentOpacity);
	document.imgform.imgopacity.value = CurrentOpacity;
	ImageFade = setTimeout('SetOpacityStep(' + target + ')', 50);
}

