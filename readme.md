# Natural jQuery Form Validator

Simple html & js to use a natural jQuery validation.
It natively works with bootstrap css validation.

Read Valid / Error Function Override to apply your validation system

## How to use

The jQuery library is in `js/jq-natural-validator.js`

To use it you just add class `.jqValidator` as in this HTML example:

```html
<form class="jqValidator" method="POST">
	[...]
</form>
<script>
jQuery(document).ready(function($) {
	$("form").jQNaturalValidator();
});
</script>
```

## Options

There are many simple options, if you must to add some functionality, this library was created to be easy and customizable, so ... do that!

Options:

```javascript
{
    tpl: "bootstrap", 				// Bootstrap css validation class
    domFields: true, 				// Change to false to check fields on evrey validation request
    KeyPressValidation: true,		// Change to false to check form only on submit
    stepCheck: true,                // Change to false to check every input on submit (not the first wrong)
    focusOnSubmitError: true,		// Change to false to prevent autoFocus on field validation error
    disableSubmitBtnOnError: true,  // Change to false to disable submit button if form is inValid
    autoTrimCheck: true, 			// Change to false to disable autoTrim on validation check
    spinnerEl: '', 					// Inject here spinner element, at submit this will be show

    // Override submit Function (example: inject an ajax send function)
    submitFunction: '',

    // Override validtion Function (@params: el, validation_type ['submit' | 'keyPress' | 'testSubmit'])
    validFieldFunction: '', 		// Override default bootstrap validField css with you Function

    // Override error Function (@params: el, validation_type ['submit' | 'keyPress' | 'testSubmit'])
	errorFieldFunction: '', 		// Override default bootstrap errorField css with you Function

    // [data-*] get validation opts from html attributes
	attrs: {
		"jqv-min-length": 3,
		"jqv-email": true,
		"jqv-not-empty": true,
		"jqv-checked": true
	},

	// Main regex (used with some field validation)
	regex: {
		email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	}
}
```

##  Valid / Error Function Override

To add your favourite validation system edit this plugin at `base.validFieldWrapper` and `base.errorFieldWrapper`
or better use options `validFieldFunction` and `validFieldFunction` to inject your function without edit this library.

A simple custom validation example:

```html
<script>
var validFunction = function() { alert('valid'); }
var errorFieldFunction = function() { alert('error'); }
jQuery(document).ready(function($) {
	$("form.jqValidator").jQNaturalValidator({
		validFieldFunction: validFunction,
		errorFieldFunction: errorFieldFunction
	});
});
</script>
```

##  Add a spinner at submit

Spinner integration example:

```html
<script>
jQuery(document).ready(function($) {
	$("form").jQNaturalValidator({
		spinnerEl: $("form #spinner")
	});
});
</script>
```

## Override the custom submit function (usefull on ajax data submit)

An ajax submit Function example:

```html
<script>
jQuery(document).ready(function($) {
	$("form").jQNaturalValidator({
		submitFunction: function() {
			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					name:  $("#name").val(),
					email: $("#email").val()
				}
			})
			.success(function(result) { alert("data saved"); })
		}
	});
});
</script>
```