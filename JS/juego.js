//asignando valiables al suelo y fondo del escenario
var fondoJuego;
var sueloJuego;
var tubos1;
var tubos2;
var flappy;
//Estado principal del juego

var Juego = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/bg.png");
		juego.load.image('suelo', "sprites/ground.png");
		//cargando la animacion de vuelo del personaje
		juego.load.spritesheet('pajaros', 'sprites/bird.png', 36, 26);
		//Cargando los tubos obstaculos
		juego.load.image('tubo1', 'sprites/tube1.png');
		juego.load.image('tubo2', 'sprites/tube2.png'); 
		//esta linea permite que el juego corra mas fluido
		juego.forceSingleUdate = true;
	},
	//Muestra los recursos previamente cargados
	create: function () {
		//creacion del escenario
		fondoJuego = juego.add.tileSprite(0, 0, 370, 384, 'fondo');
		sueloJuego = juego.add.tileSprite(0, 384, 370, 112, 'suelo');
		//generamos las fisicas del juego
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		//creamos varios tubos
		tubos1 = juego.add.group();
			//le damos cuerpo a los tubos
			tubos1.enableBody = true;
			//ahora creamos cierta cantidad de tubos
			tubos1.createMultiple(20, 'tubo1');

		//creamos al pajaro en pantalla
		flappy = juego.add.sprite(juego.width/2 -100, juego.height/2, 'pajaros');
			//punto de anclaje del pajaro
			flappy.anchor.setTo(0.5);
			//imagen a iniciar (va desde 0 hasta X)
			flappy.frame = 1;
			//animacion de vuelo
			flappy.animations.add('vuelo', [0,1,2], 10, true); 
	},
	//Genera las animaciones
	update: function () {
		//Animacion del escenario
		fondoJuego.tilePosition.x -= 1;
		sueloJuego.tilePosition.x -= 1;
		//animando el vuelo del personaje
		flappy.animations.play('vuelo');
	}
};