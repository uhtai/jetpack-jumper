# on start code
Player = SpriteKind.player
Enemy = SpriteKind.enemy
Ground = SpriteKind.create()
dino = sprites.create(assets.image("jetpack off"), Player)
ground = sprites.create(image.create(160, 10), Ground)
jetpack_power = -120
game_speed = -75

def on_start():
    dino.set_position(12, 100)
    dino.set_stay_in_screen(True)
    dino.ay = 250
    ground.image.fill(12)
    ground.bottom = 120
    scene.set_background_image(assets.image("background"))
    info.set_score(0)
on_start()
# end of on start code

def game_over(dino, ufo):
    game.over(False)
sprites.on_overlap(Player, Enemy, game_over)

def hit_head(dino):
    dino.vy = 0
spriteutils.on_sprite_of_kind_hits_edge_of_screen(Player, hit_head)

def fall():
    if dino.overlaps_with(ground):
        dino.bottom = ground.top - 1
        dino.vy = 0
    if controller.A.is_pressed():
        dino.vy += jetpack_power
        dino.set_image(assets.image("jetpack on"))
    else:
        dino.set_image(assets.image("jetpack off"))

def tick():
    fall()
    info.change_score_by(1)
game.on_update(tick)

def spawn_ufo():
    ufo = sprites.create(assets.image("ufo"), Enemy)
    ufo.left = 159
    ufo.y = randint(6, 100)
    ufo.set_velocity(game_speed, 0)
    ufo.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(750, spawn_ufo)
