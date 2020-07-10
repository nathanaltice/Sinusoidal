class Sinusoidal extends Phaser.Scene {
    constructor() {
        super('sinusoidalScene');
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.image('ball', 'ball.png');
        this.load.image('redbox', 'box02.png');
    }

    create() {
        // create obstacle
        this.redbox = this.physics.add.sprite(centerX, centerY, 'redbox');
        this.redbox.setCollideWorldBounds(true);
        this.redbox.setBounce(1);

        // create physics ball
        this.ball = this.physics.add.sprite(32, centerY, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.VEL_X = 200;           // player-controlled
        this.VEL_Y = 300;           // sine wave control
        this.SINE_DURATION = 1000;  // sine wave duration

        // create sine counter to control Y movement
        this.sineCounter = this.tweens.addCounter({
            from: -this.VEL_Y,
            to: this.VEL_Y,
            duration: this.SINE_DURATION,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // handle collision
        this.physics.add.collider(this.redbox, this.ball);

        // setup input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // update ball velocity with counter
        this.ball.setVelocityY(this.sineCounter.getValue());

        // ball movement control
        this.ball.setVelocityX(0);
        if(cursors.left.isDown) {
            this.ball.setVelocityX(-this.VEL_X);
        }
        if(cursors.right.isDown) {
            this.ball.setVelocityX(this.VEL_X);
        }
    }
}



// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Sinusoidal ]
}

const game = new Phaser.Game(config);

// global
let cursors;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;