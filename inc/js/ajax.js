// AJAX library


// Make a request to the web server, works with multiple threads, but don't try too many at once.
// req = an old HTTP Request to reuse, or null to make a new one with NewXHR.
// url_str = the URL to load
// func = the callback function, which is called with every status change
// param = an additional parameter that can be passed to func
// Returns req or the newly created HTTP Request
//
// Usage:
// var global_request = null;  // We only want to use one request at a time in this example.
// function Something_Status_Change(request, param) {  // This is the callback function
// 	if (request.readyState != 4) return 1;  // Only care if we finished the request
//    if (request.status != 200) {
//       alert('We did not get a successful return code from the request.  Handle appropriately.');
//       return 1;
//    }
//    alert('We have finished.  The data returned by the request is ...')
//    alert(request.responseText);
//    alert('Also, we have the parameter passed with the MakeRequest() function, 1234 == ' + param);
//    return 0;  // Signal that we do not want further calls to this callback for this request
// }
// function Something_On_Update() {
//   global_request = MakeRequest(global_request, 'http://site/ajax.php', Something_Status_Change, '1234');
// }
function MakeRequest(req, url_str, func, param) {
	function BindCallback() {
		if (func_ts) {
			if (! func_ts(req_ts, param_ts)) {
				func_ts = null;
			}
		}
	}

	var req_ts = req;
	var func_ts = func;
	var param_ts = param;

	if (req_ts && req_ts != null) {
		req_ts.abort();
	} else {
		req_ts = NewXHR();
	}

	req_ts.open("GET", url_str, true);
	req_ts.onreadystatechange = BindCallback;
	req_ts.send(null);

	return req_ts;
}


function MakeRequestPost(req, url_str, post_data, func, param) {
	function BindCallback() {
		if (func_ts) {
			if (! func_ts(req_ts, param_ts)) {
				func_ts = null;
			}
		}
	}

	var req_ts = req;
	var func_ts = func;
	var param_ts = param;

	if (req_ts && req_ts != null) {
		req_ts.abort();
	} else {
		req_ts = NewXHR();
	}

	req_ts.open("POST", url_str, true);
	req_ts.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	req_ts.setRequestHeader('Content-length', post_data.length);
	req_ts.setRequestHeader('Connection', 'close');
	req_ts.onreadystatechange = BindCallback;
	req_ts.send(null);

	return req_ts;
}


// Create a new HTTP Request for various different types of browsers
// Probably should not be called directly by any external programs
function NewXHR() {
	var obj = false;

	if (! obj && typeof(XMLHttpRequest) != 'undefined') {
		try {
			obj = new XMLHttpRequest();
		} catch (e) {
			obj = false;
		}
	}
	if (! obj && window.createRequest) {
		try {
			obj = window.createRequest();
		} catch (e) {
			obj = false;
		}
	}
	if (! obj && window.ActiveXObject) {
		try {
			obj = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			obj = false;
		}
	}
	if (! obj && window.ActiveXObject) {
		try {
			obj = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			obj = false;
		}
	}

	return obj;
}


document.ajax_loaded = 1;