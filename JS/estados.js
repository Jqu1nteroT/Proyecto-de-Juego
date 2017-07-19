//Condiciones para iniciar la construccion del juego
var juego = new Phaser.Game(370, 496, Phaser.CANVAS, 'bloque_juego');


//Estados posibles que tedra el juego
//estado menu
juego.state.add('Menu', Menu);
//Estado juego activo
juego.state.add('Juego', Juego);
//Estado juego terminado
//juego.state.add('Game_Over', Game_over);
//estado inicial en el que comenzara el juego
juego.state.start('Menu');