#written par fc on 2016-12-15

class Phacker.Game.Effects

    constructor:(@gm, @pointer, @init) ->
        @_fle_      ='Effect'

        @top_stick  = 0 # time  to stick environment
        @boom = @gm.add.sprite 100, 100, 'effect'
        @boom.animations.add  'explosion', [2, 1, 0], 10, true
        @boom.animations.add  'implosion', [0, 1 ,2], 10, true
        @boom.animations.play 'explosion'

        @boom.visible = true

    # animation
    explode:(x, y) ->
        #1/ top for begining of animation
        @top_stick = new Date().getTime()

        #2/ stop sprites and boom sprite visible
        console.log "- #{@_fle_} : ",@pointer.x,@pointer.y

        @boom.visible = on
        @boom.x =  @pointer.x - 38
        @boom.y =  @pointer.y - 38

    # restart after an animation
    restart: ->
        dt = new Date().getTime()- @top_stick
        #wait 2 sec before restarting not more
        if 2000 < dt < 5000

            @top_stick = 0 # reset
            @boom.visible = false





