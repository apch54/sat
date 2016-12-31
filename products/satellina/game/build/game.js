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
      this.phase = .5;
      this.center = {
        x: this.gm.world.centerX,
        y: this.gm.world.centerY
      };
      this.rad = {
        x: 150,
        y: 60
      };
      this.colors = this.init.colors;
      this.color = this.colors.green;
      this.num = this.param.num;
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
      }
      if (x.phase != null) {
        this.phase = x.phase;
      }
      if (x.center != null) {
        this.center = x.center;
      }
      if (x.color != null) {
        return this.color = this.colors[x.color];
      }
    };

    One_ball.prototype.fx = function(tt) {
      return this.center.x + this.rad.x * Math.sin(tt + this.phase);
    };

    One_ball.prototype.fy = function(tt) {
      return this.center.y + this.rad.y * Math.cos(tt);
    };

    One_ball.prototype.move = function(speed) {
      this.teta += speed;
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
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Phacker.Game.Shapes = (function() {
    function Shapes(gm, init) {
      this.gm = gm;
      this.init = init;
      this._fle_ = 'Shapes';
      this.balls = [];
      this.speed = {
        current: this.gm.init.ball.speed,
        last: this.gm.init.ball.speed
      };
      this.color = ['green', 'yellow', 'red', 'invisible'];
      this.num = 0;
      this.has_losted = false;
      this.last_ball = 28;
      this.i_invisible = [14, 28];
      this.invisible = [];
      this.green = [];
      this.yellow = [];
      this.red = [];
      this.make_ellipse(14, 1);
      this.make_ellipse(14, -1);

      /*console.log "- #{@_fle_} : ",@green
      console.log "- #{@_fle_} : ",@yellow
      console.log "- #{@_fle_} : ",@red
      console.log "- #{@_fle_} : ",@invisible
       */
    }

    Shapes.prototype.make_a_ball = function(params) {
      var bl;
      this.num++;
      bl = new Phacker.Game.One_ball(this.gm, this.init, params);
      return this.balls.push(bl);
    };

    Shapes.prototype.move = function() {
      var bl, j, len, ref, results;
      ref = this.balls;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        bl = ref[j];
        results.push(bl.move(this.speed.current));
      }
      return results;
    };

    Shapes.prototype.bind_pointer = function(pt) {
      return this.pointer = pt;
    };

    Shapes.prototype.bind_effect = function(eff) {
      return this.effect = eff;
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
        params.color = this.define_color(this.num);
        params.teta = Math.PI * 2 / n_balls * i;
        params.num = this.num;
        results.push(ball = this.make_a_ball(params));
      }
      return results;
    };

    Shapes.prototype.overlap = function() {
      var ball, bi, bj, br, j, len, ref;
      ref = this.balls;
      for (j = 0, len = ref.length; j < len; j++) {
        ball = ref[j];
        if (Phaser.Rectangle.intersects(ball.ball.getBounds(), this.pointer.getBounds()) && ball.ball.visible) {
          switch (ball.color) {
            case 2:
            case 1:
              if (!this.has_losted) {
                this.speed.last = this.speed.current;
                this.speed.current = 0;
                this.has_losted = true;
                return 'loose';
              }
              break;
            case 0:
              this.speed.current += this.init.ball.dspeed;
              ball.ball.visible = false;
              this.invisible.push(ball.num);
              this.green = this.green.filter(function(x) {
                return x !== ball.num;
              });
              bi = this.balls[this.invisible.shift()];
              bi.ball.visible = true;
              bi.color = 2;
              bi.ball.frame = 2;
              this.red.push(bi.num);
              br = this.balls[this.red.shift()];
              this.yellow.push(br.num);
              br.color = 1;
              br.ball.frame = 1;
              bj = this.balls[this.yellow.shift()];
              this.green.push(bj.num);
              bj.color = 0;
              bj.ball.frame = 0;
              return 'win';
          }
        }
      }
      return 'nothing';
    };

    Shapes.prototype.define_color = function(num) {
      var col, ref;
      col = num % 3;
      if (ref = num + 1, indexOf.call(this.i_invisible, ref) >= 0) {
        col = 3;
        this.invisible.push(num);
      } else {
        switch (col) {
          case 0:
            this.green.push(num);
            break;
          case 1:
            this.yellow.push(num);
            break;
          case 2:
            this.red.push(num);
        }
      }
      return this.color[col];
    };

    Shapes.prototype.set_color = function(bl, color) {
      return bl.ball.frame = color;
    };

    Shapes.prototype.reset = function() {
      this.has_losted = false;
      return this.speed.current = this.speed.last;
    };

    return Shapes;

  })();

}).call(this);

