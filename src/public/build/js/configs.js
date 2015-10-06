/*
 * DEFINE POPOVER TO HELP TEXT
 * ---------------------------
 *
 * This is a configuration to enable popover to elements
 * with "help" class.
 */
setTimeout(function() {
	$('.help').popover({ trigger: "hover" });
}, 2000);

/*
 * DEFINE MASK TO INPUTS
 * ---------------------------
 *
 * This is a configuration to enable mask to
 * inputs.
 */
setTimeout(function() {
	$(":input").inputmask();
}, 2000);
