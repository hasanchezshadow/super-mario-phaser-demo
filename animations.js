export const createAnimations = (game) => {
    game.anims.create({
        key: 'mario-walks',
        frames: game.anims.generateFrameNumbers('mario', {
            start: 3,
            end: 1,
        }),
        frameRate: 12,
        repeat: -1
    });

    game.anims.create({
        key: 'mario-jumps',
        frames: [{key: 'mario', frame: 5}],
    });

    game.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 0}],
    });

    game.anims.create({
        key: 'mario-dies',
        frames: [{key: 'mario', frame: 4}],
    });
}
