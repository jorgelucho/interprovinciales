$('#home').live('pageinit', function(event) {
	init();
	
	if (localStorage.getItem("userId") != "" && localStorage.getItem("userId")) {
		
		$('#logeo').html('<a href="#" id="btn-logout"> <img src="images/logout.png"> </a>');
		$('#btn-logout').click(function(event){
			localStorage.setItem("userId", "");
			localStorage.setItem("usuario", "");
			localStorage.setItem("clave", "");
			location.href="index.html";
		});
		
		$('#btn-reservaciones').attr("href", "#reserva");
		
	}
	
	$('#btn-login').click(function(event) {
		event.preventDefault();
		if (localStorage.getItem("userId") != "" && localStorage.getItem("userId")) {
			authData(localStorage.getItem("usuario"), localStorage.getItem("clave"));
			return false;
		}
	});
	
});


$('#login').live('pageinit', function(event) {
	init();
	
	$('#form1').submit(function(event) {
		event.preventDefault();
		var usuario = $('#Usuario').val();
		var clave = $('#Password').val();
		authData(usuario, clave);
		return false;
	});
	
	if (localStorage.getItem("userId") != "" && localStorage.getItem("userId")) {
		authData(localStorage.getItem("usuario"), localStorage.getItem("clave"));
		return false;
	}
	
});

$('#formulario1').live('pageinit', function(event) {
	init();
	$('#form-contacto1').submit(function(event) {
		event.preventDefault();
		$('#textinput_f2').val($('#textinput').val());
		$('#textinput2_f2').val($('#textinput2').val());
		$('#textinput3_f2').val($('#textinput3').val());
		$('#passwordinput_f2').val($('#passwordinput').val());
		
		$.mobile.changePage( $('#formulario2'), { transition: "slide" } );
		$.mobile.silentScroll(0);
		return false;
	});
});

$('#formulario2').live('pageinit', function(event) {
	init();
	$('#form-contacto2').submit(function(event) {
		event.preventDefault();
		var textinput = $('#textinput_f2').val();
		var textinput2 = $('#textinput2_f2').val();
		var textinput3 = $('#textinput3_f2').val();
		var passwordinput = $('#passwordinput_f2').val();
		var textinput4 = $('#textinput4').val();
		var textinput5 = $('#textinput5').val();
		var textinput6 = $('#textinput6').val();
		var select_mes = $('#select-mes').val();
		var select_ano = $('#select-ano').val();

		inData(textinput, textinput2, textinput3, passwordinput, textinput4, textinput5, textinput6, select_mes, select_ano);

		return false;
	});
});

$('#reserva').live('pageinit', function(event){
	$('#btn-reserva').click(function(event){
		location.href="index.html";
	});
});