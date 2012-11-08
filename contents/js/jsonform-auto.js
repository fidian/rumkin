/*global $, document*/
$(function () {
	'use strict';
	var apiUrlBase, urlSplit;

	urlSplit = document.location.toString().split('/');

	if (urlSplit[2] === 'localhost:8080') {
		urlSplit[2] = 'rumkin.fuf.me';
	}

	apiUrlBase = urlSplit.slice(0, 2).join('/') + "/api." + urlSplit[2];
	$("form.jsonform").each(function () {
		var $form, schemaUrl;

		$form = $(this);
		schemaUrl = apiUrlBase + $form.attr('schema');
		$form.attr('action', apiUrlBase + $form.attr('action'));
		$.ajax({
			dataType: "json",
			error: function (jqXHR, textStatus, errorThrown) {
				$form.text("Unable to load form's schema from " + schemaUrl + " -- try again later or email me about this problem so I can fix it.  Error: " + errorThrown);
			},
			success: function (data, textStatus, jqXHR) {
				// Build form
				$form.jsonForm({
					schema: data
				});
			},
			url: schemaUrl
		});
	});
});
