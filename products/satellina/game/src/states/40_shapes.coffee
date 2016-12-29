# fc on 2016-12-28

class  Phacker.Game.Shapes

    constructor : (@gm, @init) ->
        @_fle_ ='Shapes'
        @balls =[] # contains all balls
        @color =['green', 'yellow','red','invisible']
        @make_ellipse(14, 1)
        @make_ellipse(14, -1)


    make_a_ball :(params) ->
        bl = new Phacker.Game.One_ball @gm, @init, params
        @balls.push bl

    move:(speed) -> for bl in @balls then bl.move(speed)

    #.----------.----------
    #binding and injection
    #.----------.----------
    bind_pointer :(pt)-> @pointer = pt # star on scope

    #.----------.----------
    # make an ellipse with n_balls
    #.----------.----------
    make_ellipse: (n_balls, phs) -> # parametrics eq defined in One_ball object
        params= {phase: phs }
        params.rad = {x:100, y:150} # radius
        for i in [0..n_balls - 1]
            params.color = @color[i % 3]
            if i >= n_balls - 1 then params.color = 'invisible'

            params.teta = Math.PI * 2 / n_balls * i
            ball = @make_a_ball(params)

    #.----------.----------
    # check overlaping
    #.----------.----------
    overlap:->
        for ball in @balls
            bl_bnd = ball.ball.getBounds()
            pt_bnd = @pointer.getBounds()
            if Phaser.Rectangle.intersects(bl_bnd, pt_bnd)
                ball.ball.visible = false
                console.log "- #{@_fle_} : ", 'overlap'







