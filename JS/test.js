
var fondoJuego;
var lava;
var piso;
var runner;

//Condiciones para iniciar la construccion del juego
var juego = new Phaser.Game(600, 500, Phaser.CANVAS, 'bloque_juego');

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
		//mostrando el escenario
		fondoJuego = juego.add.tileSprite(0, 0, 800, 500, 'fondo');
		//mostrando el obstaculo
		piso = juego.add.tileSprite(50,350,200,70,'obstaculo');
			piso.scale.setTo(1,0.6);
		//mostrando la lava
		lava = juego.add.tileSprite(0,410,800,150,'lava1');
			lava.scale.setTo(1,0.6);
		//mostrando al corredor
		runner = juego.add.sprite(100, 120, 'corredor');
			runner.scale.setTo(1, 1);
			runner.frame = 4;
			runner.animations.add('corre', [4,5,6], 15, true);
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
		lava.tilePosition.x -= 3;
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
