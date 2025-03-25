namespace SpriteKind {
    export const Ground = SpriteKind.create()
}

class GameManager {
    private gameSpeed: number = -75
    private playerSprite: PlayerShip
    private ground: Sprite
    constructor() {
        scene.setBackgroundImage(assets.image`background`)
        info.setScore(0)
        this.setupGroundSprite()
        this.playerSprite = new PlayerShip()
        this.initialiseSpriteOverlaps()
        this.initialiseOnUpdates()
        this.initialiseOnUpdateIntervals()
    }
    private setupGroundSprite() {
        this.ground = sprites.create(image.create(160, 10), SpriteKind.Ground)
        this.ground.image.fill(12)
        this.ground.bottom = 120
    }
    private initialiseSpriteOverlaps() {
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function game_over(dino: Sprite, ufo: Sprite) {
            game.over(false)
        })
        spriteutils.onSpriteOfKindHitsEdgeOfScreen(SpriteKind.Player, function hit_head(dino: Sprite) {
            dino.vy = 0
        })
    }
    private initialiseOnUpdates() {
        game.onUpdate(function tick() {
            // fall()
            info.changeScoreBy(1)
            this.playerSprite.fall(this.ground)
        })
    }
    private initialiseOnUpdateIntervals() {
        game.onUpdateInterval(750, function spawn_ufo() {
            let ufo = sprites.create(assets.image`ufo`, SpriteKind.Enemy)
            ufo.left = 159
            ufo.y = randint(6, 100)
            ufo.setVelocity(this.gameSpeed, 0)
            ufo.setFlag(SpriteFlag.AutoDestroy, true)
        })
    }
}