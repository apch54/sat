# written by fc
# on2016
# description: 2016-10-05

#
#      '  _ ,  '     .- .-.. .-..  .- .-. .  ..-. --- --- .-..
#     -  (o)o)  -
#    -ooO'(_)--Ooo-


class  Phacker.Game.A_sound    #extends Phacker.Game.sound

    constructor : (game, name) ->
        @gm   = game
        @name = name

        @snd  = @gm.add.audio @name
        @snd.allowMultiple = true
        @add_markers()
        return


    add_markers: ()->
        snds = ['win','loose','wosh','over' ] # list the whole sound in bs file

        for x in snds
            #console.log "In sound add cls", x
            switch x
                when 'win'     then @snd.addMarker x,       0.5,  0.057   #  walk on steps
                when 'loose'   then @snd.addMarker x,       1,    0.27    #   fall down
                when 'wosh'    then @snd.addMarker x,       1.5,  0.3     # bonus o2
                when 'over'    then @snd.addMarker x,       2,    4.2     # the end

    play: (key) -> @snd.play  key
