
# by fc on 2016-12-28
# pnt stands for pointer

class Phacker.Game.Pointer

    constructor: (@gm, @init)->
        @_fle_ = 'Pointer'

        @pnt = @gm.add.sprite @init.pnt.x0, @init.pnt.y0, 'pnt'
        @pnt.anchor.set .5
        @pnt.inputEnabled = true
        @pnt.input.enableDrag true
        @pnt.animations.add 'pulse', [0, 1, 2, 1], 8, true
        @pnt.animations.play 'pulse'
        @pnt.events.onInputUp.add @mouse_up,@
        @pnt.events.onInputDown.add @mouse_down,@

    #.----------.----------
    # mose event
    #.----------.----------
    mouse_down:->
        @init.pnt.mouse_down = true
        #console.log "- #{@_fle_} : ",@init.pnt.mouse_down

    mouse_up:->  @init.pnt.mouse_down = false




