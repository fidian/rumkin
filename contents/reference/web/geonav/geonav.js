/*global document, Image, window*/
var CountryNames, KeyImageNumber, Filled, TransferImages, CurrentLocation, Step, Timeout, Movement, globeOldOnload;

// Sets up the transfer images to make the world spin
function setUpImages(From, To, Number) {
	'use strict';
	var i, PathBase, Path;

	KeyImageNumber[From] = Filled;

	TransferImages[Filled] = new Image();
	TransferImages[Filled].src = CountryNames[From] + ".jpg";

	Filled += 1;

	PathBase = CountryNames[From] + "-" + CountryNames[To] + "-";
	for (i = 1; i < Number; i += 1) {
		// Skip the first one since it's the same as the ??.jpg files
		Path = PathBase;
		if (i < 100) {
			Path += "0";
			if (i < 10) {
				Path += "0";
			}
		}
		TransferImages[Filled] = new Image();
		TransferImages[Filled].src = Path + i + ".jpg";

		Filled += 1;
	}
}

function showHideDiv(id, show) {
	'use strict';
	var d = document.getElementById('geo_info_' + id);
	if (d) {
		if (show) {
			d.style.display = "block";
		} else {
			d.style.display = "none";
		}
	}
}

function loadNav(divId) {
	'use strict';
	showHideDiv('loading', 0);
	showHideDiv('na', 0);
	showHideDiv('sa', 0);
	showHideDiv('af', 0);
	showHideDiv('as', 0);
	showHideDiv('au', 0);
	showHideDiv('credits', 0);
	showHideDiv(divId, 1);
}

function GoGoGadgetMenu() {
	'use strict';
	var i;
	for (i = 0; i < 5; i += 1) {
		if (CurrentLocation === KeyImageNumber[i]) {
			loadNav(CountryNames[i]);
		}
	}
}

function updateMap() {
	'use strict';
	if (Movement > 0) {
		clearTimeout(Timeout);
		CurrentLocation += Step;
		Movement -= 1;

		if (CurrentLocation >= Filled) {
			CurrentLocation -= Filled;
		}
		if (CurrentLocation < 0) {
			CurrentLocation += Filled;
		}

		document.World.src = TransferImages[CurrentLocation].src;
	} else if (Movement === 0) {
		Timeout = window.setTimeout(GoGoGadgetMenu, 100);
	}
}

function SpinGlobe() {
	'use strict';
	Movement += Filled;
	if (Movement === Filled) {
		updateMap();
	}
}

function GoTo(Target) {
	'use strict';
	var Diff1, Diff2;
	Target = KeyImageNumber[Target];

	if (Target === CurrentLocation) {
		return;
	}
	if (Target < CurrentLocation) {
		Target += Filled;
	}
	Diff1 = Target - CurrentLocation;
	Target -= Filled;
	Diff2 = CurrentLocation - Target;
	if (Diff2 < Diff1) {
		Step = -1;
		Movement = Diff2;
	} else {
		Step = 1;
		Movement = Diff1;
	}

	loadNav("");

	updateMap();
}

function GlobeOnload() {
	'use strict';
	loadNav('loading');
	window.setTimeout(SpinGlobe, 10);
	if (globeOldOnload) {
		globeOldOnload();
	}
}

CurrentLocation = 0;
Step = 1;
Timeout = 0;
Movement = 0;

// Set up the Transfer Image arrays
TransferImages = new Array(47);
Filled = 0;
KeyImageNumber = new Array(5);

// Set up the country names
CountryNames = new Array(5);
CountryNames[0] = "na"; // North America
CountryNames[1] = "sa"; // South America (and maybe Antartica?)
CountryNames[2] = "af"; // Africa and Europe
CountryNames[3] = "as"; // Asia
CountryNames[4] = "au"; // Australia

// Set up individual motions
// Usage:  setUpImages(Continent_From, Continent_To, Maximum_Number_of_Image)
setUpImages(0, 1, 6);   // North America to South America
setUpImages(1, 2, 10);  // South America to Africa & Europe
setUpImages(2, 3, 9);   // Africa & Europe to Asia
setUpImages(3, 4, 5);   // Asia to Australia
setUpImages(4, 0, 17);  // Australia to North America

globeOldOnload = window.onload;
window.onload = GlobeOnload;
