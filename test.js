
var fondoJuego;
var lava;
var piso;
var runner;
var cursores;

//Condiciones para iniciar la construccion del juego
var juego = new Phaser.Game(600, 400, Phaser.CANVAS, 'bloque_juego');

var estadoPrincipal = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/hoja_arrugada_by_dianabtr27-d5zlixb.jpg");
		//cargando piso para el corredor
		juego.load.image('lava1', "sprites/lava.svg");
		//obstaculo
		juego.load.image('obstaculo',"sprites/obstaculo.svg");
		//cargando al personaje
		juego.load.spritesheet('corredor', "sprites/NinjaRun2.svg", 53.03, 91.43);
		//esta linea permite que el juego corra mas fluido
		juego.forceSingleUdate = true;
	},
	//Mostrando los recursos cagados anteriormente
	create: function () {
		cursores = juego.input.keyboard.createCursorKeys();
		//mostrando el escenario
		fondoJuego = juego.add.tileSprite(0, 0, 800, 500, 'fondo');
		//mostrando el obstaculo
		piso = juego.add.tileSprite(100,220,200,70,'obstaculo');
			piso.scale.setTo(1,0.6);
			//piso.enableBody = true;
			//piso.physicsBodyType = Phaser.Physics.ARCADE;
			juego.physics.enable(piso, Phaser.Physics.ARCADE);
			piso.body.collideWorldBounds = true;
			piso.body.immovable = true;
			piso.body.setSize(200, 70);
		//mostrando la lava
		lava = juego.add.tileSprite(0,310,800,150,'lava1');
			lava.scale.setTo(1,0.6);
			/*juego.physics.enable(lava, Phaser.Physics.ARCADE);
			lava.body.collideWorldBounds = true;
			lava.body.immovable = true;*/
			/*lava.enableBody = true;
			lava.physicsBodyType = Phaser.Physics.ARCADE;*/
		//mostrando al corredor
		runner = juego.add.sprite(100, 350, 'corredor');
			runner.scale.setTo(1, 1);
			/*runner.enableBody = true;
			runner.physicsBodyType = Phaser.Physics.ARCADE;*/
			runner.frame = 3;
			runner.animations.add('correR', [4,5,6], 15, true);
			runner.animations.add('correL', [0,1,2], 15, true);
			//activamos las mecanicas arcade sobre el personaje
			juego.physics.enable(runner, Phaser.Physics.ARCADE);
			runner.body.collideWorldBounds = true;
			runner.body.checkCollision = true;
			runner.anchor.setTo(15,1);
			runner.body.setSize(10, 80, 23, 11);
			//agrgamos gravedad al peronaje
			runner.body.gravity.y = 1200;
			salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			//agregamosla funcion saltar
			salto.onDown.add(this.saltar, this);		
	},
	//generando animaciones
	update: function () {
		
		//controles basicos del personaje
		if (cursores.right.isDown) {
			runner.position.x += 3;
			runner.animations.play('correR');
			//Animacion del escenario
			fondoJuego.tilePosition.x -= 1;
			lava.tilePosition.x -= 3;
		}else if (cursores.left.isDown) {
			runner.position.x -= 3;
			runner.animations.play('correL');
			//Animacion del escenario
			fondoJuego.tilePosition.x -= 1;
			lava.tilePosition.x -= 3;
		}else {
			runner.frame = 3;
		}
		juego.physics.arcade.collide(runner, piso);
	},
	//agregamos la funcion saltar
	saltar: function () {
		//damos velocidad negativa al cuerpo en Y
		runner.body.velocity.y = -350;
		//agregamos una transicion en el angulo cuando vuela
		juego.add.tween(runner).to(100, 100).start();
	},
	
	render: function () {

	juego.debug.bodyInfo(runner, 16, 24);
	//juego.debug.body(runner);
	juego.debug.body(piso);
	//juego.debug.body(lava);
	},

	init: function() {
		juego.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		juego.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		juego.scale.pageAlignVertically = true;
		juego.scale.pageAlignHorizontally = true;
		console.log('entra');
	},
};



juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');
