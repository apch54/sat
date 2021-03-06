#     |_  |
#       | |  ___  _   _
#   /\__/ /|  __/| |_| |             ...
#   \____/  \___| \__,_|            (- o)
#                               ooO--(_)--Ooo-


# fc  2016-12-10

        

class @YourGame extends Phacker.GameState 

    #----------.----------.----------
    update: ->
    #----------.----------.----------
        @_fle_ =' Jeu Update : '
        super() #Required

        @shapesO.move() # move balls
        console.log "- #{@_fle_} : ",@effO.pointer.x

        resp = @shapesO.overlap()

        if resp is 'win'
            @win()
            @cd.play 'win'

        else if resp is 'loose'
            @effO.explode() # effects
            @lostLife()
            @lost()
            @cd.play 'loose'



        ###
        @game.physics.arcade.collide @rmb, @stepsO.stages
        @game.physics.arcade.collide @stepsO.tanks, @stepsO.stages

        @stepsO.check_tank_x()  # is tank.x on stage ?
        @rmbO.check_rmb_x()     # is rmb.x on stage ?

        # if rambo has jumped then 1/score 2/destroy tank & step 3/music
        low_hight_jmp = @rmbO.has_jumped()
        if low_hight_jmp is 'hight' # hight jump
            @stepsO.destroy_1st_stage() #  destroy tank and stage under rambo
            @stepsO.add_tank_step(1)# add one stage
            @win()
            @cd.play 'dong'

        #----------.----------
        # end duration ?
        if @socleO.remaining_ms() < 15  then @cd.play('wap_wap')

        #----------.----------
        #check if rambo is overlaping tank 0 ( low level)
        if @stepsO.tank_overlap(@rmb) # oops, rmb's on a tank
            @lostLife()
            @lost()
            @effO.explode() # effects

            
            if  ge.heart.length < 1 then @cd.play 'wap_wap'
            else  @cd.play 'twat'
            
        #check Rambo animation and low jump
        # rambo must run on  stages
        if @rmbO.chk_low_jump() is 'low'
            @winBonus()
            @cd.play 'ding'

        # check after overlaping if  we need to restart
        # and hide animation
        @effO.restart()
        ###
    #----------.----------.----------
    resetPlayer: -> #when rmb has crashed or retry (error in that case)
    #----------.----------.----------
        console.log "Reset the player "
        @shapesO.reset()
        @effO.restart()



    #----------.----------.----------
    create: ->
    #----------.----------.----------
        super() #Required
        @_fle_ = 'Jeu.create'      

        @game.physics.startSystem(Phaser.Physics.ARCADE)
        #@game.world.setBounds(0, -500000, 20000, 550000)


        #.----------.----------
        # manage socle
        # platform is the real socle physicaly speaking
        @socleO = new Phacker.Game.Socle @game, @game.init   #obj
        #@platform = @socleO.set_group() #define plateform

        #.----------.----------
        # Pointer
        @pointerO = new Phacker.Game.Pointer @game, @game.init

        #.----------.----------
        # set shapes & curves
        @shapesO = new Phacker.Game.Shapes @game, @game.init
        @shapesO.bind_pointer(@pointerO.pnt) # bind player

        #.----------.----------
        # audio
        @cd = new Phacker.Game.A_sound @game, 'sat_audio'
        @cd.play 'win'

        #.----------.----------
        # effect :  boom effect  in place
        @effO = new Phacker.Game.Effects @game,@pointerO.pnt, @game.init # instance obj

        ###
        #.----------.----------
        #stages or battle field and tanks
        @stepsO = new Phacker.Game.Step @game, @game.init

        #.----------.----------
        # player : My name is Rambo : or rmb or @rmb
        @rmbO = new Phacker.Game.Player(@game, @game.init) # instance obj@ge.GusO = new Phacker.Game.gus(game, @ge.stepsO.x0+20, @ge.stepsO.y0-40); # instance obj
        @rmb = @rmbO.set() #define 'player' : Rambo
        @rmbO.bind(@stepsO)
        @socleO.bind(@rmb, @stepsO)

        #.----------.----------
        @rmbO.reset()
        #@win()# score first
        @cd.play 'dong'

        ###