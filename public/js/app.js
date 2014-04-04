$(function () {
	$(".rest-resource").focus(function () {
		$(this).val("");
	});

	var displayJsonResult = function ($context, data) {
		$context.html(JSON.stringify(data, null, 4)).slideDown();
	}

	$("#single-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#single-postcode-result").slideUp(),
				postcode = $("#single-postcode-input").val();
		$.get(encodeURI("/postcodes/" + postcode))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	$("#random-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#random-postcode-result").slideUp();
		$.get(encodeURI("/random/postcodes"))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	$("#validate-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#validate-postcode-result").slideUp(),
				postcode = $("#validate-postcode-input").val();
		$.get(encodeURI("/postcodes/" + postcode + "/validate"))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	$("#autocomplete-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#autocomplete-postcode-result").slideUp(),
				postcode = $("#autocomplete-postcode-input").val();
		$.get(encodeURI("/postcodes/" + postcode +"/autocomplete"))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	$("#geocode-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#geocode-postcode-result"),
				lon = $("#lon-input").val(),
				lat = $("#lat-input").val();
		$.get(encodeURI("postcodes/lon/" + lon +"/lat/" + lat))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	$("#query-postcode").click(function (event) {
		event.preventDefault();
		var $result = $("#query-postcode-result"),
				postcode = $("#query-postcode-input").val();
		$.get(encodeURI("/postcodes?q=" + postcode))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});

	var bulkTimeout,
	$bulkPostcodeInput = $("#bulk-postcodes-input")
	.keyup(function (event) {
		clearTimeout(bulkTimeout);
		bulkTimeout = setTimeout(function () {
			var data;
			try {
				data = JSON.parse($bulkPostcodeInput.val());
				if (Object.keys(data).length > 1) throw "Invalid"
				if (!data['postcodes'])	throw "Invalid"
				if (!Array.isArray(data['postcodes'])) throw "Invalid"
				$bulkPostcodeInput.removeClass("invalid");
			} catch (e) {
				$bulkPostcodeInput.addClass("invalid");
			}
		}, 1000);
	});

	$("#bulk-postcodes").click(function (event) {
		event.preventDefault();
		var $result = $("#bulk-postcodes-result"),
				data = $bulkPostcodeInput.val(),
				postcodes;

		try {
			postcodes = JSON.parse(data);
			$.post("/postcodes", postcodes)
			.done(function (data) {
				displayJsonResult($result, data);
			})
			.fail(function (error) {
				displayJsonResult($result, error.responseJSON);
			});
		} catch (e) {
			$bulkPostcodeInput.addClass("invalid");
		}
	});

	var bulkGeocodeTimeout,
	$bulkGeocodeInput = $("#bulk-reverse-input")
	.keyup(function (event) {
		clearTimeout(bulkTimeout);
		bulkGeocodeTimeout = setTimeout(function () {
			var data;
			try {
				data = JSON.parse($bulkGeocodeInput.val());
				if (Object.keys(data).length > 1) throw "Invalid"
				if (!data['geolocations'])	throw "Invalid"
				if (!Array.isArray(data['geolocations'])) throw "Invalid"
				$bulkGeocodeInput.removeClass("invalid");
			} catch (e) {
				$bulkGeocodeInput.addClass("invalid");
			}
		}, 1000);
	});

	$("#bulk-reverse").click(function (event) {
		event.preventDefault();
		var $result = $("#bulk-reverse-result"),
				data = $bulkGeocodeInput.val(),
				locations;

		try {
			locations = JSON.parse(data);
			$.post("/postcodes", locations)
			.done(function (data) {
				displayJsonResult($result, data);
			})
			.fail(function (error) {
				displayJsonResult($result, error.responseJSON);
			});
		} catch (e) {
			$bulkGeocodeInput.addClass("invalid");
		}
	});

	$("#show-outcode").click(function (event) {
		event.preventDefault();
		var $result = $("#show-outcode-result").slideUp(),
				outcode = $("#show-outcode-input").val();
		$.get(encodeURI("/outcodes/" + outcode))
		.done(function (data) {
			displayJsonResult($result, data);
		})
		.fail(function (error) {
			displayJsonResult($result, error.responseJSON);
		});
	});
});