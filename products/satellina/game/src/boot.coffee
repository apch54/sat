
#  fc 2016-12-10
#

#Register Game
game = new Phacker.Game

game.setGameState YourGame

game.setSpecificAssets ->

# my parameters
    @_fle_ = 'specific asset'
    dsk = root_design + "desktop/desktop_gameplay/"
    mob = root_design + "mobile/mobile_gameplay/"
    aud = root_game   + 'audio/' #

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

    # effect
    ld.spritesheet 'effect',   dsk + 'effects/effect2.png', 86, 88, 3

    ld.audio 'sat_audio',       [ aud + 'sat.mp3', aud + 'sat.ogg' ]

    #.----------.----------
    #consts
    #.----------.----------

    @game.init =
        sky :
            x0 : 0
            y0 : 48 # bachground
            w  : if gameOptions.fullscreen  then 375 else 768
            h: if gameOptions.fullscreen  then 559 - 48 else 500 - 48
    #pointer
    @game.init.pnt =
        width       : 20
        height      : 20
        x0          : 50
        y0          : if gameOptions.fullscreen then (768 - 48) / 2 else (559 - 48)/2
        mouse_down  : false

    # balls
    @game.init.ball =
        height      :  18
        width       :  18
        speed       : gameOptions.speed
        dspeed      : 0.0005

    @game.init.colors =  {green: 0, yellow:1, red:2, invisible:100 }


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
