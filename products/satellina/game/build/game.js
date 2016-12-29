(function() {
  Phacker.Game.Socle = (function() {
    function Socle(gm, init) {
      this.gm = gm;
      this.init = init;
      this._fle_ = 'Socle';
      this.t_pressed = 0;
      this.draw_sky();
    }

    Socle.prototype.draw_sky = function() {
      this.sky = this.gm.add.sprite(0, this.gm.init.sky.y0, 'sky');
      this.gm.world.sendToBack(this.sky);
      return this.sky.fixedToCamera = true;
    };

    Socle.prototype.remaining_ms = function() {
      return gameOptions.duration * 1000 - this.gm.time._timers[0].events[0].timer.ms;
    };

    return Socle;

  })();

}).call(this);

(function() {
  Phacker.Game.Pointer = (function() {
    function Pointer(gm, init) {
      this.gm = gm;
      this.init = init;
      this._fle_ = 'Pointer';
      this.pnt = this.gm.add.sprite(this.init.pnt.x0, this.init.pnt.y0, 'pnt');
      this.pnt.anchor.set(.5);
      this.pnt.inputEnabled = true;
      this.pnt.input.enableDrag(true);
      this.pnt.animations.add('pulse', [0, 1, 2, 1], 8, true);
      this.pnt.animations.play('pulse');
      this.pnt.events.onInputUp.add(this.mouse_up, this);
      this.pnt.events.onInputDown.add(this.mouse_down, this);
    }

    Pointer.prototype.mouse_down = function() {
      return this.init.pnt.mouse_down = true;
    };

    Pointer.prototype.mouse_up = function() {
      return this.init.pnt.mouse_down = false;
    };

    Pointer.prototype.reset = function() {
      return this.rmb.x = this.init.rmb.x0;
    };

    return Pointer;

  })();

}).call(this);

(function() {
  Phacker.Game.One_ball = (function() {
    function One_ball(gm, init, param) {
      this.gm = gm;
      this.init = init;
      this.param = param;
      this._fle_ = 'One ball';
      this.teta = 0;
      this.dteta = .02;
      this.phase = .5;
      this.center = {
        x: this.gm.world.centerX,
        y: this.gm.world.centerY
      };
      this.rad = {
        x: 150,
        y: 60
      };
      this.color = 3;
      this.curve(this.param);
      this.ball = this.gm.add.sprite(this.fx(this.teta), this.fy(this.teta), 'balls', this.color);
      if (this.param.color === 'invisible') {
        this.ball.visible = false;
      }
    }

    One_ball.prototype.curve = function(x) {
      if (x.teta != null) {
        this.teta = x.teta;
      }
      if (x.rad != null) {
        this.rad = x.rad;
      } else {

      }
      if (x.phase != null) {
        this.phase = x.phase;
      }
      if (x.center != null) {
        this.center = x.center;
      }
      if (x.color != null) {
        return this.color = this.set_color(x.color);
      }
    };

    One_ball.prototype.set_color = function(x) {
      switch (x) {
        case 'red':
          return 0;
        case 'green':
          return 3;
        case 'yellow':
          return 5;
        default:
          return 4;
      }
    };

    One_ball.prototype.fx = function(tt) {
      return this.center.x + this.rad.x * Math.sin(tt + this.phase);
    };

    One_ball.prototype.fy = function(tt) {
      return this.center.y + this.rad.y * Math.cos(tt);
    };

    One_ball.prototype.move = function(dteta) {
      this.teta += dteta;
      if (this.teta > 2 * Math.PI) {
        this.teta -= 2 * Math.PI;
      }
      this.ball.x = this.fx(this.teta);
      return this.ball.y = this.fy(this.teta);
    };

    return One_ball;

  })();

}).call(this);

