//Estado final que determina que ek juego ha terminado
var Game_over = {
	//Recursos a cargar
	preload: function () {
		//definicmos un color de fondo
		juego.stage.backgroundColor = '#fff';
		//cargamos el boton de play 
		juego.load.image('boton', 'sprites/play.png');
	},
	//Muestra los recursos previamente cargados
	create: function () {
		//mostramos el boton previamnete cargado
		var boton = this.add.button(juego.width/2, juego.height/2, 'boton', this.iniciarJuego, this);
			//Centramos el boton con el punto de anclaje
			boton.anchor.setTo(0.5);
			//ajustamos la talla del boton para que se vea mas agradable
			boton.scale.setTo(0.5,0.5);
		//Agregamos texto a la pantalla de inicio del juego	
		var txtPuntosEtiqueta = juego.add.text(juego.width/2 -50, juego.height/2 -85, "Puntos: ", {font: "bold 24px sans-serif", fill:"black", align: "center"});
			//cambiamos el punto de anclaje del texto
			txtPuntosEtiqueta.anchor.setTo(0.5);
			if (puntos == -1) {
				puntos = 0;
			}
		var txtPuntosNumero = juego.add.text(juego.width/2 +50, juego.height/2 -85, puntos.toString(), {font: "bold 24px sans-serif", fill:"black", align: "center"});
			//cambiamos el punto de anclaje del texto
			txtPuntosNumero.anchor.setTo(0.5);
		//Agregamos titulo a la pantalla de inicio del juego	
		var txtTitulo = juego.add.text(juego.width/2, juego.height/2 -125, "Juego terminado", {font: "bold 30px sans-serif", fill:"green", align: "center"});
			//cambiamos el punto de anclaje del texto
			txtTitulo.anchor.setTo(0.5);
	},
	//Con esta funcion inicializamos el estado de juego
	iniciarJuego: function () {
		this.state.start('Game')
	}
};