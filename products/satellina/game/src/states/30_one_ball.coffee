# fc on 2016-12-28

class  Phacker.Game.One_ball

    constructor : (@gm, @init, @param) ->
        @_fle_ ='One ball'

        # prm curve ball
        @teta = 0 # param to draw
        @phase = .5 # o to 2pi for inclinaison
        @center =  {x: @gm.world.centerX,y: @gm.world.centerY} # center of parametric curve
        @rad = {x:150, y:60}   # radius
        @colors = @init.colors # definition of all colors
        @color = @colors.green
        @num = @param.num

        @curve(@param) # check params"

        @ball = @gm.add.sprite @fx(@teta),@fy(@teta), 'balls',@color
        if @param.color is 'invisible' then @ball.visible = false


    #.----------.----------
    # define curve
    #.----------.----------
    curve:( x ) ->
          if x.teta?      then @teta = x.teta
          if x.rad?       then @rad = x.rad
          if x.phase?     then @phase = x.phase
          if x.center?    then @center= x.center
          if x.color?     then @color = @colors[x.color]

          #console.log "- #{@_fle_} : ",@color,@num
    #.----------.----------
    # functions x & y & animation for one ball only
    #.----------.----------
    fx :(tt) -> @center.x + @rad.x * Math.sin(tt + @phase)
    fy :(tt) -> @center.y + @rad.y * Math.cos tt

    move : (speed) ->
        @teta +=  speed
        if @teta> 2 * Math.PI then @teta -= 2 *  Math.PI
        @ball.x = @fx(@teta)
        @ball.y = @fy(@teta)




