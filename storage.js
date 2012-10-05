// JavaScript Document
function init() {
    //document.addEventListener("deviceready", onDeviceReady, true);
    createDB();
}
/* ******************************************************************************************** */
function createDB() {

	try {
		var shortName = 'interprovinciales';
		var version = '1.0';
		var displayName = 'interprovinciales';
		var maxSize = 200000;
		db = window.openDatabase(shortName, version, displayName, maxSize);
		db.transaction(populateDB, errorCB, successCreateCB);
	} catch (e) {
		console.log(e);
	}

}

// api-storage  "Crear DB"
function populateDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS usuarios');
	/*localStorage.setItem("userId", "");
	localStorage.setItem("usuario", "");
	localStorage.setItem("clave", "");*/
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, textinput, textinput2, textinput3, passwordinput, textinput4, textinput5, textinput6, select_mes, select_ano)');
	
}

function errorCB(err) {
	console.log("Error SQL: " + err.code);
}

function successCreateCB() {
	console.log("Se ha creado correctamente la base de datos CTE");
}
/* ******************************************************************************************** */
function inData(textinput, textinput2, textinput3, passwordinput, textinput4, textinput5, textinput6, select_mes, select_ano) {
	try {
		db.transaction(function(tx) { tx.executeSql('INSERT INTO usuarios (textinput, textinput2, textinput3, passwordinput, textinput4, textinput5, textinput6, select_mes, select_ano) VALUES ("' + textinput + '", "' + textinput2 + '", "' + textinput3 + '", "' + passwordinput + '", "' + textinput4 + '", "' + textinput5 + '", "' + textinput6 + '", "' + select_mes + '", "' + select_ano + '")', [], inDataHandler, errorInHandler); });
		
	var dataString = 'textinput=' + textinput + '&textinput2=' + textinput2 + '&textinput3=' + textinput3 + '&passwordinput=' + passwordinput + '&textinput4=' + textinput4 + '&textinput5=' + textinput5 + '&textinput6=' + textinput6 + '&select_mes=' + select_mes + '&select_ano=' + select_ano;
	
	//alert(dataString);
	$.ajax({
		type: "POST",
		url: "http://www.artesaniasecuador.com/test/prueba/send_registro.php",
		data: dataString
	});
		
	} catch (e) {
		console.log(e.message);
	}
}

function inDataHandler(tx, results) {
	$.mobile.changePage( $('#formulario3'), { transition: "pop", role: 'dialog' } );
	$.mobile.silentScroll(0);
}

function errorInHandler(err) {
	console.log("Error SQL: " + err.code);
}
/* ******************************************************************************************** */
function authData(usuario, clave) {
	try {
		db.transaction(function(tx) { tx.executeSql('SELECT * FROM usuarios WHERE textinput2 = "' + usuario + '" AND passwordinput = "' + clave + '"', [], authDataHandler, errorHandler); });
	} catch (e) {
		console.log(e.message);
	}
}

function errorHandler(err) {
	console.log("Error SQL: " + err.code);
}

function authDataHandler(tx, results) {
	
	if(results.rows.length){
		var row = results.rows.item(0);
		var id_usuario = row.id_usuario;
		var usuario = row.textinput2;
		var clave = row.passwordinput;
		
		localStorage.setItem("userId", id_usuario);
		localStorage.setItem("usuario", usuario);
		localStorage.setItem("clave", clave);
		
		$.mobile.changePage( $('#reserva'), { transition: "slide" } );
	} else {
		$(".message").html("Este usuario no existe").slideDown("slow");
		$(function() {
			setTimeout(hideMessage, 4000);
		});
		function hideMessage() {
			$('.message').slideUp("slow");
		}
	}
	$.mobile.silentScroll(0);
}
/* ******************************************************************************************** */
function showLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	//alert("Latitud : " + latitude + " Longitud: " + longitude);
  
	$('#getLocation').html("Latitud : " + latitude + " Longitud: " + longitude);
  
	
	var dataString = 'latitude=' + latitude + '&longitude=' + longitude;
	
	//alert(dataString);
	$.ajax({
		type: "POST",
		url: "http://www.artesaniasecuador.com/test/prueba/send_location.php",
		data: dataString
	});
  
}

function errorHandler(err) {
  if(err.code == 1) {
	$(".message-map").html("Error: El acceso se ha negado!").slideDown("slow");
  }else if( err.code == 2) {
	$(".message-map").html("Error: La ubicación esta inhabilitada!").slideDown("slow");
  }
	$(function() {
		setTimeout(hideMessage, 4000);
	});
	function hideMessage() {
		$('.message-map').slideUp("slow");
	}
}
function getLocation(){
   
	var opciones = {};
   
   if(navigator.geolocation){
      // timeout at 60000 milliseconds (60 seconds)
      var options = {timeout:60000};
      navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
   }else{
		$(".message-map").html("Lo sentimos, pero su navegador no soporta geolocalización!").slideDown("slow");
		$(function() {
			setTimeout(hideMessage, 4000);
		});
		function hideMessage() {
			$('.message-map').slideUp("slow");
		}
   }
}	
