var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		defualt: "arcade",
		arcade: {
			gravity: {
				y: 200
			}
		}
	},
	scene: [ Scene1 ]
};

var game = new Phaser.Game(config);