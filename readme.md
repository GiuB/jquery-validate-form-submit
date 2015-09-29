# jQuery Natural Form Validation

Simple html & js to use a natural jQuery validation

## How to use

The jQuery library is in js/jq-natural-validator.js

To use it you just add class .jqValidator as in this HTML example:

```html
<form class="jqValidator" method="POST">
	[...]
</form>
<script>
jQuery(document).ready(function($) {
	$("form.jqValidator").jQNaturalValidator();
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