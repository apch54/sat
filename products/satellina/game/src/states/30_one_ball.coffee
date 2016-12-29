# fc on 2016-12-28

class  Phacker.Game.One_ball

    constructor : (@gm, @init, @param) ->
        @_fle_ ='One ball'

        # prm curve ball
        @teta = 0 # param to draw
        @dteta = .02 # speed of the ball on curve
        @phase = .5 # o to 2pi for inclinaison
        @center =  {x: @gm.world.centerX,y: @gm.world.centerY} # center of parametric curve
        @rad = {x:150, y:60}   # radius
        @color = 3 # ball color : green

        @curve(@param) # check params"

        @ball = @gm.add.sprite @fx(@teta),@fy(@teta), 'balls',@color
        if @param.color is 'invisible' then @ball.visible = false

    #.----------.----------
    # define curve
    #.----------.----------
    curve:( x ) ->
          if x.teta?      then @teta = x.teta
          if x.rad?       then @rad = x.rad else
          if x.phase?     then @phase = x.phase
          if x.center?    then @center= x.center
          if x.color?     then @color = @set_color(x.color)

    #.----------.----------
    # define  ball color
    #.----------.----------
    set_color: (x) ->
          switch x
              when 'red'      then return 0
              when 'green'    then return 3
              when 'yellow'   then return 5
              else return 4 #tuquoise for error

    #.----------.----------
    # functions x & y & animation for one ball only
    #.----------.----------
    fx :(tt) -> @center.x + @rad.x * Math.sin(tt + @phase)
    fy :(tt) -> @center.y + @rad.y * Math.cos tt

    move : (dteta) ->

        @teta +=  dteta
        if @teta> 2 * Math.PI then @teta -= 2 *  Math.PI
        @ball.x = @fx(@teta)
        @ball.y = @fy(@teta)