(function() {
  Phacker.Game.Shapes = (function() {
    function Shapes(gm, init) {
      this.gm = gm;
      this.init = init;
      this._fle_ = 'Shapes';
      this.balls = [];
      this.color = ['green', 'yellow', 'red', 'invisible'];
      this.make_ellipse(14, 1);
      this.make_ellipse(14, -1);
    }

    Shapes.prototype.make_a_ball = function(params) {
      var bl;
      bl = new Phacker.Game.One_ball(this.gm, this.init, params);
      return this.balls.push(bl);
    };

    Shapes.prototype.move = function(speed) {
      var bl, j, len, ref, results;
      ref = this.balls;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        bl = ref[j];
        results.push(bl.move(speed));
      }
      return results;
    };

    Shapes.prototype.bind_pointer = function(pt) {
      return this.pointer = pt;
    };

    Shapes.prototype.make_ellipse = function(n_balls, phs) {
      var ball, i, j, params, ref, results;
      params = {
        phase: phs
      };
      params.rad = {
        x: 100,
        y: 150
      };
      results = [];
      for (i = j = 0, ref = n_balls - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        params.color = this.color[i % 3];
        if (i >= n_balls - 1) {
          params.color = 'invisible';
        }
        params.teta = Math.PI * 2 / n_balls * i;
        results.push(ball = this.make_a_ball(params));
      }
      return results;
    };

    Shapes.prototype.overlap = function() {
      var ball, bl_bnd, j, len, pt_bnd, ref, results;
      ref = this.balls;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        ball = ref[j];
        bl_bnd = ball.ball.getBounds();
        pt_bnd = this.pointer.getBounds();
        if (Phaser.Rectangle.intersects(bl_bnd, pt_bnd)) {
          ball.ball.visible = false;
          results.push(console.log("- " + this._fle_ + " : ", 'overlap'));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    return Shapes;

  })();

}).call(this);

(function() {
  Phacker.Game.Effects = (function() {
    function Effects(gm, rmb, stp, init) {
      this._fle_ = 'Boom';
      this.gm = gm;
      this.rmb = rmb;
      this.stp = stp;
      this.init = init;
      this.top_stick = 0;
      this.tk = {};
      this.tk_vx = 0;
      this.rmb_vx = 0;
      this.effect_faces = ['effect1', 'effect2', 'effect3'];
      this.boom = this.gm.add.sprite(100, 100, this.effect_faces[this.gm.rnd.integerInRange(0, 1)]);
      this.boom.animations.add('explosion', [2, 1, 0], 10, true);
      this.boom.animations.add('implosion', [0, 1, 2], 10, true);
      this.boom.animations.play('explosion');
      this.boom.visible = false;
    }

    Effects.prototype.explode = function() {
      this.top_stick = new Date().getTime();
      this.tk = this.stp.tanks.getAt(0);
      this.tk_vx = this.tk.body.velocity;
      this.rmb_vx = this.rmb.body.velocity;
      this.tk.body.velocity = 0;
      this.rmb.body.velocity = 0;
      this.boom.visible = true;
      this.boom.x = (this.rmb.x + this.tk.x) / 2 - this.init.tank.width;
      return this.boom.y = this.rmb.y - 25;
    };

    Effects.prototype.restart = function() {
      var dt;
      dt = new Date().getTime() - this.top_stick;
      if ((2000 < dt && dt < 5000)) {
        this.tk.body.velocity = this.tk_vx;
        this.rmb.body.velocity = this.rmb_vx;
        this.top_stick = 0;
        return this.boom.visible = false;
      }
    };

    return Effects;

  })();

}).call(this);

(function() {
  Phacker.Game.A_sound = (function() {
    function A_sound(game, name) {
      this.gm = game;
      this.name = name;
      this.snd = this.gm.add.audio(this.name);
      this.snd.allowMultiple = true;
      this.add_markers();
      return;
    }

    A_sound.prototype.add_markers = function() {
      var i, len, results, snds, x;
      snds = ['dong', 'fsi', 'ding', 'wap_wap', 'twat'];
      results = [];
      for (i = 0, len = snds.length; i < len; i++) {
        x = snds[i];
        switch (x) {
          case 'dong':
            results.push(this.snd.addMarker(x, 0.05, 0.45));
            break;
          case 'fsi':
            results.push(this.snd.addMarker(x, 0.54, 1.22));
            break;
          case 'ding':
            results.push(this.snd.addMarker(x, 1.84, 1.06));
            break;
          case 'wap_wap':
            results.push(this.snd.addMarker(x, 3.03, 3.25));
            break;
          case 'twat':
            results.push(this.snd.addMarker(x, 6.44, 0.17));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    A_sound.prototype.play = function(key) {
      return this.snd.play(key);
    };

    return A_sound;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.YourGame = (function(superClass) {
    extend(YourGame, superClass);

    function YourGame() {
      return YourGame.__super__.constructor.apply(this, arguments);
    }

    YourGame.prototype.update = function() {
      this._fle_ = ' Jeu Update : ';
      YourGame.__super__.update.call(this);
      this.shapesO.move(0.025);
      return this.shapesO.overlap();

      /*
      @game.physics.arcade.collide @rmb, @stepsO.stages
      @game.physics.arcade.collide @stepsO.tanks, @stepsO.stages
      
      @stepsO.check_tank_x()  # is tank.x on stage ?
      @rmbO.check_rmb_x()     # is rmb.x on stage ?
      
       * if rambo has jumped then 1/score 2/destroy tank & step 3/music
      low_hight_jmp = @rmbO.has_jumped()
      if low_hight_jmp is 'hight' # hight jump
          @stepsO.destroy_1st_stage() #  destroy tank and stage under rambo
          @stepsO.add_tank_step(1)# add one stage
          @win()
          @cd.play 'dong'
      
      #----------.----------
       * end duration ?
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
       * rambo must run on  stages
      if @rmbO.chk_low_jump() is 'low'
          @winBonus()
          @cd.play 'ding'
      
       * check after overlaping if  we need to restart
       * and hide animation
      @effO.restart()
       */
    };

    YourGame.prototype.resetPlayer = function() {

      /*
      console.log "Reset the player "
      @stepsO.replace_tank(0) # set tank level 0 after the middle
      @rmbO.reset()
      #@end_game.inited = false
       */
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this._fle_ = 'Jeu.create';
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.socleO = new Phacker.Game.Socle(this.game, this.game.init);
      this.pointerO = new Phacker.Game.Pointer(this.game, this.game.init);
      this.shapesO = new Phacker.Game.Shapes(this.game, this.game.init);
      return this.shapesO.bind_pointer(this.pointerO.pnt);

      /*
      #.----------.----------
      #stages or battle field and tanks
      @stepsO = new Phacker.Game.Step @game, @game.init
      
      #.----------.----------
       * player : My name is Rambo : or rmb or @rmb
      @rmbO = new Phacker.Game.Player(@game, @game.init) # instance obj@ge.GusO = new Phacker.Game.gus(game, @ge.stepsO.x0+20, @ge.stepsO.y0-40); # instance obj
      @rmb = @rmbO.set() #define 'player' : Rambo
      @rmbO.bind(@stepsO)
      @socleO.bind(@rmb, @stepsO)
      
      #.----------.----------
       * effect :  boom effect  in place  of rambo when he's overlaping a tank
      @effO = new Phacker.Game.Effects @game, @rmb, @stepsO, @game.init # instance obj
      
      #.----------.----------
       * audio
      @cd = new Phacker.Game.A_sound @game, 'bs_audio'
      #@cd.play 'over'
      
      #.----------.----------
      @rmbO.reset()
      #@win()# score first
      @cd.play 'dong'
       */
    };

    return YourGame;

  })(Phacker.GameState);

}).call(this);

(function() {
  var game;

  game = new Phacker.Game;

  game.setGameState(YourGame);

  game.setSpecificAssets(function() {
    var aud, dsk, ld, mob;
    this._fle_ = 'specific asset';
    dsk = root_design + "desktop/desktop_gameplay/";
    mob = root_design + "mobile/mobile_gameplay/";
    aud = root_game + 'audio/';
    ld = this.game.load;
    if (gameOptions.fullscreen) {
      ld.image('sky', mob + 'bg_gameplay.jpg');
    } else {
      ld.image('sky', dsk + 'bg_gameplay.jpg');
    }
    ld.spritesheet('pnt', dsk + 'pointer2.png', 17, 17, 3);
    ld.spritesheet('balls', dsk + 'balls.png', 18, 18, 6);

    /* platform
    
    
    ld.spritesheet 'jmp_btn', dsk + 'jump_btn.png', 200, 57, 2
     * that's rambo the tank-warrior (rmb)
    ld.spritesheet 'rmb',     dsk + 'character_sprite/character_sprite.png', 35, 44, 4
    
    ld.spritesheet 'tank1',   dsk + 'danger/danger1.png', 68, 42, 4
    ld.spritesheet 'tank2',   dsk + 'danger/danger2.png', 68, 42, 4
    ld.spritesheet 'tank3',   dsk + 'danger/danger3.png', 68, 42, 4
    
    ld.spritesheet 'effect1',   dsk + 'effects/effect1.png', 86, 88, 3
    ld.spritesheet 'effect2',   dsk + 'effects/effect2.png', 86, 88, 3
    ld.spritesheet 'effect3',   dsk + 'effects/effect3.png', 86, 88, 3
    
    ld.audio 'bs_audio',       [ aud + 'bs.mp3', aud + 'bs.ogg' ]
     */
    this.game.init = {
      sky: {
        x0: 0,
        y0: 48,
        w: gameOptions.fullscreen ? 768 : 375,
        h: gameOptions.fullscreen ? 768 - 48 : 375 - 48
      }
    };
    this.game.init.pnt = {
      width: 20,
      height: 20,
      x0: 100,
      y0: 100,
      mouse_down: false
    };
    this.game.init.ball = {
      height: 18,
      width: 18
    };
    game.setTextColorGameOverState('white');
    game.setTextColorWinState('white');
    game.setTextColorStatus('orange');
    game.setOneTwoThreeColor('white');
    game.setLoaderColor(0xffffff);
    game.setTimerColor(0x60840A);
    return game.setTimerBgColor(0xffffff);
  });

  this.pauseGame = function() {
    return game.game.paused = true;
  };

  this.replayGame = function() {
    return game.game.paused = false;
  };

  game.run();

}).call(this);
