
var fondoJuego;
var pisoGrande;
var pisoMedio;
var pisoPeque;
var runner;

//Condiciones para iniciar la construccion del juego
var juego = new Phaser.Game(500, 300, Phaser.CANVAS, 'bloque_juego');

var estadoPrincipal = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/hoja_arrugada_by_dianabtr27-d5zlixb.jpg");
		//cargando piso para el corredor
		juego.load.image('pisoGrande', "sprites/pisoGrande.png");
		juego.load.image('pisoPeque', "sprites/pisoPeque.png");
		juego.load.image('pisoMedio', "sprites/pisoMedio.png");
		//cargando al personaje
		juego.load.spritesheet('corredor', "sprites/runer2.svg", 68, 168);
		//esta linea permite que el juego corra mas fluido
		juego.forceSingleUdate = true;
	},
	//Mostrando los recursos cagados anteriormente
	create: function () {
		//mostrando el escenario
		fondoJuego = juego.add.tileSprite(0, 0, 500, 300, 'fondo');
		//mostramos el piso
		pisoGrande = juego.add.tileSprite(0, 270, 405, 36, 'pisoGrande');
		//redimencionando los obstaculos
			pisoGrande.anchor.setTo(0, 0);
			pisoGrande.scale.setTo(1, 0.7);
			pisoGrande.enableBlody = true;
			pisoGrande.physicsBodyType = Phaser.Physics.ARCADE;
			juego.physics.arcade.enable(pisoGrande);
		pisoMedio = juego.add.tileSprite(0, 170, 206, 37, 'pisoMedio');
		//redimencionando los obstaculos
			pisoMedio.anchor.setTo(0, 0);
			pisoMedio.scale.setTo(1, 0.7);
			pisoMedio.enableBlody = true;
		pisoPeque = juego.add.tileSprite(0, 70, 99, 35, 'pisoPeque');
		//redimencionando los obstaculos
			pisoPeque.anchor.setTo(0, 0);
			pisoPeque.scale.setTo(1, 0.7);
			pisoPeque.enableBlody = true;
		//mostrando el corredor
		//juego.add.sprite(juego.width/2 -100, juego.height/2, 'corredor');
		runner = juego.add.sprite(100, 120, 'corredor');
			runner.scale.setTo(0.4, 0.4);
			runner.frame = 0;
			runner.animations.add('corre', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 10, true);
			//generamos las fisicas del juego
			juego.physics.startSystem(Phaser.Physics.ARCADE);
			//activamos las mecanicas arcade sobre el personaje
			juego.physics.arcade.enable(runner);
			runner.body.collideWorldBounds = true;
			//agrgamos gravedad al peronaje
			runner.body.gravity.y = 1200;
			salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			//agregamosla funcion saltar
			salto.onDown.add(this.saltar, this);		
	},
	//generando animaciones
	update: function () {
		//Animacion del escenario
		fondoJuego.tilePosition.x -= 1;
		runner.animations.play('corre');
	},
	//agregamos la funcion saltar
	saltar: function () {
		//damos velocidad negativa al cuerpo en Y
		runner.body.velocity.y = -350;
		//agregamos una transicion en el angulo cuando vuela
		juego.add.tween(runner).to(100, 100).start();
	},
};



juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');
