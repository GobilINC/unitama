/*
 zbz-feedback.js v1.0.0
 Copyright (c)2014 Sergey Serafimovich
*/



$().ready(function(){
	$("[data-role=zbz-feedback]").zbzFeedbackForm();
});

(function ( $ ) {
	"use strict";
	
    $.fn.zbzFeedbackForm = function( options ) {

        // Default options.
        var settings = $.extend({
        	// Error and success message strings
            msgError404: "Service is not available at the moment. Please check your internet connection or try again later.",
			msgError503: "messages are successfully delivered!",
			msgErrorValidation: "The form fields were not filled properly. Please check and try again.",
			msgErrorFormat: "The form fields was not filled properly. Please check and try again.",
			msgSuccess: "Your message was sent successfully. Thank you!"
		}, options );

    
    	var $this = $(this);
    	var inputs = {};
		inputs['email'] = $(this).find("input[name=email]");
		inputs['name'] = $(this).find("input[name=name]");
		inputs['message'] = $(this).find("textarea[name=message]");
		
		var action = $(this).attr("action");
		
		var button = $(this).find("button[type=submit]");
		var icon = button.find("i");
		
		if(!icon.length) button.prepend($("<i></i>"));
		
		var resultMessage = $("<span></span>");
		button.after($("<div class='zbz-result-message'></div>").append(resultMessage));
		var iconProcess = "fa fa-spinner fa-spin";
		var iconSuccess = "fa fa-check-circle";
		var iconError = "fa fa-exclamation-circle";

		// inputs.after(icon);
    
		$(this).on("submit", function(e){
			e.preventDefault();
			// Get value of input
			var email = inputs.email.val();
			var message = inputs.message.val();
			var name = inputs.name.val();
			
			// Test if the value of input is actually an email
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			
			$(this).find('.has-error').removeClass("has-error");
			button.removeClass("btn-danger").removeClass("btn-success");

			
			if(re.test(email) && message.length && name.length) {
			
				icon.removeClass();
				icon.addClass(iconProcess);
				$(this).removeClass("error success");
				resultMessage.text("");
	
				$.ajax({
					type: "POST",
					url: action,
					data: {
						email: email,
						name: name,
						message: message
					},
					dataType: "json",
					error: function(data){
						// Add error class to form
						$this.addClass("error");
						
						// Change the icon to error
						icon.removeClass();
						icon.addClass(iconError);
						
						// Determine the status of response and display the message
						
						if(data.status == 404) {
							resultMessage.text(settings.msgError404);
						} else {
							resultMessage.text(settings.msgError503);
						}
					},
					
				}).done(function(data){
					// Hide note
				
					if(data.status == "success") {
						// Add success class to form
						$this.addClass("success");
						// Change the icon to success
						icon.removeClass();
						icon.addClass(iconSuccess);
						button.addClass("btn-success");
						resultMessage.text(settings.msgSuccess);
						
					} else {
						// Add error class to form
						$this.addClass("error");
						// Change the icon to error
						icon.removeClass();
						icon.addClass(iconError);

						if (data.type == "ValidationError") {
							for(var i=0; i<data.fields.length; i++) {
								var field = inputs['data.fields[i]'];
								field.parents(".form-group").first().addClass("has-error");
							}
							button.addClass("btn-danger");
						} else {
							resultMessage.text(settings.msgSuccess);
							button.addClass("btn-danger");
						}
					}
				});
				
			} else {
				// Add error class to form
				$(this).addClass("error");
				// Change the icon to error
				icon.removeClass();
				icon.addClass(iconError);
				button.addClass("btn-danger");
				
				for(var prop in inputs) {
					if(!inputs[prop].val().length) {
						inputs[prop].parents(".form-group").first().addClass("has-error");
					}
					
					if(prop == "email" && !re.test(inputs[prop].val())) {
						inputs[prop].parents(".form-group").first().addClass("has-error");
					}
				}
								
				// Display the message
				resultMessage.text(settings.msgErrorValidation);
			}
		});
    };
 
}( jQuery ));
