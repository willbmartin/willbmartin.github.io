class Scene1 extends Phaser.Scene {
	constructor() {
		super({key:"Scene1"});
	}

	preload() {
		this.load.image('duck', 'duck.png');
	}

	create() {
		this.image = this.add.image(300,400,'duck');

		this.input.keyboard.on('keyup_D', function(e) {
			this.image.x += 10;
		}, this);
	}
}