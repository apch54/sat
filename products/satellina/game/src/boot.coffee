
#         ,-_-|
#      | ([o o])| ------------- ##        o  o  O  O   O
#      | --(_)--| ------------- ##
#    /---------------\
#   |   Rambo-tank    `
#   |------------------|
#   |__o__0__0__0__o__/     fc 2016-12-10
#

#Register Game
game = new Phacker.Game

game.setGameState YourGame

game.setSpecificAssets ->

# my parameters
    @_fle_ = 'specific asset'
    dsk = root_design + "desktop/desktop_gameplay/"
    mob = root_design + "mobile/mobile_gameplay/"
    aud = root_game   + 'audio/' #"products/tank-warrior/game/audio/"

    ld= @game.load

    #.----------.----------
    #images & sprites
    #.----------.----------

    if gameOptions.fullscreen # small width
        ld.image  'sky', mob + 'bg_gameplay.jpg'

    else # large width
        ld.image  'sky', dsk + 'bg_gameplay.jpg'

    #pointer
    ld.spritesheet  'pnt',   dsk + 'pointer2.png',17, 17, 3
    #balls
    ld.spritesheet  'balls', dsk + 'balls.png', 18, 18, 6

    ### platform


    ld.spritesheet 'jmp_btn', dsk + 'jump_btn.png', 200, 57, 2
    # that's rambo the tank-warrior (rmb)
    ld.spritesheet 'rmb',     dsk + 'character_sprite/character_sprite.png', 35, 44, 4

    ld.spritesheet 'tank1',   dsk + 'danger/danger1.png', 68, 42, 4
    ld.spritesheet 'tank2',   dsk + 'danger/danger2.png', 68, 42, 4
    ld.spritesheet 'tank3',   dsk + 'danger/danger3.png', 68, 42, 4

    ld.spritesheet 'effect1',   dsk + 'effects/effect1.png', 86, 88, 3
    ld.spritesheet 'effect2',   dsk + 'effects/effect2.png', 86, 88, 3
    ld.spritesheet 'effect3',   dsk + 'effects/effect3.png', 86, 88, 3

    ld.audio 'bs_audio',       [ aud + 'bs.mp3', aud + 'bs.ogg' ]

    ###
    #.----------.----------
    #consts
    #.----------.----------

    @game.init =
        sky :
            x0 : 0
            y0 : 48 # bachground
            w  : if gameOptions.fullscreen  then 768 else 375
            h  : if gameOptions.fullscreen  then 768 - 48 else 375 - 48
    #pointer
    @game.init.pnt =
        width       : 20
        height      : 20
        x0          : 100
        y0          : 100
        mouse_down  : false

    #p ball
    @game.init.ball =
        height      :  18
        width       :  18


    #.----------.----------
    # to be let    
    #.----------.----------

    game.setTextColorGameOverState 'white'
    game.setTextColorWinState 'white'
    game.setTextColorStatus 'orange'
    game.setOneTwoThreeColor 'white'

    game.setLoaderColor 0xffffff
    game.setTimerColor 0x60840A
    game.setTimerBgColor 0xffffff


@pauseGame = ->
    game.game.paused = true

@replayGame = ->
    game.game.paused = false

game.run();

