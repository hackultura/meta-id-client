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
	$(".cep").inputmask("99999-999");
	$(".phone").inputmask("(99) 9{4,5}-9999");
	$(".birth").inputmask("99/99/9999");
	$(".cpf").inputmask("999.999.999-99");
}, 2000);
