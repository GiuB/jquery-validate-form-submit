# jQuery Natural Form Validator

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