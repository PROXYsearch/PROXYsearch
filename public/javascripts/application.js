// set global preferance for ajax return type, default:javascript
jQuery.ajaxSettings.dataType = 'html';

// set defaults for all datepickers
jQuery.datepicker.setDefaults({dateFormat:'M d, yy'});


/**********   AJAX Callback functions    **********************************/
/**********   AJAX Callback functions    **********************************/

// callback for event "ajax:beforeSend"
var my_ajax_beforeSend = function(target, xhr, settings) {
  console.log("handling ajax:beforeSend");
};

// callback for event "ajax:complete"
var my_ajax_complete = function(target, xhr, status) {
  console.log("handling ajax:complete");
};

// callback for event "ajax:error"
var my_ajax_error = function(target, xhr, status, error) {
  console.log("handling ajax:error");
};

// callback for event "ajax:success"
var my_ajax_success = function(target, data, status, xhr) {
  console.log("handling ajax:success");
  var element = jQuery(target);

  var target_element = jQuery("#results");

  if( target_element ) {

    // insert the response into the web page
    target_element.html(xhr.responseText);

  } else
    jQuery.error("my_ajax_success: Cannot find element '#results'" );

};

// datepicker components
jQuery(document)
  .delegate("[data-datepicker='true']", "focus", function() {
    dp = jQuery(this);
    dp.datepicker("destroy");
    dp.datepicker({constrainInput:true});

    var maxdate = ( dp.data("maxdate") ? maxdate = dp.data("maxdate") : "+1y" );
    dp.datepicker( "option", "maxDate", maxdate);

    var mindate =  ( dp.data("mindate") ? minDate = dp.data("mindate") : "-1y" );
    dp.datepicker( "option", "minDate", mindate);

    dp.datepicker("show");

  });


jQuery(document)
  .delegate("input[data-trigger=radio-toggle]", "click", function() {
    var e = jQuery(this);

    var form = e.closest("form");
    var inputs_to_toggle = form.find("[data-radio-toggle]");
    inputs_to_toggle.toggle(false); // hide them all
    var active_input_selector = "[data-radio-toggle='" + e.attr("value") + "']";
    console.log(active_input_selector);
    form.find(active_input_selector).toggle(true);
  });


/* *************************** FORM MASH UP *******************************/
/* *************************** FORM MASH UP *******************************/
/* *************************** FORM MASH UP *******************************/

// combine multiple form posts in one call

// use FormData API to get form inputs
// group inputs by [data-form-mash]
function build_request_body( form_data_parent, form_data, ajax_settings ) {
  if( form_data_parent && form_data ) {
    var form_inputs_selector = "select, textarea, input:not([type=submit])";
    var form_mashes = form_data_parent.find( "[data-form-mash]" );
    for( var m=0; m<form_mashes.length; m++ ) {
    	var form_inputs = jQuery(form_mashes[m]).find(form_inputs_selector);
       	form_data.append( "form-mash-url[" + m + "]", jQuery(form_mashes[m]).attr("data-form-mash"));
    	for( var e=0; e<form_inputs.length; e++ ) {
      		var dom_element = form_inputs.get(e);
      		var element = jQuery(dom_element);
      		var is_required = element.attr("required");
      		if( dom_element.getAttribute("type") == "hidden" ) {
        		form_data.append( dom_element.name, dom_element.value );
      		} else {
        		var v = jQuery.trim(dom_element.value);
        		if( v && v != "" ) {
          			form_data.append( dom_element.name, v );
        		} else {
          			console.log("FormData: skipping blank form data: " + dom_element.name);
          			if( is_required )
            			return false;
        		}
      		}
    	}
	}
    // set data
    ajax_settings["data"] = form_data;
    ajax_settings["type"] = "POST";
    ajax_settings["processData"] = false;  // prevent jQuery from transforming data into a query string
    ajax_settings["contentType"] = false;  // prevent jQuery from setting content type

    return true;
  }
}

var ajax_form_submit = function(element, url, method, form_data) {
  console.log("submit: { url:'"+ url +"' }");
  jQuery.ajax({
    url: url,
    type: method,
    data: form_data,
    processData: false,
    contentType: false,
    xhr: function() {
      console.log("jQuery.ajax xhr()");
      var xhr = jQuery.ajaxSettings.xhr();
      if( xhr && xhr.upload ) {
        console.log("setting up upload progress event handler");
        // setup progress listener
        xhr.upload.addEventListener("progress", function(e) {
          if( e.lengthComputable ) {
            console.log("upload progress: " + e.loaded + " bytes.")
          } else {
            console.log("upload not computable");
          }
        }, false);
      }
      return xhr;
    },
    beforeSend: function(xhr, settings) {
      if (settings.dataType === undefined) {
        xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
      }
      my_ajax_beforeSend(element, xhr, settings);
    },
    success: function(data, status, xhr) {
      my_ajax_success(element, data, status, xhr);
    },
    complete: function(xhr, status) {
      my_ajax_complete(element, xhr, status);
    },
    error: function(xhr, status, error) {
      my_ajax_error(element, xhr, status, error);
    }
  });
}


// for each form on the target page:
// 		call each form with the appropriate inputs
// 		put the results onto our page
var form_mash = function(target) {

	console.log("form_mash");
	var form = jQuery(target);
	var form_data = new FormData();
	if( form_data ) {
		settings = {};
		build_request_body( form, form_data, settings );

		// searchCaseNo.cfm [caseNo]
		// searchTypeRange.cfm [courtType, beginMonth, beginYear, endMonth, endYear]
		// searchAuthor.cfm [authorID]
		// searchCircuitJudge.cfm [circuitJudge]
		// searchFamilyJudge.cfm [familyJudge]
		// searchMasterJudge.cfm [masterJudge]
		// /CFsearchSOLR/allPubOpinionsSearchResults.cfm [opinionSearchCriteria]

	    ajax_form_submit( form, "/cgi-bin/form_mash.pl", "POST", form_data );

  	} else {
    	jQuery.error("Your browser does not support the FormData API. Try another web browser.");
    	xhr.abort();
  	}

	return false;
}

jQuery(document)
	.delegate("form[data-trigger=form_mash]", "submit", function() {
    	form_mash(this);
    	return false;
  	});
