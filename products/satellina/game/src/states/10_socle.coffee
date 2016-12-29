
#-------------------------------------------------!
#            ####                  ####           !
#            ####=ooO=========Ooo= ####           !
#            ####  \\  (o o)  //   ####           !
#               --------(_)--------               !
#              --. ..- ...  .. ...   −− .         !
#-------------------------------------------------!
#                socle: 2016/12/07                !
#                      apch                       !
#-------------------------------------------------!
#  My name's rmb stands for Rambo the 'socler'    !
#-------------------------------------------------!

class Phacker.Game.Socle

    # Platform ss

    constructor: (@gm, @init) ->
        @_fle_          = 'Socle'
        @t_pressed       = 0 #as time pressed

        @draw_sky()

    #.----------.----------
    # build socle
    #.----------.----------

    draw_sky :  ->
        @sky = @gm.add.sprite(0, @gm.init.sky.y0, 'sky')
        @gm.world.sendToBack(@sky)
        @sky.fixedToCamera = true;



    #.----------.----------
    # give remaining ms to end of the game timer
    #.----------.----------
    remaining_ms : ->  gameOptions.duration * 1000 - @gm.time._timers[0].events[0].timer.ms
