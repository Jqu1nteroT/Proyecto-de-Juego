//asignando valiables al suelo y fondo del escenario
var fondoJuego;
var sueloJuego;
//asignando variable al pajaro
var flappy;
//asignando variables para controlar al personaje
var cursores;

var juego = new Phaser.Game(370, 496, Phaser.CANVAS, 'bloque_juego');

//Estado principal del juego (primera parte)

var estadoPrincipal = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/bg.png");
		juego.load.image('suelo', "sprites/ground.png");
		//cargando al personaje
		//juego.load.image('pajaro', 'sprites/bird_sing.png');
		//cargando la animacion de vuelo del personaje
		juego.load.spritesheet('pajaros', 'sprites/bird.png', 36, 26);

	},
	//Muestra los recursos previamente cargados
	create: function (){
		//creacion del escenario
		fondoJuego = juego.add.tileSprite(0, 0, 370, 384, 'fondo');
		sueloJuego = juego.add.tileSprite(0, 384, 370, 112, 'suelo');
		//Agrenado al personaje estatico
		//flappy = juego.add.sprite(juego.width/2, juego.height/2, 'pajaro');
			//fijando el punto de anclaje del personaje como punto central
			//flappy.anchor.setTo(0.5);
			//variando la talla del personaje
			//flappy.scale.setTo(1,1);
			//variar la direccion de los sprite
			//flappy.scale.setTo(-1,-1);
			//rotando los sprite sobre su punto de anclaje
			//flappy.angle = 0;
		//Agregando al personaje es sus faces de vuelo
		flappy = juego.add.sprite(juego.width/2, juego.height/2, 'pajaros');
			flappy.anchor.setTo(0.5);
			//permite decidir sobre que imagen iniciar (va desde 0 hasta X)
			flappy.frame = 1;
			//Se crea la animacion de vuelo
			flappy.animations.add('vuelo', [0,1,2], 10, true); 
		//Creando los input del juego para el control del personaje
		cursores = juego.input.keyboard.createCursorKeys();
		//creamos los limites del escenario al que el personaje esta restringido
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		//habilitamos el personaje dentro de las caracteristicas fisicas
		juego.physics.arcade.enable(flappy);
		//agregamos un cuerpo al personaje para que no slaga de los limites de la pantalla
		flappy.body.collideWorldBounds = true;
	},
	//Genera las animaciones
	update: function () {
		//Animacion del escenario
		//fondoJuego.tilePosition.x -= 1;
		//sueloJuego.tilePosition.x -= 1;
		//Creando una animacion de rotar sobre el presonaje
		//flappy.angle += 1;
		//animando el vuelo del personaje
		flappy.animations.play('vuelo');
		//verificamos si el usuario esta utilizando la tecla derecha
		if (cursores.right.isDown) {
			flappy.position.x += 1;
			flappy.angle = 0;
			flappy.scale.setTo(1,1);
		}
		if (cursores.left.isDown) {
			flappy.position.x -= 1;
			flappy.angle = 180;
			flappy.scale.setTo(1,-1);
		}
		if (cursores.up.isDown) {
			flappy.position.y -= 1;
			flappy.angle = -90;
		}
		if (cursores.down.isDown) {
			flappy.position.y += 1;
			flappy.angle = 90;
		}
	}

};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');