(function() {
  Phacker.Game.Effects = (function() {
    function Effects(gm, pointer, init) {
      this.gm = gm;
      this.pointer = pointer;
      this.init = init;
      this._fle_ = 'Effect';
      this.top_stick = 0;
      this.boom = this.gm.add.sprite(100, 100, 'effect');
      this.boom.animations.add('explosion', [2, 1, 0], 10, true);
      this.boom.animations.add('implosion', [0, 1, 2], 10, true);
      this.boom.animations.play('explosion');
      this.boom.visible = true;
    }

    Effects.prototype.explode = function(x, y) {
      this.top_stick = new Date().getTime();
      console.log("- " + this._fle_ + " : ", this.pointer.x, this.pointer.y);
      this.boom.visible = true;
      this.boom.x = this.pointer.x - 38;
      return this.boom.y = this.pointer.y - 38;
    };

    Effects.prototype.restart = function() {
      var dt;
      dt = new Date().getTime() - this.top_stick;
      if ((2000 < dt && dt < 5000)) {
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
      snds = ['win', 'loose', 'wosh', 'over'];
      results = [];
      for (i = 0, len = snds.length; i < len; i++) {
        x = snds[i];
        switch (x) {
          case 'win':
            results.push(this.snd.addMarker(x, 0.5, 0.057));
            break;
          case 'loose':
            results.push(this.snd.addMarker(x, 1, 0.27));
            break;
          case 'wosh':
            results.push(this.snd.addMarker(x, 1.5, 0.3));
            break;
          case 'over':
            results.push(this.snd.addMarker(x, 2, 4.2));
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
      var resp;
      this._fle_ = ' Jeu Update : ';
      YourGame.__super__.update.call(this);
      this.shapesO.move();
      console.log("- " + this._fle_ + " : ", this.effO.pointer.x);
      resp = this.shapesO.overlap();
      if (resp === 'win') {
        this.win();
        return this.cd.play('win');
      } else if (resp === 'loose') {
        this.effO.explode();
        this.lostLife();
        this.lost();
        return this.cd.play('loose');
      }

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
      console.log("Reset the player ");
      this.shapesO.reset();
      return this.effO.restart();
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this._fle_ = 'Jeu.create';
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.socleO = new Phacker.Game.Socle(this.game, this.game.init);
      this.pointerO = new Phacker.Game.Pointer(this.game, this.game.init);
      this.shapesO = new Phacker.Game.Shapes(this.game, this.game.init);
      this.shapesO.bind_pointer(this.pointerO.pnt);
      this.cd = new Phacker.Game.A_sound(this.game, 'sat_audio');
      this.cd.play('win');
      return this.effO = new Phacker.Game.Effects(this.game, this.pointerO.pnt, this.game.init);

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
    ld.spritesheet('effect', dsk + 'effects/effect2.png', 86, 88, 3);
    ld.audio('sat_audio', [aud + 'sat.mp3', aud + 'sat.ogg']);
    this.game.init = {
      sky: {
        x0: 0,
        y0: 48,
        w: gameOptions.fullscreen ? 375 : 768,
        h: gameOptions.fullscreen ? 559 - 48 : 500 - 48
      }
    };
    this.game.init.pnt = {
      width: 20,
      height: 20,
      x0: 50,
      y0: gameOptions.fullscreen ? (768 - 48) / 2 : (559 - 48) / 2,
      mouse_down: false
    };
    this.game.init.ball = {
      height: 18,
      width: 18,
      speed: gameOptions.speed,
      dspeed: 0.0005
    };
    this.game.init.colors = {
      green: 0,
      yellow: 1,
      red: 2,
      invisible: 100
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
