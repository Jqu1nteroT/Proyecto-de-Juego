//creamos una variable que contendra el estado menu
var Menu = {
	//Recursos a cargar
	preload: function () {
		//definicmos un color de fondo
		juego.stage.backgroundColor = '#fff';
		//cargamos el boton de play 
		juego.load.image('boton', 'sprites/play.png');
	},
	//muestra los recursos previamente cargados
	create: function () {
		//mostramos el boton previamnete cargado
		var boton = this.add.button(juego.width/2, juego.height/2, 'boton', this.iniciarJuego, this);
			//Centramos el boton con el punto de anclaje
			boton.anchor.setTo(0.5);
			//ajustamos la talla del boton para que se vea mas agradable
			boton.scale.setTo(0.5,0.5);
		//Agregamos texto a la pantalla de inicio del juego	
		var txtIniciar = juego.add.text(juego.width/2, juego.height/2 -85, "Iniciar Juego", {font: "bold 24px sans-serif", fill:"black", align: "center"});
			//cambiamos el punto de anclaje del texto
			txtIniciar.anchor.setTo(0.5);
		//Agregamos titulo a la pantalla de inicio del juego	
		var txtTitulo = juego.add.text(juego.width/2, juego.height/2 -125, "Flappy Bird (Copy)", {font: "bold 30px sans-serif", fill:"green", align: "center"});
			//cambiamos el punto de anclaje del texto
			txtTitulo.anchor.setTo(0.5);
	},
	//Con esta funcion inicializamos el estado de juego
	iniciarJuego: function () {
		this.state.start('Juego')
	}

};