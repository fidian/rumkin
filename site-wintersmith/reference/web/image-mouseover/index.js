/*global document, Image, window*/
(function () {
	'use strict';

	if (!document.images) {
		return;
	}

	var imageLabels, imageTexts, imageArrayUp, imageArrayDown, imageArrayDesc, imageBlank, m;

	imageLabels = ['Img1', 'Img2', 'Img3', 'Img4', 'Img5', 'Img6'];
	imageTexts = [
        "Visit link 1 for nothing!",
		"Link 2 contains the same",
		"Link 3 is exceptionally void",
		"Are you having fun yet?",
		"Isn't just pure JavaScript cool?",
		"Last link ..."
	];
	imageArrayUp = [];
	imageArrayDown = [];
	imageArrayDesc = [];

	function makeImage(number, suffix) {
		var img;
		img = new Image();
		img.src = 'link' + number.toString() + suffix + '.gif';
		return img;
	}

	for (m = 1; m <= 6; m += 1) {
		imageArrayUp.push(makeImage(m, ''));
		imageArrayDown.push(makeImage(m, '-'));
		imageArrayDesc.push(makeImage(m, 'd'));
    }

	imageBlank = new Image();
	imageBlank.src = 'blank.gif';

	window.description = function (num) {
		var m;

		if (!num) {
			for (m = 0; m < 6; m += 1) {
				document.images[imageLabels[m]].src = imageArrayUp[m].src;
			}

			document.images.ImgDesc.src = imageBlank.src;
			document.Form1.Text1.value = "";
			window.status = "";
			return;
		}

		document.images[imageLabels[num - 1]].src = imageArrayDown[num - 1].src;
		document.images.ImgDesc.src = imageArrayDesc[num - 1].src;
		document.Form1.Text1.value = imageTexts[num - 1];
		window.status = imageTexts[num - 1];
	};
}());

