class PlayerShip extends sprites.ExtendableSprite {
    private jetpackPower: number = -12

    constructor(){
        super(assets.image`jetpack off`, SpriteKind.Player)
        this.setPosition(12, 100)
        this.setStayInScreen(true)
        this.ay = 250
    }

    public fall(ground: Sprite) {
        if (this.overlapsWith(ground)) {
            this.bottom = ground.top - 1
            this.vy = 0
        }

        if (controller.A.isPressed()) {
            this.vy += this.jetpackPower
            this.setImage(assets.image`jetpack on`)
        } else {
            this.setImage(assets.image`jetpack off`)
        }
    }

    public hitHead() {
        this.vy = 0
    }
}