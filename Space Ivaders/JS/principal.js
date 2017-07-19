var fondoJuego;
var nave;
var aliens;
var cursores;
var balas;
var tiempoBala = 0;
var botonDisparo;
//Condiciones para iniciar la construccion del juego
var juego = new Phaser.Game(400, 544, Phaser.CANVAS, 'bloque_juego');

//Estado principal del juegi (Primera parte)

var estadoPrincipal = {
	//Recursos a cargar
	preload: function () {
		//cargando el escenario
		juego.load.image('fondo', "sprites/sky-1946508_960_720.png");
		//cargando la nave espacial
		juego.load.image('nave', 'sprites/Zyraxxus.png');
		//cargando al alien
		juego.load.image('alien', 'sprites/space_invader2.png');
		//cargand el rasho laser
		juego.load.image('laser', 'sprites/laser2.png');

	},
	//Mostrando los recursos cagados anteriormente
	create: function () {
		//mostrando el escenario
		fondoJuego = juego.add.tileSprite(0, 0, 400, 544, 'fondo');
		//mostrando la nave espacial
		nave = juego.add.sprite(juego.width/2, 490, 'nave');
			nave.anchor.setTo(0.5, 0);
			nave.scale.setTo(0.5,0.5);
		//mostrando el rasho laser para test
		//bala = juego.add.sprite(juego.width/2, 480, 'laser');
			//bala.anchor.setTo(0.381,);
			//bala.scale.setTo(0.3,0.2);
			//creamos las teclas de direccion
		cursores = juego.input.keyboard.createCursorKeys();
		//creamos la tecla para disparar
		botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//agregamos varias balas
		balas = juego.add.group();
			//agregamos un cuerpo a las balas
			balas.enableBody = true;
			//activamos el modo arcade en las balas
			balas.physicsBodyType = Phaser.Physics.ARCADE;
			//creamos multiples balas antes de lanzarlas
			balas.createMultiple(20, 'laser');
			//ajustamos la talla del rasho laser
			balas.setAll('scale.x', 0.15);
			balas.setAll('scale.y', 0.2);
			//fijamos el punto de partida de la bala
			balas.setAll('anchor.x', 0.5);
			balas.setAll('anchor.y', 1);
			//determinamos la destruccion del proyectil al salir del mapa
			balas.setAll('outOfBoundsKill', true);
			//chequeamos que las balas se encuentren dentro de los limites del juego
			balas.setAll('checkWorldBounds', true);
		//agregamos varios aliens
		aliens = juego.add.group();
			//agregamos un cuerpo a los aliens
			aliens.enableBody = true;
			//activamos el modo arcade en los aliens
			aliens.physicsBodyType = Phaser.Physics.ARCADE;
		//mostrando al grupo aliens
		for (var y = 0; y < 6; y ++) {
			for (var x = 0; x < 8; x ++){
				var alien = aliens.create(x*40, y*30, 'alien');
					alien.anchor.setTo(0.5);
					alien.scale.setTo(0.1115, 0.1115);
			}
		}
			//psicionamos el grupo de enemigos
			aliens.x = 30;
			aliens.y = 30;
		//alien = juego.add.sprite(juego.width/2, 100, 'alien');
			//alien.anchor.setTo(0.5);
			//alien.scale.setTo(0.2,0.2);
		//Creamos una animacion que hara mover a nuestros enemigos de izq a der, y de arriba hasta abajo
		var animacion = juego.add.tween(aliens).to({x:100}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
			//animacion que hace descender los enemigos cda vez que la animacion anterior se realice
			animacion.onLoop.add(descender, this);
			
	},
	//generando animaciones
	update: function () {
		//Verificamos la funcion de los botones
		if(cursores.right.isDown){
			nave.position.x += 3;
		}else if (cursores.left.isDown) {
			nave.position.x -= 3;
		}
		//verificaamos que el rasho lase sea disparado
		var bala;
		if (botonDisparo.isDown) {
			//verificamos que salga el primer rasho laser creado
			if (juego.time.now > tiempoBala) {
				bala = balas.getFirstExists(false);
			}
			//corroboramos que el rasho laser salga desde la posicion de la nave			
			if (bala) {
				bala.reset(nave.x, nave.y);
				bala.body.velocity.y = -300;
				tiempoBala = juego.time.now + 500;
			}
		}
		juego.physics.arcade.overlap(balas, aliens, colision, null, this);
	}
};

function colision (bala, alien) {
	bala.kill();
	alien.kill();
}

function descender () {
	aliens.y += 10;  
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');