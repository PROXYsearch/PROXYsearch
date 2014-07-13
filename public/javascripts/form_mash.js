
/* ******************************* FORM MASH UP *******************************/
/* ******************************* FORM MASH UP *******************************/
/* ******************************* FORM MASH UP *******************************/

// the target page use multiple forms.
// we want to make just one query and pull back results from all those forms

// use the native javascript FormData API to get all form inputs, particularly files
// return false if at least one element with [required=true] is not filled out, true otherwise
function build_request_body( form_data_parent, form_data, ajax_settings ) {
  if( form_data_parent && form_data ) {
    var form_inputs_selector = "select, textarea, input:not([type=submit])";
    var form_inputs = form_data_parent.find( form_inputs_selector );
    for( var e=0; e<form_inputs.length; e++ ) {
      var dom_element = form_inputs.get(e);
      var element = jQuery(dom_element);
      var is_required = element.attr("required");
      if( dom_element.getAttribute("type") == "file" ) {
        if( is_required && dom_element.files.length==0 )
          return false;
        for( var f=0; f<dom_element.files.length; f++) {
          console.log("FormData: appending a file: " + dom_element.name);
          form_data.append( dom_element.name, dom_element.files[f] );
        }
      } else if( dom_element.getAttribute("type") == "hidden" ) {
        console.log("FormData: appending typical form data: " + dom_element.name);
        form_data.append( dom_element.name, dom_element.value );
        // value_count++;  --- do not accoutn for hidden values; we want to determine if user entered anything in form
      } else {
        var v = jQuery.trim(dom_element.value);
        if( v && v != "" ) {
          console.log("FormData: appending typical form data: " + dom_element.name);
          form_data.append( dom_element.name, v );
        } else {
          console.log("FormData: skipping blank form data: " + dom_element.name);
          if( is_required )
            return false;
        }
      }
    }
    // append the submit button value if this was a form
    // the "ujs:submit-button" data was set in the "click.rails" event handler in rails.js (now named jquery_ujs.js)
    if( form_data_parent.is("form") ) {
      // get memoized value of the clicked submit button
      var button = form_data_parent.data('ujs:submit-button');
      if (button) {
        console.log("FormData: appending submit button data: " + button.name);
        form_data.append( button.name, button.value );
        form_data_parent.data('ujs:submit-button', null);
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
    url: 'form_mash.pl',
    type: 'POST',
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
      element.trigger('ajax:beforeSend', [xhr, settings]);
    },
    success: function(data, status, xhr) {
      element.trigger('ajax:success', [data, status, xhr]);
    },
    complete: function(xhr, status) {
      element.trigger('ajax:complete', [xhr, status]);
    },
    error: function(xhr, status, error) {
      element.trigger('ajax:error', [xhr, status, error]);
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

	var mashes = form.find( "[data-form-mash]" );
	console.log("mash count:" + mashes.length);
	for( var e=0; e<mashes.length; e++ ) {
		var mash = mashes[e];
		var action = jQuery(mashes[e]).data("form-mash");
		var method = "POST";
	    ajax_form_submit( form, action, method, form_data );
	    //jQuery("#results").append("<p>" + action + "</p>");
	}
	
  } else {
    jQuery.error("You browser does not support the FormData API. Try another web browser.");
    xhr.abort();
  }

  return false;
}

jQuery(document)
  .delegate("form[data-trigger=form_mash]", "submit", function() {
    form_mash(this);
    return false;
  });
