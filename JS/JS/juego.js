//asignando valiables al suelo y fondo del escenario
var fondoJuego;
var sueloJuego;
var obstaculo;
var flappy;
var tubo;
var hueco;
var timer;
var puntos;
var txtPuntos;

//Estado principal del juego

var accion = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/bg.png");
		juego.load.image('suelo', "sprites/ground.png");
		//cargando la animacion de vuelo del personaje
		juego.load.spritesheet('pajaros', 'sprites/bird.png', 36, 26);
		//Cargando los tubos obstaculos
		juego.load.image('test','sprites/test.png');
		//juego.load.image('tubo 1', 'sprites/tube1.png');
		//juego.load.image('tubo2', 'sprites/tube2.png'); 
		//esta linea permite que el juego corra mas fluido
		juego.forceSingleUdate = true;
	},
	//Muestra los recursos previamente cargados
	create: function () {
		//creacion del escenario
		fondoJuego = juego.add.tileSprite(0, 0, 370, 384, 'fondo');
		sueloJuego = juego.add.tileSprite(0, 384, 370, 112, 'suelo');
		//creamos varios tubos
		obstaculo = juego.add.group();
			//le damos cuerpo a los tubos
			obstaculo.enableBody = true;
			//ahora creamos cierta cantidad de tubos
			obstaculo.createMultiple(20, 'test');
		//creamos al pajaro en pantalla
		flappy = juego.add.sprite(juego.width/2 -100, juego.height/2, 'pajaros');
			//punto de anclaje del pajaro
			flappy.anchor.setTo(0, 0.5);
			//imagen a iniciar (va desde 0 hasta X)
			flappy.frame = 1;
			//animacion de vuelo
			flappy.animations.add('vuelo', [0,1,2], 10, true); 
			//generamos las fisicas del juego
			juego.physics.startSystem(Phaser.Physics.ARCADE);
			//activamos las mecanicas arcade sobre el personaje
			juego.physics.arcade.enable(flappy);
			//agrgamos gravedad al peronaje
			flappy.body.gravity.y = 1200;
			//agregamos un cuerpo al personaje para que no slaga de los limites de la pantalla
			//flappy.body.collideWorldBounds = true;
		//creamos la teclar para el salto del personaje
		salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			//agregamosla funcion saltar
			salto.onDown.add(this.saltar, this);
		//creaomos un contador para crear los tubos cada cierto tiempo
		timer = juego.time.events.loop(1500, this.crearColumna, this);
		//creamos el texto que mostrara los puntos
		puntos = -1;
		txtPuntos = juego.add.text(20, 20, "0", {font:"150px, Arial", fill:"#fff",});

	},
	//Genera las animaciones
	update: function () {		
		//animando el vuelo del personaje
		flappy.animations.play('vuelo');
		//agregamos una condicion para que vuelva a su estado normal si el angulo es diferente de 0
		if (flappy.angle < 20) {
			//se le agrega 1 grado a la animacion
			flappy.angle += 1;
		}
		//detectamos las coliciones del personaje con el ambiente
		if (flappy.inWorld == false) {
			//reinicia nuestro juego
			this.state.start('Game_Over');
		}else if (flappy.position.y > 384) {
			//indica que el personaje ha muerto
			flappy.alive = false;
			//se le asigna velocidad 0 a todos los tubos
			obstaculo.forEachAlive(function (t) {
				//detiene los tubos que se encuentren en pantalla
				t.body.velocity.x = 0; 
			}, this);
			//nos envia a la pantalla de juego termindo 
			//this.state.start('Game_Over');
		}else{
			//Animacion del escenario
			fondoJuego.tilePosition.x -= 1;
			sueloJuego.tilePosition.x -= 1;
		};
		//escribimos las condiciones para la colision entre el personaje y los obstaculos
		juego.physics.arcade.overlap(flappy, obstaculo, this.tocoTubo, null, this);
	},
	//agregamos la funcion saltar
	saltar: function () {
		//damos velocidad negativa al cuerpo en Y
		flappy.body.velocity.y = -350;
		//agregamos una transicion en el angulo cuando vuela
		juego.add.tween(flappy).to({angle:-20}, 100).start();
	},
	//funcion que nos permite columna
	crearColumna: function () {
		//agrgamos una variable que permita que se genere el hueco donde pasara el personaje
		hueco = Math.floor(Math.random()*4)+1;
		//creamos los tubos de que se van a generar por columna
		for (var i = 0; i < 7; i++) {
			//especificamos que no se generen tubos en la posicio delos huecos
			if (i != hueco && i != hueco+1) {
				this.crearUnTubo(370, i*55+20);
			}
		}
		//cada vez qu se crea una columna suma un punto
		puntos += 1;
		//actualizamos la etiqueta de puntos
		txtPuntos.text = puntos;
	},
	//nos permite crear tubos y manipularlos
	crearUnTubo: function (x, y) {
		//creamos una variable tubo y la agregamos al rimero muerto
		tubo = obstaculo.getFirstDead();
		//reinicioamos su posicion cuando muera
		tubo.reset(x, y);
		//le daos una velocidad
		tubo.body.velocity.x = -180;
		//corroboramos si llega al final para matarlo
		tubo.checkWorldBounds = true;
		//matamos a tubo cuando salga de pantalla
		tubo.outOfBoundsKill = true;
	},
	//creamos las funcion que compara si hubo contact con los obstaculos
	tocoTubo: function () {
		//this.state.start('Game_Over');
		if (flappy.alive == false) 
			return;	
		flappy.alive = false;
		juego.time.events.remove(timer);
		obstaculo.forEachAlive(function (t) {
				//detiene los tubos que se encuentren en pantalla
				t.body.velocity.x = 0; 
			}, this);
	}
};