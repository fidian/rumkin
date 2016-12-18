// functions to manipulate SELECT and OPTION tags
function MakeSelectOption(el, val, txt, sel) {
	var opt_el = document.createElement('OPTION');
	opt_el.value = val;
	if (sel) {
		opt_el.setAttribute('selected', 'selected');
	}
	opt_el.appendChild(document.createTextNode(txt));
	el.appendChild(opt_el)
}

function DeleteSelectOptions(el) {
	while (el.options.length > 0) {
		el.remove(0);
	}
}

