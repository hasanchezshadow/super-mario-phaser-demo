/* global Phaser */

import {createAnimations} from "./animations.js";

const config = {
    type: Phaser.AUTO, // webgl, canvas, ...
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'my-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
        }
    },
    scene: {
        preload, // Function that will be executed to preload the game resources.
        create, // Function that will be executed when the game starts.
        update, // Function that will be executed in each frame.
    }
}


const myGame = new Phaser.Game(config);

function preload() { // Function that will be executed to preload the game resources.
    // this -> game -> the game we are building
    this.load.image(
        'cloud1', // resource id
        './assets/scenery/overworld/cloud1.png' // resource url
    );
    this.load.image(
        'floorbricks', // resource id
        './assets/scenery/overworld/floorbricks.png' // resource url
    );
    this.load.spritesheet(
        'mario', // resource id
        './assets/entities/mario.png', // resource url,
        {frameWidth: 18, frameHeight: 16}
    );

    this.load.audio('gameover', './assets/sound/music/gameover.mp3')
}

function create() { // Function that will be executed when the game starts.
    // image(x, y, 'asset-id')
    this.add.image(100, 50, 'cloud1').setOrigin(0, 0).setScale(0.15);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(0, config.height - 16, 'floorbricks').setOrigin(0, 0.5).refreshBody();
    this.floor.create(150, config.height - 16, 'floorbricks').setOrigin(0, 0.5).refreshBody();

    this.mario = this.physics.add.sprite(50, 196, 'mario', 0)
        .setOrigin(0.5, 1)
        .setGravityY(300)
        .setCollideWorldBounds(true);

    this.physics.world.setBounds(0 , 0, config.width * 5, config.height);
    this.physics.add.collider(this.mario, this.floor);

    this.cameras.main.setBounds(0 , 0, config.width * 5, config.height);
    this.cameras.main.startFollow(this.mario);

    createAnimations(this);

    // Creating game keys
    this.keys = this.input.keyboard.createCursorKeys();
}

function update() { // Function that will be executed in each frame.
    if (this.mario.isDead) return;


    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walks', true);
        this.mario.x -= 0.5;
        this.mario.flipX = true;
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walks', true);
        this.mario.x += 0.5;
        this.mario.flipX = false;
    } else {
        this.mario.anims.play('mario-idle', true);
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.anims.play('mario-jumps', true);
        this.mario.setVelocityY(-150);
    }
    if (this.mario.y >= config.height && !this.mario.body.touching.down){
        this.mario.isDead = true;
        this.mario.anims.play('mario-dies', true);
        this.mario.setVelocityY(-200);
        this.mario.setCollideWorldBounds(false);
        this.sound.add('gameover', {volume: 0.5}).play();

        setTimeout(() => {
            this.scene.restart();
        }, 2000)
    }
}
