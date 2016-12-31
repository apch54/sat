# fc on 2016-12-28

class  Phacker.Game.Shapes

    constructor : (@gm, @init) ->
        @_fle_ ='Shapes'
        @balls =[] # contains all balls instances of one_ball
        @speed = {current: @gm.init.ball.speed, last: @gm.init.ball.speed }
        @color =['green', 'yellow','red','invisible']
        @num = 0 # nb of ball in game
        @has_losted = false

        @last_ball = 28
        @i_invisible = [14,28]
        @invisible =[]

        @green =[]
        @yellow =[]
        @red =[]


        # 3 parameters
        # 1st  balls numbers 2/ inclination 3/ number of ellipse -1
        @make_ellipse 14, 1
        @make_ellipse 14, -1
        ###console.log "- #{@_fle_} : ",@green
        console.log "- #{@_fle_} : ",@yellow
        console.log "- #{@_fle_} : ",@red
        console.log "- #{@_fle_} : ",@invisible
        ###

    #.----------.----------
    #  draw only one ball
    #.----------.----------
    make_a_ball :(params) ->
        @num++ # numbber of ball
        bl = new Phacker.Game.One_ball @gm, @init, params
        @balls.push bl

    #.----------.----------
    # move all balls
    #.----------.----------
    move:() -> for bl in @balls then bl.move @speed.current

    #.----------.----------
    #binding and injection
    #.----------.----------
    bind_pointer :(pt)-> @pointer = pt # star on scope
    bind_effect : (eff) ->@effect = eff

    #.----------.----------
    # make an ellipse with n_balls
    # parametrics eq defined in One_ball object
    #.----------.----------
    make_ellipse: (n_balls, phs) ->
        params= {phase: phs } # ellipse inclination
        params.rad = {x:100, y:150} # radius length

        # add n_alls balls
        for i in [0..n_balls - 1]
            params.color = @define_color @num

            params.teta = Math.PI * 2 / n_balls * i
            params.num = @num
            ball = @make_a_ball(params)


    #.----------.----------
    # check overlaping
    #.----------.----------
    overlap:->
        for ball in @balls

            if Phaser.Rectangle.intersects( ball.ball.getBounds(), @pointer.getBounds()) and ball.ball.visible
                switch ball.color
                    when 2,1 # red  or yellow ball so player loose
                        if not @has_losted
                            @speed.last  = @speed.current
                            @speed.current = 0
                            @has_losted = true

                            return 'loose'

                    when 0 # green ball so switch balls
                        @speed.current += @init.ball.dspeed

                        #green to invisible
                        ball.ball.visible = false
                        @invisible.push ball.num
                        @green = @green.filter (x)-> x isnt ball.num

                        #invisible to red
                        bi= @balls[@invisible.shift()]
                        bi.ball.visible = true
                        bi.color = 2 #red
                        bi.ball.frame = 2 # red too
                        @red.push bi.num

                        # red to yellow
                        br = @balls[@red.shift()]
                        @yellow.push br.num
                        br.color = 1 # yellow
                        br.ball.frame = 1 # yellow too

                        bj = @balls[@yellow.shift()]
                        @green.push bj.num
                        bj.color = 0 # yellow
                        bj.ball.frame = 0 # green too

                        return 'win'

        return 'nothing'


    #.----------.----------
    # define ball color for init curve
    # return the frame number or 100 for invisible
    #.----------.----------

    define_color:(num)->
        col = num % 3
        #colors
        if (num + 1) in  @i_invisible
            col = 3
            @invisible.push num
        else

            switch  col
                when 0 then @green.push num
                when 1 then @yellow.push num
                when 2 then @red.push num

        @color[col]

    #.----------.----------
    # set color of a ball on live
    # bl is the ball
    #.----------.----------
    set_color: (bl, color)-> bl.ball.frame = color

    #.----------.----------
    # reset after loosing a life
    #.----------.----------
    reset: ->
        @has_losted = false
        @speed.current = @speed.last












