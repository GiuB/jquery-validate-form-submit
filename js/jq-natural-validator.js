/**
 * Minimal jQuery Natural validator
 * ================================
 * https://github.com/GiuB/jquery-validate-form-submit
 *
 * How it works:
 * This library is simply & customizable, validate input with a data-validate-* attribute
 * This library works with bootstrap default form styling sytyem
 *
 * Usage:
 * Put .jqValidator class in the <form> tag need to be triggered (see botton inde.html for example)
 *
 * Author:
 * Daniele Covallero (giub.it, web@giub.it)
 *
 * Version: 0.1
 */

(function($){
    $.jQNaturalValidator = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Store fields to validate
        base.fields = [];

        // Add a reverse reference to the DOM object
        base.$el.data("jQNaturalValidator", base);

        base.init = function(){
            base.options = $.extend({},$.jQNaturalValidator.defaultOptions, options);
            base.attr = base.options.attrs;
            base.regex = base.options.regex;

            // Submit Handler
            base.submitHandler();

            // Store fields to validate
            base.storeFieldsToValidate();

            // Check on keyPress
            base.validateOnKeyPress();
        };

        /*
         * Submit Handler event
         * Than call ValidationHandler
         */
        base.submitHandler = function() {
        	base.$el.submit(function(e) {
        		e.preventDefault();

        		if(base.formValidationHandler('submit')) {
        			base.$el.unbind("submit").submit();
        		}
        	});
        };

        /*
         * Store fields to validate
         */
        base.storeFieldsToValidate = function() {
        	$.each(base.attr, function(attr, def) {
        		$.each($("*[data-" + attr + "]"), function(i, el) {
        			if(base.fields.indexOf($(el)) === -1)
        				base.fields.push($(el));
        		});
        	});
        };

        /*
         * Store fields to validate
         */
        base.validateOnKeyPress = function() {
        	if(base.fields.length <= 0)
        		return;

        	$.each(base.fields, function(i, el) {
        		el.bind("change focusout keydown keyup", function(e) {
        			base.singleFieldValidationHandler(el, "keyPress");
        		});
        	});
        };

        /*
         * Field has attribute
         *
         * @param {obj} el: $(element)
         * @param {str} attr
         */
        base.fieldsHasAttr = function(el, attr) {
        	if(!el || !attr) return;

        	if(el.data(attr))
        		return true;

        	return false;
        };

        /*
         * Validation Handler
         *
         * @param {str} type: "submit" | "keyPress"
         */
        base.formValidationHandler = function(type) {
        	var isValid = true,
        		tmpVaild = true;

        	// Recalculate fileds if opT domFields = false
        	if(!base.options.domFields)
        		base.storeFieldsToValidate();

        	// Exit if there aren't fields to check
        	if(base.fields.length === 0)
        		return true;

        	// Single validate every field
        	$.each(base.fields, function(i, el) {

        		// Check field & stop check at first wrong input
        		if(base.options.stepCheck) {
        			isValid = base.singleFieldValidationHandler(el, type);
	    			if(!isValid) return isValid;
        		}

        		// Check every wrong field
    			else {
    				tmpVaild = base.singleFieldValidationHandler(el, type);
    				if(!tmpVaild) isValid = tmpVaild;
    			}
    		});

    		return isValid;
        };

        /*
         * SingleFieldValidation Handler
         *
         * @param {obj} el: $(element)
         * @param {str} type: "submit" | "keyPress"
         */
        base.singleFieldValidationHandler = function(el, type) {
        	var attrs = {},
        		isValid = true;

        	// Store every attribute in the element to be validate
        	attrs = $(el).data();

        	// Loop evrey attr
        	$.each(attrs, function(attr, attrVal) {

        		// Exit from controller if previous check is not valid
        		if(!isValid)
        			return;

        		// Use default attr value if not defined
        		if(attr in base.attr && !attrVal)
        			attrVal = base.attr[attr];

        		// Validate this attr (check in camelCase way)
	        	switch(attr) {
	        		case "jqvMinLength":
	        			if(el.val().length < parseInt(attrVal, 10))
	        				isValid = false;
	        			break;
        			case "jqvEmail":
        				if(!base.regex.email.test(el.val()))
    						isValid = false;
    					break;
					case "jqvNotEmpty":
						if(el.val().length <= 0)
							isValid = false;
        				break;
	        	}
        	});

        	// Add field Error|Valid css
        	if(isValid)
    			base.validFieldWrapper(el, type);
    		else
    			base.errorFieldWrapper(el, type);

    		return isValid;
        };

    	/*
         * validateField Wrapper
         *
         * @param {obj} el: $(element)
         * @param {str} type: "submit" | "keyPress"
         */
    	base.validFieldWrapper = function(el, type) {

    		// Use custom validFieldFunction || next with default
    		if($.isFunction(base.options.validFieldFunction))
    			base.options.validFieldFunction(el, type);
    		else if(base.options.tpl == "bootstrap")
    			base.validBootstrapField(el, type);
    	};

    	/*
         * errorField Wrapper
         *
         * @param {obj} el: $(element)
         * @param {str} type: "submit" | "keyPress"
         */
    	base.errorFieldWrapper = function(el, type) {

    		// Use custom errorFieldFunction || next with default
    		if($.isFunction(base.options.errorFieldFunction))
    			base.options.errorFieldFunction(el, type);
    		else if(base.options.tpl == "bootstrap")
    			base.errorBootstrapField(el, type);
    	};

    	/*
         * Apply bootstrap valid css
         *
         * @param {obj} el: $(element)
         * @param {str} type: "submit" | "keyPress"
         */
    	base.validBootstrapField = function(el, type) {
			var field = el.closest(".form-group");

			if(field.hasClass("has-error")) field.removeClass("has-error");
			if(field.hasClass("has-warning")) field.removeClass("has-warning");

			// Add Red Warning
			if(!field.hasClass("has-success"))
				field.addClass("has-success");
    	};

    	/*
         * Apply bootstrap error css
         *
         * @param {obj} el: $(element)
         * @param {str} type: "submit" | "keyPress"
         */
    	base.errorBootstrapField = function(el, type) {
    		var field = el.closest(".form-group");

			if(field.hasClass("has-success"))
				field.removeClass("has-success");

			// Add Red Warning
			if(type == "submit") {
				if(field.hasClass("has-warning")) field.removeClass("has-warning");
				if(!field.hasClass("has-error")) field.addClass("has-error");
			}

			// keyPress = add Yellow Warnig
			if(type == "keyPress") {
				if(field.hasClass("has-error")) field.removeClass("has-error");
				if(!field.hasClass("has-warning")) field.addClass("has-warning");
			}
    	};

        // Run initializer
        base.init();
    };

    $.jQNaturalValidator.defaultOptions = {
        tpl: "bootstrap", 				// Bootstrap css validation class
        domFields: true, 				// Change to false to check fields on evrey validation request
        KeyPressValidation: true,		// Change to false to check form only on submit
        stepCheck: true,                // Change to false to check every input on submit (not the first wrong)

        // Override validtion Function (@params: el, validation_type ['submit' | 'keyPress' | 'testSubmit'])
        validFieldFunction: '', 		// Override default bootstrap validField css with you Function

        // Override error Function (@params: el, validation_type ['submit' | 'keyPress' | 'testSubmit'])
		errorFieldFunction: '', 		// Override default bootstrap errorField css with you Function

        // [data-*] get validation opts from html attributes
    	attrs: {
    		"jqv-min-length": 3,
    		"jqv-email": true,
    		"jqv-not-empty": true
    	},

    	// Main regex (used with some field validation)
    	regex: {
    		email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    	}
    };


    $.fn.jQNaturalValidator = function(options){
        return this.each(function(){
            (new $.jQNaturalValidator(this, options));
        });
    };

})(jQuery);