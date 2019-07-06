"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Boss =
/*#__PURE__*/
function () {
  function Boss(args) {
    _classCallCheck(this, Boss);

    var def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      rotate: 0,
      scale: 0,
      // axisRotateRV: 1,
      axisRotateAngleV: 1,
      rotateV: 1,
      bullets: [],
      HP: 2,
      beforeGenerateEnemyTime: new Date(),
      beginAppear: true,
      isAppearing: false,
      isDisappeared: false,
      appearTimes: 0,
      appearTimer: null,
      disappearTimer: null
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Boss, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
      ctx.scale(this.scale, this.scale);
      ctx.rotate(this.rotate * degToPi); // 透明頭

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(11, 0);
      ctx.lineTo(18, 6);
      ctx.lineTo(18, 15);
      ctx.lineTo(-18, 15);
      ctx.lineTo(-18, 6);
      ctx.lineTo(-11, 0);
      ctx.closePath();
      ctx.fill(); // 黃頭

      ctx.fillStyle = globalColor.orange;
      ctx.beginPath();
      ctx.moveTo(0, 9);
      ctx.lineTo(11, 9);
      ctx.lineTo(18, 15);
      ctx.lineTo(18, 36);
      ctx.lineTo(-18, 36);
      ctx.lineTo(-18, 15);
      ctx.lineTo(-11, 9);
      ctx.closePath();
      ctx.fill(); // 裝飾內透明頭

      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, 9 + 8);
      ctx.lineTo(4, 9 + 8);
      ctx.lineTo(14, 24);
      ctx.lineTo(14, 36 - 8);
      ctx.lineTo(-14, 36 - 8);
      ctx.lineTo(-14, 24);
      ctx.lineTo(-4, 9 + 8);
      ctx.closePath();
      ctx.fill(); // 右白肩

      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(18, -6);
      ctx.lineTo(18 + 8, -6);
      ctx.lineTo(18 + 8 + 8, 15);
      ctx.lineTo(18 + 8 + 8, 36 + 6);
      ctx.lineTo(18, 36 + 6);
      ctx.closePath();
      ctx.fill(); // 左白肩

      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(-18, -6);
      ctx.lineTo(-18 - 8, -6);
      ctx.lineTo(-18 - 8 - 8, 15);
      ctx.lineTo(-18 - 8 - 8, 36 + 6);
      ctx.lineTo(-18, 36 + 6);
      ctx.closePath();
      ctx.fill(); // 右紅翼

      ctx.fillStyle = globalColor.red;
      ctx.beginPath();
      ctx.moveTo(18 + 8 + 8, 9);
      ctx.lineTo(18 + 8 + 8 + 8, 9);
      ctx.lineTo(18 + 8 + 8 + 8 + 16, 36 + 6);
      ctx.lineTo(18 + 8 + 8 + 8 + 16, 36 + 6 + 8);
      ctx.lineTo(18 + 8 + 8, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill(); // 左藍翼

      ctx.fillStyle = globalColor.blue;
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4, 9);
      ctx.lineTo(-18 - 8 - 8 - 8 + 4, 9);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 + 4, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill(); // 右灰風口

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(18 + 8 + 8, 36 + 6 + 8);
      ctx.lineTo(18 + 8 + 8, 36 + 6 + 8 + 6);
      ctx.lineTo(18 + 8 + 8 + 16, 36 + 6 + 8 + 6);
      ctx.lineTo(18 + 8 + 8 + 16, 36 + 6 + 8);
      ctx.fill(); // 左灰風口

      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 + 4, 36 + 6 + 8 + 6);
      ctx.lineTo(-18 - 8 - 8 - 16 + 4, 36 + 6 + 8 + 6);
      ctx.lineTo(-18 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.fill(); // 右裝飾白圈

      ctx.strokeStyle = globalColor.white;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(18 + 8 + 8 + 11, 36 + 6 - 2, 4.4, 0, Math.PI * 2);
      ctx.stroke(); // 左裝飾黃叉

      ctx.strokeStyle = globalColor.orange; // ctx.lineWidth = 2.8;

      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4 - 3.2, 9 + 16);
      ctx.lineTo(-18 - 8 - 8 + 4 - 3.2 - 9.6, 9 + 16 + 9.6);
      ctx.moveTo(-18 - 8 - 8 + 4 - 3.2 - 9.6, 9 + 16);
      ctx.lineTo(-18 - 8 - 8 + 4 - 3.2, 9 + 16 + 9.6);
      ctx.stroke(); // 左裝飾透明四邊形

      ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 - 8 - 16 + 4 + 4, 36 + 6 - 8.25);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 - 6 + 4, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // 繪製 boss 子彈

      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
    }
  }, {
    key: "update",
    value: function update() {
      // boss 出現
      this.beginAppear && this.appear();
      this.beginAppear = false;

      if (!this.isAppearing && !this.isDisappeared) {} // 更新 boss 子彈


      this.bullets.forEach(function (bullet, idx, arr) {
        bullet.update(idx, arr);
      });
    }
  }, {
    key: "appear",
    value: function appear() {
      var _this = this;

      if (game.isEnd) return;
      this.appearTimes += 1;
      this.isDisappeared = false;
      this.isAppearing = true;
      gameCrawler.textContent = '⚠ BOSS IS COMING';
      TweenLite.to(this, 1.2, {
        scale: 1,
        ease: Expo.easeOut
      });
      var rotateNum = getRandom(45, 135);
      TweenLite.to(this, 1.6, {
        axisRotateAngle: "+=".concat(rotateNum),
        rotate: "+=".concat(rotateNum),
        ease: Expo.easeOut,
        onComplete: function onComplete() {
          _this.isAppearing = false;
        }
      });

      if (this.appearTimes && this.appearTimes % 2) {
        setTimeout(function () {
          if (_this.HP === 0 || game.isPause) return;

          _this.shoot();
        }, 2000);
      } else {
        setTimeout(function () {
          if (_this.HP === 0 || game.isPause) return;

          _this.generateEnemy();
        }, 2000);
      }

      this.disappearTimer = setTimeout(function () {
        if (_this.HP === 0 || game.isPause) return;

        _this.disappear();
      }, 4000);
      playSound('membrane', 'A4', '4n');
    }
  }, {
    key: "disappear",
    value: function disappear() {
      var _this2 = this;

      if (game.isEnd) return;
      this.isDisappeared = true;
      TweenLite.to(this, 1.2, {
        scale: 0,
        ease: Expo.easeOut
      });
      var rotateNum = getRandom(45, 135);
      TweenLite.to(this, 1.6, {
        axisRotateAngle: "+=".concat(rotateNum),
        rotate: "+=".concat(rotateNum),
        ease: Expo.easeOut
      });
      this.appearTimer = setTimeout(function () {
        if (_this2.HP === 0 || game.isPause) return;

        _this2.appear();
      }, 2000);
      playSound('membrane', 'F3', '4n');
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var _this3 = this;

      this.bullets.push(new BossBullet({
        p: {
          x: originPos(this.axisRotateR, this.axisRotateAngle).x,
          y: originPos(this.axisRotateR, this.axisRotateAngle).y
        },
        rotateAngle: this.rotate,
        axisRotateR: this.axisRotateR
      }));
      playSound('mono', 'F2', '4n', 0, -10);
      setTimeout(function () {
        _this3.bullets.push(new BossBullet({
          p: {
            x: originPos(_this3.axisRotateR, _this3.axisRotateAngle).x,
            y: originPos(_this3.axisRotateR, _this3.axisRotateAngle).y
          },
          rotateAngle: _this3.rotate,
          waveLength: 14,
          axisRotateR: _this3.axisRotateR
        }));

        playSound('mono', 'F2', '4n', 0, -10);
      }, 200);
    }
  }, {
    key: "generateEnemy",
    value: function generateEnemy() {
      var _this4 = this;

      var num;

      var chooseEnemy = function chooseEnemy() {
        num = getRandom(1, 3);

        switch (num) {
          case 1:
            game.circles.push(new Circle({
              axisRotateR: _this4.axisRotateR,
              axisRotateAngle: _this4.axisRotateAngle % 360,
              axisRotateAngleV: -(getRandom(2, 8) / 10),
              rotate: getRandom(0, 360),
              isBossGenerate: true
            }));
            break;

          case 2:
            game.triangles.push(new Triangle({
              axisRotateR: _this4.axisRotateR,
              axisRotateAngle: _this4.axisRotateAngle % 360,
              axisRotateAngleV: getRandom(2, 8) / 10,
              rotate: _this4.axisRotateAngle % 360,
              isBossGenerate: true
            }));
            break;

          case 3:
            var rotate = getRandom(0, 360);
            game.polygons.push(new Polygon({
              axisRotateR: {
                whole: _this4.axisRotateR,
                big: _this4.axisRotateR,
                small: _this4.axisRotateR
              },
              axisRotateAngle: {
                whole: _this4.axisRotateAngle % 360,
                big: _this4.axisRotateAngle % 360,
                small: _this4.axisRotateAngle % 360
              },
              rotate: {
                whole: rotate,
                big: rotate,
                small: rotate
              },
              rotateV: getRandom(4, 8) / 10,
              isBossGenerate: true
            }));
            break;

          default:
            break;
        }
      };

      chooseEnemy();

      if (Math.random() >= 0.5) {
        setTimeout(function () {
          chooseEnemy();
        }, 400);
      }
    }
  }]);

  return Boss;
}();

var BossBullet =
/*#__PURE__*/
function () {
  function BossBullet(args) {
    _classCallCheck(this, BossBullet);

    var def = {
      p: {
        x: 0,
        y: 0
      },
      axisRotateR: 0,
      color: globalColor.orange,
      moveX: 8,
      moveXV: 4,
      rotateAngle: 0,
      waveLength: 22,
      waveFreq: 0.3,
      waveAmp: 4,
      waveFlow: 3,
      isBoss: true
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(BossBullet, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.translate(this.p.x, this.p.y);
      ctx.rotate((this.rotateAngle - 90) * degToPi); // 開始畫 boss 子彈

      drawWaveBullet(this, 'moveX', 2.4, 'rgba(245, 175, 95, 0.72)');
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update(idx, arr) {
      // boss 子彈移動
      this.moveX += this.moveXV;
      enemyMethods.attackShooter(this, idx, arr);
    }
  }]);

  return BossBullet;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle =
/*#__PURE__*/
function () {
  function Circle(args) {
    _classCallCheck(this, Circle);

    var def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      r: 22,
      rotate: 0,
      scale: 0,
      axisRotateRV: 0,
      axisRotateAngleV: 0,
      // rotateV: 0,
      color: globalColor.orange,
      HP: 2,
      bullets: [],
      beforeRotateTime: new Date(),
      isRotating: false,
      beginAppear: true,
      isBossGenerate: false
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      var circleBigR = this.r + 5;
      var circleSmallR = this.r - 10;
      var subAxisRotateR = 14;
      ctx.save();
      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
      ctx.rotate(this.rotate * degToPi);
      ctx.scale(this.scale, this.scale); // 大淡圓

      ctx.beginPath();
      ctx.arc(4, 0, circleBigR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 175, 95, 0.21)';
      ctx.fill(); // 小淡圓

      ctx.beginPath();
      ctx.arc(-20, 0, circleSmallR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 175, 95, 0.21)';
      ctx.fill(); // 主體圓

      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill(); // 小三圓

      ctx.beginPath();
      ctx.fillStyle = globalColor.white; // ctx.arc(subAxisRotateR, 0, 2.4, 0, Math.PI * 2);

      ctx.arc(subAxisRotateR * Math.cos(60 * degToPi), subAxisRotateR * Math.sin(60 * degToPi), 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(subAxisRotateR * Math.cos(180 * degToPi), subAxisRotateR * Math.sin(180 * degToPi), 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(subAxisRotateR * Math.cos(300 * degToPi), subAxisRotateR * Math.sin(300 * degToPi), 2.4, 0, Math.PI * 2);
      ctx.fill(); // 神經

      ctx.beginPath();
      ctx.fillStyle = globalColor.white;
      ctx.lineTo(-8, 0);
      ctx.$triLineTo(-2, 32);
      ctx.$triLineTo(-12, 120);
      ctx.$triLineTo(-2.4, 176);
      ctx.$triLineTo(-8, 240);
      ctx.$triLineTo(-1.6, 320);
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // 繪製圓形子彈

      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
    }
  }, {
    key: "update",
    value: function update(idx) {
      var _this = this;

      this.beginAppear && this.appear(this.isBossGenerate);
      this.beginAppear = false;
      game.isStart && enemyMethods.approach(this); // 更新圓形子彈

      this.bullets.forEach(function (bullet, idx, arr) {
        bullet.update(idx, arr);
      }); // 當圓形自身在旋轉時，圓形不要移動

      if (!this.isRotating) {
        this.axisRotateAngle += this.axisRotateAngleV;
      } // 每 4-8 秒，自身旋轉一次


      var rotateTime = new Date();

      if (rotateTime - this.beforeRotateTime > getRandom(4000, 8000)) {
        this.isRotating = true;
        TweenLite.to(this, 0.4, {
          // rotate: this.axisRotateAngle - 180,
          // rotate: this.axisRotateAngle % 360,
          rotate: this.axisRotateAngle,
          ease: Power2.easeOut,
          // 自身旋轉完後射擊
          onComplete: function onComplete() {
            _this.isRotating = false;
            if (!game.isStart) return;

            _this.shoot();
          }
        });
        this.beforeRotateTime = rotateTime;
      } // 當圓形撞上 shooter


      enemyMethods.hitShooter(game.circles, idx, 'circle', this.axisRotateR, this.axisRotateAngle);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var _this2 = this;

      var _loop = function _loop(i) {
        var timer = setTimeout(function () {
          _this2.bullets.push(new CirBullet({
            p: {
              x: originPos(_this2.axisRotateR, _this2.axisRotateAngle).x,
              y: originPos(_this2.axisRotateR, _this2.axisRotateAngle).y
            },
            rotateAngle: _this2.rotate,
            moveX: -_this2.r - 10,
            // rotateAngle: Math.sin(this.rotate * degToPi),
            axisRotateR: _this2.axisRotateR
          }));

          clearTimeout(timer); // 間隔 0.2-0.4 秒
        }, i * getRandom(200, 400));
      };

      // 射 1-2 發
      for (var i = 0; i < getRandom(1, 2); i += 1) {
        _loop(i);
      }

      gameCrawler.textContent = Math.random() >= 0.8 ? 'UNDER ATTACK🤕' : 'ATTACK⚡️';
      playSound('membrane', 'D5');
    }
  }, {
    key: "appear",
    value: function appear(isBossGenerate) {
      gameCrawler.textContent = '⚠ ENEMY IS COMING'; // gameCrawler.innerHTML = '<i class="fas fa-exclamation-triangle"></i>ENEMY IS COMING!';

      TweenLite.to(this, 0.8, {
        scale: 1,
        ease: Back.easeOut.config(1.7)
      });
      TweenLite.from(this, 1.6, {
        rotate: 0,
        ease: Back.easeOut.config(1.7)
      });

      if (isBossGenerate) {
        TweenLite.to(this, 1.6, {
          axisRotateR: "+=".concat(getRandom(80, 160)),
          ease: Power2.easeOut
        });
      }

      game.isStart && playSound('synth', 'F4', '4n'); // playSound('synth', 'B4', '8n', 50);
    }
  }]);

  return Circle;
}();

var CirBullet =
/*#__PURE__*/
function () {
  function CirBullet(args) {
    _classCallCheck(this, CirBullet);

    var def = {
      p: {
        x: 0,
        y: 0
      },
      axisRotateR: 0,
      color: globalColor.orange,
      moveX: 0,
      moveXV: -4,
      // v: 4,
      rotateAngle: 0
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(CirBullet, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.translate(this.p.x, this.p.y);
      ctx.rotate(this.rotateAngle * degToPi);
      ctx.beginPath();
      ctx.arc(this.moveX, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update(idx, arr) {
      // 圓形子彈移動
      this.moveX += this.moveXV; // 子彈擊中 shooter

      enemyMethods.attackShooter(this, idx, arr);
    }
  }]);

  return CirBullet;
}();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* 
 ** 敵人方法
 */
var enemyMethods = {
  // 逼近 shooter
  approach: function approach(enemy) {
    var axisRotateR = enemy.axisRotateR;
    var isPolygon = _typeof(axisRotateR) === 'object';

    if (!enemy.axisRotateRV) {
      var shooter = game.shooter;
      var shooterBody = shooter.r + shooter.cirSolidLineW / 2;
      var distance = (isPolygon ? axisRotateR.whole : axisRotateR - enemy.r) - shooterBody;
      var seconds = getRandom(30, 40);
      enemy.axisRotateRV = -(distance / (seconds * updateFPS));
    }

    if (isPolygon) {
      if (enemy.HP.whole) {
        axisRotateR.small = axisRotateR.big = axisRotateR.whole += enemy.axisRotateRV;
      } else {
        // 重物引力較強
        axisRotateR.big += enemy.axisRotateRV * getRandom(3, 4); // 輕物引力較弱

        axisRotateR.small += enemy.axisRotateRV * getRandom(1, 4);
      }
    } else {
      enemy.axisRotateR += enemy.axisRotateRV;
    }
  },
  // 死亡效果
  dieEffect: function dieEffect(enemyR, effectX, effectY, colorRGB) {
    var isBoss = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var dieTime = 1;

    var effect = function effect() {
      if (!game.isPause) {
        dieTime += 1;
      }

      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = "rgba(".concat(colorRGB, ", ").concat((48 - dieTime) / 46, ")");
      ctx.fillStyle = "rgba(".concat(colorRGB, ", ").concat((48 - dieTime) / 230, ")");
      ctx.shadowColor = "rgba(".concat(colorRGB, ", 0.48)");
      ctx.shadowBlur = 2;
      ctx.lineWidth = 2;
      var effectR = enemyR * baseLog(3, (dieTime - 2) / 46 * 8 + 1);
      ctx.arc(effectX, effectY, effectR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore(); // }

      if (dieTime < 48) {
        requestAnimationFrame(effect);
      }
    };

    requestAnimationFrame(effect);

    if (!isBoss) {
      setTimeout(function () {
        gameCrawler.textContent = 'ENEMY DIES😇';
      }, 0);
    } // playSound('duo', 'F4', '4n');


    playSound('synth', 'G2', '8n', 0, 25);
    playSound('duo', 'F2', '4n', 0, 15);
    playSound('duo', 'E2', '4n', 0, 10);
  },
  // 敵人撞擊 shooter 判定
  hitShooter: function hitShooter(enemies, enemyIdx, type, enemyAxisRotateR, enemyAxisRotateAngle) {
    var enemy = enemies[enemyIdx];
    var shooter = game.shooter;
    var shieldAngleRange;

    if (shooter.state !== 'shield') {
      shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= 135 * degToPi && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= 225 * degToPi;
    } else {
      shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= 90 * degToPi && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= 270 * degToPi;
    } // const shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= (135 * degToPi) && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= (225 * degToPi);
    // 判斷是多邊形或其它敵人撞上 shooter


    var judgeWhatEnemyHit = function judgeWhatEnemyHit() {
      if (type !== 'big' && type !== 'small') {
        enemies.splice(enemyIdx, 1); // 移除敵人效果

        if (type !== 'whole') {
          var colorRGB = type === 'circle' ? '245, 175, 95' : '54, 118, 187';
          enemyMethods.dieEffect(enemy.r, originPos(enemyAxisRotateR, enemyAxisRotateAngle).x, originPos(enemyAxisRotateR, enemyAxisRotateAngle).y, colorRGB);
        } else {
          var polygonR = (34 + 22) / 2;
          enemyMethods.dieEffect(polygonR, enemy.originPos(type).x, enemy.originPos(type).y, '231, 70, 93');
        }
      } else {
        enemy.HP[type] -= 1;

        var _polygonR = type === 'big' ? (34 + 22) / 2 : (23 + 21) / 2;

        enemyMethods.dieEffect(_polygonR, enemy.originPos(type).x, enemy.originPos(type).y, '231, 70, 93');

        if (enemy.HP.big === 0 && enemy.HP.small === 0) {
          enemies.splice(enemyIdx, 1);
        }
      }
    }; // 當敵人撞上 shooter 主體


    if (enemyAxisRotateR <= shooter.r + shooter.cirSolidLineW / 2) {
      // shooter.HP -= 1;
      judgeWhatEnemyHit();
      enemyMethods.attackShooterResult();
      playSound('membrane', 'B4'); // 當敵人撞上 shooter 護盾
    } else if (shieldAngleRange && enemyAxisRotateR <= shooter.shieldR + shooter.shieldLineW / 2) {
      judgeWhatEnemyHit();
      shooter.isProtect = true;
      gameCrawler.textContent = 'BLOCK😉';
      playSound('membrane', 'D4');
    }
  },
  // 敵人子彈擊中 shooter 判定
  attackShooter: function attackShooter(bullet, bulletIdx, bullets) {
    var bulletLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var shooter = game.shooter;
    var shooterBody = shooter.r + shooter.cirSolidLineW / 2;
    var shooterShield = shooter.shieldR + shooter.shieldLineW / 2; // 當敵人子彈擊中 shooter 主體

    if (Math.abs(bullet.moveX) >= bullet.axisRotateR - (shooterBody + bulletLen)) {
      // 子彈擊中後
      enemyMethods.attackShooterResult(); // 移除敵人子彈

      bullets.splice(bulletIdx, 1);
      bullet.isBoss ? playSound('mono', 'C2', '8n', 0, -10) : playSound('membrane', 'B4');
    } // 當敵人子彈射中 shooter 的護盾


    var bulletRotate = bullet.isBoss ? bullet.rotateAngle + 90 : bullet.rotateAngle;
    var angleGap = Math.abs(mouseMoveAngle / degToPi - (bulletRotate % 360 + (bulletRotate < 0 ? 360 : 0)));
    var shieldAngleRange;

    if (shooter.state !== 'shield') {
      shieldAngleRange = angleGap >= 135 && angleGap <= 225;
    } else {
      shieldAngleRange = angleGap >= 90 && angleGap <= 270;
    }

    if (shieldAngleRange && Math.abs(bullet.moveX) >= bullet.axisRotateR - (shooterShield + bulletLen)) {
      // 移除子彈
      bullets.splice(bulletIdx, 1);
      gameCrawler.textContent = 'BLOCK😉';
      playSound('membrane', 'D4');
    }
  },
  // 敵人撞擊或子彈擊中 shooter 後
  attackShooterResult: function attackShooterResult() {
    if (!game.isStart || game.currentLevel === 10 && !game.boss) return;
    var shooter = game.shooter;
    var shooterHPBarOriginW = 216; // 命條減 1/3

    var shooterHPBarW = shooterHPBar.offsetWidth - shooterHPBarOriginW / 3;
    shooter.isAttacked = true; // shooter 命減 1
    // shooter.HP -= 1;

    shooterHPBar.style.width = "".concat(shooterHPBarW < 0 ? 0 : shooterHPBarW, "px"); // 若 shooter 已經沒有命條

    if (shooterHPBarW <= 0) {
      // 若 shooter 還有愛心
      if (shooter.hearts) {
        // 減掉一顆愛心
        var shooterHeart = document.querySelectorAll('.panel__game-heart');
        shooterHeart[0].parentNode.removeChild(shooterHeart[0]);
        shooter.hearts -= 1; // 回復命條

        shooterHPBar.style.width = "".concat(shooterHPBarOriginW, "px");
      } else {
        // 如果沒有愛心，結束遊戲
        game.endGame();
        playSound('synth', 'A3');
        playSound('synth', 'E2', '8n', 160);
        playSound('synth', 'A2', '8n', 320);
        clearTimeout(game.crawlerClearedTimer);
        gameCrawler.textContent = "YOU, ".concat(this.playerName, "\uD83D\uDC80, ARE DEAD");
        return;
      }
    }

    gameCrawler.textContent = Math.random() >= 0.5 ? 'OUCH😣' : 'UGGH😫';
  },
  bossDieResult: function bossDieResult() {
    var boss = game.boss;
    enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '245, 175, 95', true);
    setTimeout(function () {
      enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '54, 118, 187', true);
    }, 300);
    setTimeout(function () {
      enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '231, 70, 93', true);
    }, 600);
    game.boss = null; // 改變背景音樂

    bgm.pause();
    bgm.currentTime = 0;
    victoryBgm.play();
    victoryBgm.volume = 0.5; // 3 秒後，結束遊戲

    setTimeout(function () {
      game.endGame();
    }, 3000);
    clearTimeout(game.crawlerClearedTimer);
    gameCrawler.textContent = 'BOSS DIES!!!🎊';
  }
};
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Environment Variable */
var updateFPS = 30;
var updateTime = 0;
var globalColor = {
  red: '#e7465d',
  orange: '#f5af5f',
  yellow: '#f7b52c',
  blue: '#3676bb',
  blueDark: '#001d2e',
  white: '#fff'
};
var props = ['heart', 'crackdown', 'shield', 'double', 'wave'];
/* GUI Controls */
// const controls = {
// amp: 8,
// freq: 0.3,
// testAngle: 40,
// }
// const gui = new dat.GUI();
// gui.add(controls, 'testAngle', 0, 90).step(1).onChange((value) => {});
// gui.add(controls, 'freq', 0, 1).step(0.1).onChange((value) => {});

var startBtn = document.getElementById('start-btn');
var restartBtn = document.getElementById('restart-btn');
var starsBtn = document.getElementById('stars-btn');
var backBtn = document.getElementById('back-btn');
var restartBtnStars = document.getElementById('restart-btn--stars');
var cover = document.getElementById('cover');
var gamePanel = document.getElementById('game-panel');
var batteryInfo = document.getElementById('battery-info');
var shooterHPBar = document.getElementById('hp');
var heartWrapper = document.getElementById('heart-wrapper');
var prop = document.getElementById('prop');
var propImg = document.getElementById('prop__img');
var propLastTime = document.getElementById('prop__last-time');
var batteryNum = document.getElementById('battery-num');
var result = document.getElementById('game-result'); // const resultNum = document.getElementById('result-num');

var panel = document.getElementById('panel');
var container = document.getElementById('container');
var keyboard = document.getElementById('keyboard');
var gameTime = document.getElementById('game-time');
var gameLevel = document.getElementById('game-level');
var gameCrawler = document.getElementById('game-crawler');
var playerName = document.getElementById('player-name');
var resultBoss = document.getElementById('result-boss');
var resultBattery = document.getElementById('result-battery');
var resultBullet = document.getElementById('result-bullet'); // const totalPlayers = document.getElementById('total-players');

var rankingNum = document.getElementById('ranking-num');
var resultRanking = document.getElementById('result-ranking');
var resultScore = document.getElementById('result-score');
var resultStars = document.getElementById('result-stars'); // const share = document.getElementById('share');

var bgm = document.getElementById('bgm');
var victoryBgm = document.getElementById('victory-bgm');
var starWrapper1 = document.getElementById('star-wrapper1');
var starWrapper2 = document.getElementById('star-wrapper2');
var starWrapper3 = document.getElementById('star-wrapper3');
var shareFb = document.getElementById('share-fb');
var shareTwitter = document.getElementById('share-twitter');
/* Initialize Canvas Settings */

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var ww;
var wh;
var gameW;
var gameH;
var gameHalfDiagonalL;

function initCanvas() {
  gameW = canvas.width;
  gameH = canvas.height;
  gameHalfDiagonalL = Math.round(Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2);
  ww = document.documentElement.clientWidth;
  wh = document.documentElement.clientHeight;
}

var degToPi = Math.PI / 180;
var coverCircle;
var coverTriangle;
var coverPolygon;
var game;

var Game =
/*#__PURE__*/
function () {
  function Game(args) {
    _classCallCheck(this, Game);

    var def = {
      shooter: null,
      prop: null,
      batteryNum: 0,
      circles: [],
      triangles: [],
      polygons: [],
      subTris: [],
      isStart: false,
      isEnd: false,
      isPause: false,
      blockV: {
        x: -2,
        y: 2
      },
      currentLevel: 0,
      countdownSeconds: 0,
      // countupSeconds: 0,
      hpRecoverTimer: null,
      countdownTimer: null,
      countupTimer: null,
      propGeneratedTimer: null,
      crawlerClearedTimer: null,
      propGeneratedInterval: 200,
      boss: null,
      playerName: '',
      beatBossSeconds: 0,
      isMuted: false,
      isDisplayStars: false
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      var _this = this;

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleClick);
      window.addEventListener('keyup', handleKeyup);
      handlePlayerName();
      startBtn.addEventListener('click', function () {
        if (!_this.checkPlayerName()) return;

        _this.startGame();
      });
      restartBtn.addEventListener('click', function () {
        _this.startGame();
      });
      restartBtnStars.addEventListener('click', function () {
        _this.startGame();
      });
      this.drawCover();
      this.render();
      this.update(); // 初始化方格移動速率與計時器

      this.setBlockV(); // 緩慢恢復 shooter 生命條

      this.recoverShooterHPBar();
      starsBtn.addEventListener('click', function () {
        resultRanking.classList.add('dpn');
        resultScore.classList.add('dpn');
        resultStars.classList.remove('dpn');
        result.classList.add('t20');

        if (!_this.isDisplayStars) {
          _this.handleGameStars();
        }

        _this.isDisplayStars = true;
      });
      backBtn.addEventListener('click', function () {
        resultRanking.classList.remove('dpn');
        resultScore.classList.remove('dpn');
        resultStars.classList.add('dpn');
        result.classList.remove('t20');
      });
      shareFb.addEventListener('click', function () {
        window.open('https://www.facebook.com/sharer/sharer.php?u=https://yeefun.github.io/radio-defense', '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
      });
      shareTwitter.addEventListener('click', function () {
        // 參考 https://gist.github.com/McKinneyDigital/2884508
        var url = 'https://yeefun.github.io/radio-defense';
        var name = 'szyeefun';
        window.open("http://twitter.com/share?url=".concat(encodeURIComponent(url), "&via=").concat(encodeURIComponent(name)), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // if (!this.isPause) {
      ctx.fillStyle = globalColor.blueDark;
      ctx.fillRect(0, 0, gameW, gameH); // 繪製方格

      this.drawBlock();

      if (!this.isStart && !this.isEnd) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(gameW / 2, gameH / 2, 264, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(gameW / 2, gameH / 2, 184, 0, Math.PI * 2);
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = globalColor.white;
        ctx.stroke();
        ctx.restore();
      } // 繪製 shooter


      this.shooter.draw(); // 繪製每個 circle

      this.circles.forEach(function (circle) {
        circle.draw();
      }); // 繪製每個 triangle

      this.triangles.forEach(function (triangle) {
        triangle.draw();
      }); // 繪製每個 polygon

      this.polygons.forEach(function (polygon) {
        polygon.draw();
      }); // 繪製每個 sub triangle

      this.subTris.forEach(function (subTriangle) {
        subTriangle.draw();
      }); // 繪製 prop（道具）

      this.prop && this.prop.draw(); // 繪製魔王

      this.boss && this.boss.draw();

      if (this.isStart) {
        // 繪製滑鼠
        this.drawMouse();
      }

      requestAnimationFrame(function () {
        _this2.render();
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      updateTime += 1;

      if (!this.isPause && !this.isEnd) {
        // 更新 shooter
        this.shooter.update(); // 更新每個 circle

        this.circles.forEach(function (circle, idx) {
          circle.update(idx);
        }); // 更新每個 triangle

        this.triangles.forEach(function (triangle, idx) {
          triangle.update(idx);
        }); // 更新每個 polygon

        this.polygons.forEach(function (polygon, idx) {
          polygon.update(idx);
        }); // 更新每個 sub triangle

        this.subTris.forEach(function (subTriangle, idx) {
          subTriangle.update(idx);
        }); // 更新 prop（道具）

        this.prop && this.prop.update(); // 更新魔王

        this.boss && this.boss.update();
      }

      setTimeout(function () {
        _this3.update();
      }, 1000 / updateFPS);
    } // 設置封面

  }, {
    key: "drawCover",
    value: function drawCover() {
      this.shooter = new Shooter(); // 圓形

      this.circles.push(new Circle({
        axisRotateR: getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5),
        axisRotateAngle: 225,
        axisRotateAngleV: -(getRandom(2, 8) / 10),
        rotate: getRandom(0, 360)
      })); // 三角形

      this.triangles.push(new Triangle({
        axisRotateR: getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5),
        axisRotateAngle: 45,
        axisRotateAngleV: getRandom(2, 8) / 10,
        rotate: 45
      })); // 多邊形

      var rotateR = getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5);
      var rotate = getRandom(0, 360);
      var rotateV = getRandom(4, 8) / 10;
      this.polygons.push(new Polygon({
        axisRotateR: {
          whole: rotateR,
          big: rotateR,
          small: rotateR
        },
        axisRotateAngle: {
          whole: 315,
          big: 315,
          small: 315
        },
        rotate: {
          whole: rotate,
          big: rotate,
          small: rotate
        },
        rotateV: rotateV
      }));
    } // 畫方格

  }, {
    key: "drawBlock",
    value: function drawBlock() {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 0.4; // 畫橫列

      for (var i = 0; i < 18; i += 1) {
        ctx.moveTo(i * 56 + updateTime * this.blockV.x % 56, 0);
        ctx.lineTo(i * 56 + updateTime * this.blockV.x % 56, gameH);
      } // 畫直行


      for (var _i = 0; _i < 14; _i += 1) {
        ctx.moveTo(0, _i * 52 + updateTime * this.blockV.y % 52);
        ctx.lineTo(gameW, _i * 52 + updateTime * this.blockV.y % 52);
      }

      ctx.stroke();
      ctx.restore();
    } // 畫滑鼠

  }, {
    key: "drawMouse",
    value: function drawMouse() {
      var mouseMovePosX = mouseMovePos.x + gameW / 2;
      var mouseMovePosY = mouseMovePos.y + gameH / 2;
      var length = 12;
      ctx.save();
      ctx.translate(mouseMovePosX, mouseMovePosY);
      ctx.strokeStyle = globalColor.white;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-length, 0);
      ctx.lineTo(length, 0);
      ctx.moveTo(0, -length);
      ctx.lineTo(0, length);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.arc(mouseMovePosX, mouseMovePosY, 1.6, 0, Math.PI * 2);
      ctx.fill();
    } // 設定方格移動速率

  }, {
    key: "setBlockV",
    value: function setBlockV() {
      var _this4 = this;

      setTimeout(function () {
        _this4.blockV.x = Math.random() * 8 - 4;
        _this4.blockV.y = Math.random() * 8 - 4;

        _this4.setBlockV();
      }, 8000);
    } // 開始遊戲（當讀者按下 'Start Play' or 'Restart' 按鈕）

  }, {
    key: "startGame",
    value: function startGame() {
      var _this5 = this;

      this.isStart = true;
      this.isEnd = false; // 移除封面

      cover.style.display = 'none'; // 顯示遊戲介面

      gamePanel.style.display = 'block'; // 電池資訊歸零

      this.batteryNum = 0;
      batteryNum.textContent = this.batteryNum; // 重設生命條

      shooterHPBar.style.width = '216px'; // 取得玩家名

      this.playerName = playerName.value; // 初始化 shooter

      this.shooter = new Shooter(); // 三個愛心命

      heartWrapper.innerHTML = '';

      for (var i = 0; i < this.shooter.hearts; i++) {
        var heart = document.createElement('DIV');
        heart.classList.add('panel__game-heart');
        heartWrapper.appendChild(heart);
      } // 清空敵人與子彈


      this.circles.forEach(function (circle) {
        circle.bullets = [];
      });
      this.triangles.forEach(function (triangle) {
        triangle.bullets = [];
        triangle.HP = 0;
      });
      this.circles = [];
      this.triangles = [];
      this.polygons = [];

      if (this.boss) {
        this.boss.bullets = [];
        this.boss = null;
      } // 隱藏預設滑鼠


      container.style.cursor = 'none'; // 隱藏結果

      result.classList.add('op0'); // 讓滑鼠點擊無效

      panel.style.pointerEvents = 'none'; // 顯示獲得電池資訊

      batteryInfo.classList.remove('op0'); // 顯示鍵盤指示

      keyboard.classList.remove('op0'); // 清空關卡字

      gameLevel.textContent = ''; // 回到第 0 關

      this.currentLevel = 0; // 倒數計時 2 秒

      this.countdownSeconds = 3;
      gameCrawler.textContent = "\uD83D\uDC4B".concat(this.playerName, "\uD83D\uDC4B");
      gameTime.textContent = "00:0".concat(this.countdownSeconds, "\u201D");

      var countdownStartTime = function countdownStartTime() {
        setTimeout(function () {
          if (_this5.countdownSeconds === 0) {
            _this5.currentLevel += 1;

            _this5.setLevel(_this5.currentLevel); // 開始產生道具


            _this5.generateProp(); // 開始清除跑馬燈


            _this5.clearCrawler();

            return;
          }

          _this5.countdownSeconds -= 1;
          gameTime.textContent = "00:0".concat(_this5.countdownSeconds, "\u201D");

          switch (_this5.countdownSeconds) {
            case 2:
              gameCrawler.textContent = '🌊WAVES ARE COMING🌊';
              break;

            case 1:
              gameCrawler.textContent = '😈ARE YOU READY?😈';
              break;

            case 0:
              gameCrawler.textContent = '🔥🔥GO🔥🔥';
              break;

            default:
              break;
          }

          playSound('synth', 'G4');
          countdownStartTime();
        }, 1000);
      };

      countdownStartTime();
      playSound('synth', 'C#5');
      playSound('synth', 'E5', '8n', 160); // 改變背景音樂

      victoryBgm.pause();
      victoryBgm.currentTime = 0;
      bgm.play();
      bgm.volume = 0.5; // 遊戲結果返回第一頁

      resultRanking.classList.remove('dpn');
      resultScore.classList.remove('dpn');
      resultStars.classList.add('dpn');
      result.classList.remove('t20'); // 將遊戲結果換成 loading 圖示

      var loadingIcon = '<img src="./img/loading.svg" alt="loading icon" />';
      rankingNum.innerHTML = loadingIcon;
      starWrapper1.innerHTML = loadingIcon;
      starWrapper2.innerHTML = loadingIcon;
      starWrapper3.innerHTML = loadingIcon; // 開啟讓 stars 重新取資料的開關

      this.isDisplayStars = false;
    } // 遊戲結束

  }, {
    key: "endGame",
    value: function endGame() {
      this.isStart = false;
      this.isEnd = true; // 貼上電池數量
      // resultNum.textContent = this.batteryNum;
      // 填上結果

      if (this.currentLevel !== 10) {
        resultBoss.textContent = 'NO';
      } else {
        resultBoss.textContent = this.beatBossSeconds;
      }

      resultBattery.textContent = this.batteryNum;
      resultBullet.textContent = this.shooter.bulletNum; // 顯示結果

      result.classList.remove('op0'); // 隱藏電池分數資訊

      batteryInfo.classList.add('op0'); // 隱藏鍵盤指示

      keyboard.classList.add('op0'); // 移除道具顯示介面

      prop.classList.add('op0'); // 顯示預設滑鼠

      container.style.cursor = 'auto'; // 讓滑鼠可以點擊

      panel.style.pointerEvents = 'auto';
      this.handleGameResult();
      clearTimeout(this.countdownTimer);
      clearTimeout(this.countupTimer);
      clearTimeout(this.propGeneratedTimer);
    } // 暫停遊戲

  }, {
    key: "pauseGame",
    value: function pauseGame() {
      if (!this.currentLevel) return;
      this.isPause = !this.isPause;

      if (this.isPause) {
        clearTimeout(this.countdownTimer);
        clearTimeout(this.countupTimer);
        clearTimeout(this.propGeneratedTimer);
        clearTimeout(this.crawlerClearedTimer);
      } else {
        if (!this.boss) {
          this.countdownTime();
        } else {
          this.countupTime();
        }

        this.generateProp();
        this.clearCrawler();
        var boss = game.boss;

        if (boss.isDisappeared) {
          clearTimeout(boss.appearTimer);
          boss.appear();
        } else {
          clearTimeout(boss.disappearTimer);
          boss.disappear();
        }
      }
    }
  }, {
    key: "handleGameResult",
    value: function handleGameResult() {
      var name = this.playerName;
      var level = this.currentLevel;
      var battery = this.batteryNum;
      var bullet = this.shooter.bulletNum;
      var boss;

      if (level !== 9) {
        boss = 'no';
      } else {
        boss = this.beatBossSeconds;
      }

      axios.get('https://script.google.com/a/g.ntu.edu.tw/macros/s/AKfycbwwNUeevxFlQaLzP_gdhnTmSC97HgRlpV6DOCUIzg/dev', {
        params: {
          name: name,
          level: level,
          battery: battery,
          bullet: bullet,
          boss: boss
        }
      }).then(function (res) {
        var data = res.data;
        rankingNum.innerHTML = "\n        <p>".concat(data.rank, "</p>\n        <span>/&nbsp;").concat(data.totalPlayers, "</span>\n      ");
      });
    }
  }, {
    key: "handleGameStars",
    value: function handleGameStars() {
      axios.get('https://script.google.com/a/g.ntu.edu.tw/macros/s/AKfycbx1L2GmotaRfoSMzVA5BtpC9kiWneoA69IOtoEi/dev').then(function (res) {
        var data = res.data;
        var firstStarData = data.firstData;
        var secondStarData = data.secondData;
        var thirdStarData = data.thirdData;
        var starScoreHTML = '';

        function fillStarScore(name, wave, bat, bullet, boss) {
          starScoreHTML = "\n            <div class=\"star__name\">".concat(name, "</div>\n            <div class=\"star__scores\">\n              <div class=\"star__score\">\n                <div class=\"star__num\">").concat(wave, "</div>\n                <div class=\"star__text\">WAVES</div>\n              </div>\n              <div class=\"star__score\">\n                <div class=\"star__num\">").concat(bat, "</div>\n                <div class=\"star__text\">BATTERIES</div>\n              </div>\n              <div class=\"star__score\">\n                <div class=\"star__num\">").concat(bullet, "</div>\n                <div class=\"star__text\">BULLETS</div>\n              </div>\n              <div class=\"star__score\">\n                <div class=\"star__num\">").concat(boss, "</div>\n                <div class=\"star__text\">BOSS</div>\n              </div>\n            </div>\n          ");
        }

        fillStarScore.apply(void 0, _toConsumableArray(firstStarData));
        starWrapper1.innerHTML = starScoreHTML;
        fillStarScore.apply(void 0, _toConsumableArray(secondStarData));
        starWrapper2.innerHTML = starScoreHTML;
        fillStarScore.apply(void 0, _toConsumableArray(thirdStarData));
        starWrapper3.innerHTML = starScoreHTML;
      });
    } // 產生道具

  }, {
    key: "generateProp",
    value: function generateProp() {
      var _this6 = this;

      // 如果已有道具，便停止計時
      if (this.prop) return;
      this.propGeneratedTimer = setTimeout(function () {
        _this6.propGeneratedInterval -= 1; // 20 秒過後

        if (_this6.propGeneratedInterval === 0) {
          var propName; // 如果大於 5 顆心，便排除愛心

          if (_this6.shooter.hearts < 5) {
            propName = props[getRandom(0, 4)];
          } else {
            propName = props[getRandom(1, 4)];
          }

          _this6.prop = new Prop({
            src: "../img/".concat(propName, ".svg"),
            axisRotateR: gameHalfDiagonalL,
            axisRotateAngle: getRandom(0, 360)
          }); // 每 20 (200 * 100) 秒產生一個道具

          _this6.propGeneratedInterval = 200;
        }

        _this6.generateProp();
      }, 100);
    } // 倒數遊戲時間

  }, {
    key: "countdownTime",
    value: function countdownTime() {
      var _this7 = this;

      this.countdownTimer = setTimeout(function () {
        if (_this7.countdownSeconds === 0) {
          _this7.currentLevel += 1;

          _this7.setLevel(_this7.currentLevel);

          return;
        }

        _this7.countdownSeconds -= 1;
        gameTime.textContent = "00:".concat(_this7.countdownSeconds < 10 ? "0".concat(_this7.countdownSeconds) : _this7.countdownSeconds, "\u201D");

        _this7.countdownTime();
      }, 1000);
    }
  }, {
    key: "countupTime",
    value: function countupTime() {
      var _this8 = this;

      this.countupTimer = setTimeout(function () {
        _this8.beatBossSeconds += 1;
        gameTime.textContent = "00:".concat(_this8.beatBossSeconds < 10 ? "0".concat(_this8.beatBossSeconds) : _this8.beatBossSeconds, "\u201D");

        _this8.countupTime();
      }, 1000);
    } // 自動恢復 shooter 生命條

  }, {
    key: "recoverShooterHPBar",
    value: function recoverShooterHPBar() {
      var _this9 = this;

      this.hpRecoverTimer = setTimeout(function () {
        if (_this9.isPause || !_this9.isStart) {
          _this9.recoverShooterHPBar();

          return;
        }

        var nowHPW = shooterHPBar.offsetWidth;

        if (nowHPW < 216) {
          var recoverHPBarW = nowHPW + 1;
          shooterHPBar.style.width = "".concat(recoverHPBarW, "px");
        }

        _this9.recoverShooterHPBar();
      }, 300);
    } // 每 3 秒清除一次跑馬燈

  }, {
    key: "clearCrawler",
    value: function clearCrawler() {
      var _this10 = this;

      gameCrawler.textContent = ''; // CONFUSED 為什麼這樣寫不行？（只會觸發兩次）
      // setTimeout(this.clearCrawler, 3000);

      this.crawlerClearedTimer = setTimeout(function () {
        _this10.clearCrawler();
      }, 3000);
    } // 設定敵人出場

  }, {
    key: "setEnemy",
    value: function setEnemy(form) {
      var _this11 = this;

      var seconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      setTimeout(function () {
        switch (form) {
          case 'circle':
            {
              _this11.circles.push(new Circle({
                axisRotateR: getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL),
                axisRotateAngle: getRandom(0, 360),
                axisRotateAngleV: -(getRandom(2, 8) / 10),
                rotate: getRandom(0, 360)
              }));

              break;
            }

          case 'triangle':
            {
              // axisRotateAngle 與 rotate 必須相同
              var angle = getRandom(0, 360);

              _this11.triangles.push(new Triangle({
                axisRotateR: getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL),
                axisRotateAngle: angle,
                axisRotateAngleV: getRandom(2, 8) / 10,
                rotate: angle
              }));

              break;
            }

          case 'polygon':
            {
              var rotateR = getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL / 1.5);
              var rotateAngle = getRandom(0, 360);
              var rotate = getRandom(0, 360);

              _this11.polygons.push(new Polygon({
                axisRotateR: {
                  whole: rotateR,
                  big: rotateR,
                  small: rotateR
                },
                axisRotateAngle: {
                  whole: rotateAngle,
                  big: rotateAngle,
                  small: rotateAngle
                },
                rotate: {
                  whole: rotate,
                  big: rotate,
                  small: rotate
                },
                rotateV: getRandom(4, 8) / 10
              }));

              break;
            }

          default:
            break;
        }
      }, seconds * 1000);
    } // 初始化關卡

  }, {
    key: "initLevel",
    value: function initLevel(level, seconds) {
      gameLevel.textContent = "Wave ".concat(level);
      this.countdownSeconds = seconds;
      gameTime.textContent = "00:".concat(this.countdownSeconds, "\u201D");
      this.countdownTime();
    } // 設定關卡

  }, {
    key: "setLevel",
    value: function setLevel(level) {
      switch (level) {
        case 1:
          this.initLevel('01', 10); // const rotateNum = 360;
          // this.boss = new Boss({
          //   axisRotateR: getRandom(gameH / 3, gameH / 2.5),
          //   axisRotateAngle: rotateNum,
          //   rotate: rotateNum - 90,
          // });
          // 設定敵人出場

          this.setEnemy('circle', 2);
          this.setEnemy('triangle', 0);
          this.setEnemy('polygon', 0);
          break;

        case 2:
          this.initLevel('02', 20);
          this.setEnemy('triangle', 2);
          this.setEnemy('polygon', 10);
          break;

        case 3:
          this.initLevel('03', 20);
          this.setEnemy('polygon', 2);
          this.setEnemy('circle', 5);
          this.setEnemy('polygon', 10);
          break;

        case 4:
          this.initLevel('04', 30);
          this.setEnemy('circle', 2);
          this.setEnemy('triangle', 2);
          this.setEnemy('polygon', 10);
          this.setEnemy('triangle', 15);
          this.setEnemy('polygon', 20);
          break;

        case 5:
          this.initLevel('05', 30);
          this.setEnemy('circle', 2);
          this.setEnemy('circle', 2);
          this.setEnemy('circle', 5);
          this.setEnemy('polygon', 15);
          this.setEnemy('triangle', 20);
          break;

        case 6:
          this.initLevel('06', 40);
          this.setEnemy('triangle', 2);
          this.setEnemy('triangle', 5);
          this.setEnemy('circle', 15);
          this.setEnemy('circle', 25);
          this.setEnemy('polygon', 25);
          break;

        case 7:
          this.initLevel('07', 60);
          this.setEnemy('circle', 2);
          this.setEnemy('triangle', 2);
          this.setEnemy('circle', 10);
          this.setEnemy('triangle', 10);
          this.setEnemy('polygon', 15);
          this.setEnemy('polygon', 20);
          this.setEnemy('triangle', 25);
          this.setEnemy('polygon', 25);
          this.setEnemy('polygon', 35);
          this.setEnemy('triangle', 35);
          this.setEnemy('polygon', 40);
          this.setEnemy('circle', 45);
          this.setEnemy('circle', 50);
          break;

        case 8:
          this.initLevel('08', 60);
          this.setEnemy('circle', 5);
          this.setEnemy('triangle', 10);
          this.setEnemy('triangle', 10);
          this.setEnemy('polygon', 15);
          this.setEnemy('circle', 15);
          this.setEnemy('circle', 20);
          this.setEnemy('polygon', 30);
          this.setEnemy('circle', 35);
          this.setEnemy('triangle', 35);
          this.setEnemy('polygon', 35);
          this.setEnemy('circle', 45);
          this.setEnemy('triangle', 45);
          this.setEnemy('circle', 50);
          this.setEnemy('polygon', 50);
          break;

        case 9:
          this.initLevel('09', 30);
          this.setEnemy('circle', 2);
          this.setEnemy('circle', 2);
          this.setEnemy('triangle', 2);
          this.setEnemy('triangle', 2);
          this.setEnemy('polygon', 10);
          this.setEnemy('circle', 15);
          this.setEnemy('triangle', 15);
          this.setEnemy('polygon', 15);
          this.setEnemy('polygon', 25);
          break;

        case 10:
          gameLevel.textContent = 'Wave 10';
          var rotateNum = getRandom(0, 360);
          this.boss = new Boss({
            axisRotateR: getRandom(gameH / 3, gameH / 2.5),
            axisRotateAngle: rotateNum,
            rotate: rotateNum - 90
          });
          this.countupTime();
          break;

        default:
          break;
      }

      playSound('synth', 'A6');
    }
  }, {
    key: "checkPlayerName",
    value: function checkPlayerName() {
      // const playerName = document.getElementById('player-name').value;
      if (playerName.value) {
        return true;
      } else {
        playerName.classList.add('warn');
        playSound('synth', 'A3');
        playSound('synth', 'A2', '8n', 160);
        return false;
      }
    }
  }]);

  return Game;
}(); // Page Loaded


function handleLoad() {
  game = new Game();
  initCanvas();
  game.init();
} // load & resize event


window.addEventListener('load', handleLoad);
window.addEventListener('resize', initCanvas); // Mouse Events & Recording

var mouseMovePos = {};
var mouseMoveAngle = 0;

function handleMouseMove(evt) {
  mouseMovePos.x = evt.x - ww / 2;
  mouseMovePos.y = evt.y - wh / 2;
  var angle = Math.atan2(mouseMovePos.y, mouseMovePos.x);
  mouseMoveAngle = angle < 0 ? angle + 2 * Math.PI : angle;
}

;
var beforeShootTime = new Date();

function handleClick() {
  if (game.isPause) return;
  game.shooter.shoot();
}

;

function handleKeyup(evt) {
  if (game.isStart) {
    if (evt.key === 's') {
      game.shooter.shoot();
    }

    if (evt.key === 'p') {
      game.pauseGame();
    }
  } else {
    if (evt.key === 'Enter') {
      if (!game.checkPlayerName()) return;
      game.startGame();
    }
  }

  if (evt.key === 'm') {
    game.isMuted = !game.isMuted;
    bgm.muted = !bgm.muted;
    victoryBgm.muted = !victoryBgm.muted;
  }
}

function handlePlayerName() {
  playerName.addEventListener('focus', function () {
    playerName.classList.remove('shine');
    playerName.classList.remove('warn');
  });
  playerName.addEventListener('focusout', function () {
    if (!playerName.value) {
      playerName.classList.add('shine');
    }
  });
  playerName.addEventListener('input', function () {
    if (playerName.value) {
      startBtn.classList.add('shine');
    } else {
      startBtn.classList.remove('shine');
    }
  });
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Polygon =
/*#__PURE__*/
function () {
  function Polygon(args) {
    _classCallCheck(this, Polygon);

    var def = {
      axisRotateR: {
        whole: 0,
        big: 0,
        small: 0
      },
      axisRotateAngle: {
        whole: 0,
        big: 0,
        small: 0
      },
      rotate: {
        whole: 0,
        big: 0,
        small: 0
      },
      HP: {
        whole: 1,
        big: 1,
        small: 1
      },
      axisRotateRV: 0,
      rotateV: 0,
      color: globalColor.red,
      // 是否正好要分裂
      isJustSplite: true,
      scale: 0,
      beginAppear: true,
      isBossGenerate: false
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Polygon, [{
    key: "originPos",
    value: function originPos(form) {
      return {
        x: gameW / 2 + this.axisRotateR[form] * Math.cos(this.axisRotateAngle[form] * degToPi),
        y: gameH / 2 + this.axisRotateR[form] * Math.sin(this.axisRotateAngle[form] * degToPi)
      };
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.HP.whole) {
        ctx.save();
        ctx.translate(this.originPos('whole').x, this.originPos('whole').y);
        ctx.rotate(this.rotate.whole * degToPi);
        ctx.scale(this.scale, this.scale); // 主體多邊形

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(21 * Math.cos(8 * degToPi), 21 * Math.sin(8 * degToPi));
        ctx.$triLineTo(23, 70);
        ctx.$triLineTo(23, 150);
        ctx.$triLineTo(34, 202);
        ctx.$triLineTo(22, 255);
        ctx.$triLineTo(22, 324);
        ctx.closePath();
        ctx.fill(); // 右淡五邊形

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.moveTo(9.6, -2);
        ctx.$triLineTo(22, 324);
        ctx.$triLineTo(21, 8);
        ctx.$triLineTo(23, 70);
        ctx.$triLineTo(10, 36);
        ctx.closePath();
        ctx.fill(); // 下淡四邊形

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
        ctx.moveTo(10 * Math.cos(40 * degToPi), 10 * Math.sin(40 * degToPi));
        ctx.$triLineTo(23, 70);
        ctx.$triLineTo(23, 150);
        ctx.lineTo(-8.8, 0);
        ctx.closePath();
        ctx.fill(); // 閃電

        drawLightning({
          x: -0.8,
          y: -16
        });
        ctx.restore();
      } else {
        // 大分裂四邊形
        if (this.HP.big) {
          ctx.save();
          ctx.translate(this.originPos('big').x, this.originPos('big').y);
          ctx.rotate(this.rotate.big * degToPi); // 大分裂主體

          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.moveTo(23 * Math.cos(70 * degToPi), 23 * Math.sin(70 * degToPi));
          ctx.$triLineTo(23, 150);
          ctx.$triLineTo(34, 202);
          ctx.$triLineTo(22, 255);
          ctx.closePath();
          ctx.fill(); // 大分裂內下四邊形

          ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
          ctx.beginPath();
          ctx.moveTo(-8.8, 0);
          ctx.$triLineTo(4.8, 64);
          ctx.$triLineTo(23, 70);
          ctx.$triLineTo(23, 150);
          ctx.closePath();
          ctx.fill(); // 大分裂左閃電

          drawLightning({
            x: -12,
            y: -8
          }, 0.6);
          ctx.restore();
        } // 小分裂四邊形


        if (this.HP.small) {
          ctx.save();
          ctx.translate(this.originPos('small').x, this.originPos('small').y);
          ctx.rotate(this.rotate.small * degToPi); // 小分裂主體

          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.moveTo(23 * Math.cos(70 * degToPi), 23 * Math.sin(70 * degToPi));
          ctx.$triLineTo(22, 255);
          ctx.$triLineTo(22, 324);
          ctx.$triLineTo(21, 8);
          ctx.closePath();
          ctx.fill(); // 小分裂內下三角形

          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
          ctx.moveTo(10 * Math.cos(40 * degToPi), 10 * Math.sin(40 * degToPi));
          ctx.$triLineTo(4.8, 64);
          ctx.$triLineTo(23, 70);
          ctx.closePath();
          ctx.fill(); // 小分裂內右五邊形

          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.moveTo(9.6, -2);
          ctx.$triLineTo(22, 324);
          ctx.$triLineTo(21, 8);
          ctx.$triLineTo(23, 70);
          ctx.$triLineTo(10, 36);
          ctx.closePath();
          ctx.fill(); // 小分裂閃電

          drawLightning({
            x: 10,
            y: -8
          }, 0.5);
          ctx.restore();
        }
      }
    }
  }, {
    key: "update",
    value: function update(idx) {
      this.beginAppear && this.appear(this.isBossGenerate);
      this.beginAppear = false;
      enemyMethods.approach(this); // 如果尚未分裂

      if (this.HP.whole) {
        this.rotate.whole = this.rotate.big = this.rotate.small += this.rotateV; // 當多邊形撞上 shooter

        game.isStart && enemyMethods.hitShooter(game.polygons, idx, 'whole', this.axisRotateR.whole, this.axisRotateAngle.whole);
      } else {
        // let rotateDirection;
        // 如果正好要分裂
        if (this.isJustSplite) {
          // const rotateOriginPos = 90 - 70;
          // const rotateDirection = (((this.rotate.whole % 360) >= rotateOriginPos) && ((this.rotate.whole % 360) < (180 + rotateOriginPos))) ? -1 : 1;
          var rotateDirection = Math.random() >= 0.5 ? 1 : -1;
          TweenLite.to(this.axisRotateAngle, 2.4, {
            big: "+=".concat(getRandom(15, 30) * rotateDirection),
            small: "-=".concat(getRandom(15, 30) * rotateDirection),
            ease: Circ.easeOut
          });
          TweenLite.to(this.axisRotateR, 2.4, {
            big: "+=".concat(getRandom(50, 150)),
            small: "+=".concat(getRandom(50, 150)),
            ease: Circ.easeOut
          });
          TweenLite.to(this.rotate, 2.4, {
            big: "+=".concat(getRandom(180, 270)),
            small: "-=".concat(getRandom(180, 270)),
            ease: Circ.easeOut
          }); // gameCrawler.textContent = 'ENEMY SPLITS';

          this.isJustSplite = false;
        } // 當大分裂撞上 shooter


        if (this.HP.big) {
          // 重物自轉較慢
          this.rotate.big += this.rotateV * 1.4;
          enemyMethods.hitShooter(game.polygons, idx, 'big', this.axisRotateR.big, this.axisRotateAngle.big);
        } // 當小分裂撞上 shooter


        if (this.HP.small) {
          // 輕物自轉較快
          this.rotate.small -= this.rotateV * 1.6;
          enemyMethods.hitShooter(game.polygons, idx, 'small', this.axisRotateR.small, this.axisRotateAngle.small);
        }
      }
    }
  }, {
    key: "appear",
    value: function appear(isBossGenerate) {
      gameCrawler.textContent = '⚠ ENEMY IS COMING';
      TweenLite.to(this, 0.8, {
        scale: 1,
        ease: Back.easeOut.config(1.7)
      });

      if (isBossGenerate) {
        var rotateNum = getRandom(40, 80);
        var rNum = getRandom(40, 80);
        TweenLite.to(this.axisRotateAngle, 1.6, {
          whole: "-=".concat(rotateNum),
          big: "-=".concat(rotateNum),
          small: "-=".concat(rotateNum),
          ease: Power2.easeOut
        });
        TweenLite.to(this.axisRotateR, 1.6, {
          whole: "+=".concat(rNum),
          big: "+=".concat(rNum),
          small: "+=".concat(rNum),
          ease: Power2.easeOut
        });
      }

      game.isStart && playSound('synth', 'C4', '4n');
    }
  }]);

  return Polygon;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* 道具 class */
var Prop =
/*#__PURE__*/
function () {
  function Prop(args) {
    _classCallCheck(this, Prop);

    var def = {
      img: new Image(),
      src: '',
      axisRotateR: 0,
      axisRotateRV: 0,
      axisRotateAngle: 0,
      r: 32
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Prop, [{
    key: "draw",
    value: function draw() {
      if (!this.img.src) {
        this.img.src = this.src;
      }

      if (this.img.complete) {
        ctx.save();
        ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
        ctx.drawImage(this.img, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.arc(this.img.width / 2, this.img.height / 2, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.axisRotateRV) {
        var seconds = getRandom(5, 10);
        this.axisRotateRV = -(gameHalfDiagonalL / (seconds * updateFPS));
      }

      this.axisRotateR += this.axisRotateRV; // 當道具撞上 shooter 主體

      var shooter = game.shooter; // 判斷是否撞上

      if (this.axisRotateR + this.r <= shooter.r + shooter.cirSolidLineW / 2) {
        // 清掉該道具
        game.prop = '';
        var propName = this.src.replace('../img/', '').split('.')[0];
        shooter.getProp(propName);
      }
    }
  }]);

  return Prop;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shooter =
/*#__PURE__*/
function () {
  function Shooter(args) {
    _classCallCheck(this, Shooter);

    var def = {
      color: globalColor.white,
      // r: 34 * 0.85,
      r: 28.9,
      // shieldR: (34 + 36) * 0.85,
      shieldR: 60,
      // cirSolidLineW: 6 * 0.85,
      cirSolidLineW: 6,
      // shieldLineW: 4 * 0.85,
      shieldLineW: 4,
      rotateAngle: 0,
      bullets: [],
      bulletNum: 0,
      hearts: 3,
      state: '',
      isAttacked: false,
      isProtect: false,
      beforeShootTime: new Date()
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Shooter, [{
    key: "draw",
    value: function draw() {
      if (!game.isStart && !game.isEnd) return;
      ctx.save(); // 輪圍

      ctx.translate(gameW / 2, gameH / 2);
      ctx.save();
      ctx.beginPath();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 16;
      ctx.lineWidth = this.cirSolidLineW;
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);

      if (!this.isAttacked) {
        ctx.strokeStyle = this.color;
      } else {
        ctx.strokeStyle = globalColor.red;
        this.isAttacked = false;
      }

      ctx.stroke(); // 輪軸

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.$triLineTo(this.r, 0, this.rotateAngle);
      ctx.moveTo(0, 0);
      ctx.$triLineTo(this.r, 120, this.rotateAngle);
      ctx.moveTo(0, 0);
      ctx.$triLineTo(this.r, 240, this.rotateAngle); // ctx.lineWidth = 3 * 0.85;

      ctx.lineWidth = 2.55;
      ctx.stroke();
      ctx.restore(); // 輪圍外虛線

      ctx.strokeStyle = this.color; // const outerR = this.r + 22 * 0.85;

      var outerR = this.r + 20;

      for (var i = 0; i < 360; i += 1) {
        var x1 = outerR * Math.cos(i * degToPi + this.rotateAngle);
        var y1 = outerR * Math.sin(i * degToPi + this.rotateAngle);
        var x2 = outerR * Math.cos((i + 1) * degToPi + this.rotateAngle);
        var y2 = outerR * Math.sin((i + 1) * degToPi + this.rotateAngle);

        if (i % 10 < 5) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } // 護盾


      ctx.beginPath();
      ctx.lineWidth = this.shieldLineW; // 如果 shooter 狀態為 shield，護盾變為 180°

      if (this.state !== 'shield') {
        ctx.arc(0, 0, this.shieldR, 135 * degToPi + this.rotateAngle, 225 * degToPi + this.rotateAngle);
      } else {
        ctx.arc(0, 0, this.shieldR, 90 * degToPi + this.rotateAngle, 270 * degToPi + this.rotateAngle);
      }

      if (!this.isProtect) {
        ctx.strokeStyle = this.color;
      } else {
        ctx.strokeStyle = globalColor.blue;
        this.isProtect = false;
      }

      ctx.stroke(); // 砲口

      ctx.beginPath();
      ctx.save();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 16;
      ctx.rotate(this.rotateAngle);
      ctx.translate(this.r + 8, 0);
      ctx.moveTo(0, 0); // 下方長方形長 13.6、寬（高） 10.2
      // 上方梯形高 11.8、上邊寬 6.8

      ctx.lineTo(0, 6.8);
      ctx.lineTo(10.2, 6.8);
      ctx.lineTo(22.1, 3.4);
      ctx.lineTo(22.1, -3.4);
      ctx.lineTo(10.2, -6.8);
      ctx.lineTo(0, -6.8);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
      ctx.restore(); // 發射子彈

      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.rotateAngle = mouseMoveAngle;
      this.bullets.forEach(function (bullet, idx) {
        bullet.update(idx);
      });
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var _this = this;

      var shootTime = new Date();

      if (shootTime - beforeShootTime > 400) {
        var bulletNum; // 如果 shooter 狀態為 double，每次射兩發，兩發之間隔 0.16 秒

        if (this.state !== 'double') {
          bulletNum = 1;
        } else {
          bulletNum = 2;
        }

        for (var i = 0; i < bulletNum; i++) {
          if (this.state !== 'wave') {
            setTimeout(function () {
              _this.bulletNum += 1;

              _this.bullets.push(new ShooterBullet({
                // axisRotateR: 62 * 0.85,
                axisRotateR: 52.7,
                rotateAngle: mouseMoveAngle
              }));

              playSound('membrane', 'D3');
            }, 160 * i);
          } else {
            setTimeout(function () {
              _this.bulletNum += 1;

              _this.bullets.push(new ShooterBullet({
                waveLength: getRandom(40, 80),
                waveFreq: getRandom(2, 4) / 10,
                waveAmp: getRandom(4, 8),
                waveFlow: getRandom(4, 8),
                // axisRotateR: 70 * 0.85,
                axisRotateR: 59.5,
                rotateAngle: mouseMoveAngle
              }));

              playSound('mono', 'F2', '4n', 0, -10);
            }, 160 * i);
          }
        }

        beforeShootTime = shootTime;
      }
    }
  }, {
    key: "getProp",
    value: function getProp(propName) {
      var _this2 = this;

      // 持續秒數
      var lastTime;

      switch (propName) {
        case 'heart':
          this.recoverHeart();
          lastTime = 0;
          gameCrawler.textContent = 'GAIN LIFE💕';
          break;

        case 'crackdown':
          this.drawCrackdownEffect();
          lastTime = 0;
          gameCrawler.textContent = 'BOOM💥';
          break;

        case 'shield':
          lastTime = 25000;
          gameCrawler.textContent = 'EXTEND SHIELD💪';
          break;

        case 'double':
          lastTime = 20000;
          gameCrawler.textContent = 'DOUBLE SHOOT✌️';
          break;

        case 'wave':
          lastTime = 15000;
          gameCrawler.textContent = 'WAVE BULLET🌊';
          break;

        default:
          lastTime = 0;
      } // 將道具設為 shooter 的狀態


      this.state = propName; // 時間到後，移除道具效果

      setTimeout(function () {
        _this2.state = ''; // 重新道具計時

        game.generateProp();
      }, lastTime); // 顯示道具效果持續時間

      this.displayPropInfo(propName, lastTime);

      if (propName !== 'crackdown') {
        playSound('synth', 'E5');
        playSound('synth', 'G5', '8n', 160);
      }
    } // 繪製清場效果

  }, {
    key: "drawCrackdownEffect",
    value: function drawCrackdownEffect() {
      var crackdownTime = 1;
      var boss = game.boss;

      var effect = function effect() {
        if (!game.isPause) {
          crackdownTime += 1;
        }

        ctx.save();
        ctx.beginPath();
        ctx.shadowColor = 'rgba(255, 255, 255, 0.72)';
        ctx.shadowBlur = 2; // 透明度從 1 到 0

        ctx.strokeStyle = "rgba(255, 255, 255, ".concat((100 - crackdownTime) / 98, ")");
        ctx.fillStyle = "rgba(255, 255, 255, ".concat((100 - crackdownTime) / 490, ")");
        ctx.lineWidth = 5;
        /**
         * baseLog() 從 0 到 3
         * 所以 (((crackdownTime - 2) / 98) * 26) + 1 為從 1 到 27
         * 清場半徑因此為從 0 到 528
         */

        var effectR = 176 * baseLog(3, (crackdownTime - 2) / 98 * 26 + 1);
        ctx.arc(gameW / 2, gameH / 2, effectR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore(); // 清除敵人

        game.circles.forEach(function (circle, idx) {
          if (effectR > circle.axisRotateR) {
            enemyMethods.dieEffect(circle.r, originPos(circle.axisRotateR, circle.axisRotateAngle).x, originPos(circle.axisRotateR, circle.axisRotateAngle).y, '245, 175, 95');
            game.circles.splice(idx, 1);
          }
        });
        game.triangles.forEach(function (triangle, idx) {
          if (effectR > triangle.axisRotateR) {
            enemyMethods.dieEffect(triangle.r, originPos(triangle.axisRotateR, triangle.axisRotateAngle).x, originPos(triangle.axisRotateR, triangle.axisRotateAngle).y, '54, 118, 187');
            game.triangles.splice(idx, 1);
          }
        });
        game.polygons.forEach(function (polygon, idx) {
          if (effectR > polygon.axisRotateR.whole) {
            if (polygon.HP.whole) {
              var polygonWholeR = (34 + 21) / 2;
              enemyMethods.dieEffect(polygonWholeR, polygon.originPos('whole').x, polygon.originPos('whole').y, '231, 70, 93');
            } else {
              if (polygon.HP.big) {
                var polygonBigR = (34 + 22) / 2;
                enemyMethods.dieEffect(polygonBigR, polygon.originPos('big').x, polygon.originPos('big').y, '231, 70, 93');
                game.polygons.splice(idx, 1);
              }

              if (polygon.HP.small) {
                var polygonSmallR = (23 + 21) / 2;
                enemyMethods.dieEffect(polygonSmallR, polygon.originPos('small').x, polygon.originPos('small').y, '231, 70, 93');
                game.polygons.splice(idx, 1);
              }
            }

            game.polygons.splice(idx, 1);
          }
        });
        game.subTris.forEach(function (subTriangle, idx) {
          if (effectR > subTriangle.axisRotateR) {
            game.subTris.splice(idx, 1);
          }
        }); // 清除 boss

        if (game.boss) {
          if (effectR > boss.axisRotateR && boss.HP === 0) {
            enemyMethods.bossDieResult();
          }
        }

        if (crackdownTime < 100) {
          requestAnimationFrame(effect);
        }
      };

      requestAnimationFrame(effect);

      if (boss) {
        boss.HP -= 1;
      } // playSound('duo', 'F4', '2n');


      playSound('synth', 'C6', '2n'); // playSound('synth', 'G2', '8n', 0, 20);
      // playSound('duo', 'F2', '2n', 0, 15);
      // playSound('duo', 'E2', '2n', 0, 10);
      // playSound('duo', 'D2', '8n', 1000, 10);
    } // 恢復一個愛心命

  }, {
    key: "recoverHeart",
    value: function recoverHeart() {
      var heart = document.createElement('DIV');
      heart.classList.add('panel__game-heart');
      heartWrapper.appendChild(heart);
      this.hearts += 1;
    }
  }, {
    key: "displayPropInfo",
    value: function displayPropInfo(propName, lastTime) {
      if (propName === 'crackdown' || propName === 'heart') return; // prop.style.opacity = 1;

      prop.classList.remove('op0');
      propImg.src = "../img/".concat(propName, "--panel.svg");
      lastTime /= 1000;
      propLastTime.textContent = lastTime;

      var countLastTime = function countLastTime() {
        var propInfoTimer = setTimeout(function () {
          if (game.isPause) {
            countLastTime();
            return;
          } // 遊戲結束時，清除計時器


          if (!game.isStart) {
            // prop.style.opacity = 0;
            clearTimeout(propInfoTimer);
            return;
          }

          lastTime -= 1;
          propLastTime.textContent = lastTime >= 10 ? lastTime : "0".concat(lastTime);

          if (lastTime) {
            countLastTime();
          } else {
            // prop.style.opacity = 0;
            prop.classList.add('op0');
            clearTimeout(propInfoTimer);
          }
        }, 1000);
      };

      countLastTime();
    }
  }]);

  return Shooter;
}();

var ShooterBullet =
/*#__PURE__*/
function () {
  function ShooterBullet(args) {
    _classCallCheck(this, ShooterBullet);

    var def = {
      // bodyLen: 15 * 0.85,
      bodyLen: 12.75,
      axisRotateR: 0,
      color: globalColor.white,
      v: 10,
      rotateAngle: 0,
      waveLength: 40,
      waveFreq: 0.2,
      waveAmp: 4,
      waveFlow: 4
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(ShooterBullet, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.translate(gameW / 2, gameH / 2);
      ctx.rotate(this.rotateAngle); // 如果 shooter 狀態非 wave

      if (game.shooter.state !== 'wave') {
        // 殘影
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // ctx.arc(-7 * 0.85 + this.axisRotateR, 0, 3 * 0.85, 0, Math.PI * 2);

        ctx.arc(-5.95 + this.axisRotateR, 0, 2.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // ctx.arc(-12 * 0.85 + this.axisRotateR, 0, 2 * 0.85, 0, Math.PI * 2);

        ctx.arc(-10.2 + this.axisRotateR, 0, 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // ctx.arc(-15 * 0.85 + this.axisRotateR, 0, 1 * 0.85, 0, Math.PI * 2);

        ctx.arc(-12.75 + this.axisRotateR, 0, 0.85, 0, Math.PI * 2);
        ctx.fill(); // 園底

        ctx.beginPath();
        ctx.fillStyle = this.color; // ctx.arc(0 + this.axisRotateR, 0, 4 * 0.85, 0, Math.PI * 2);

        ctx.arc(0 + this.axisRotateR, 0, 3.4, 0, Math.PI * 2);
        ctx.fill(); // 尖頭

        ctx.beginPath(); // ctx.moveTo(3 * 0.85 + this.axisRotateR, 3 * 0.85);

        ctx.moveTo(2.55 + this.axisRotateR, 2.55);
        ctx.lineTo(this.bodyLen + this.axisRotateR, 0); // ctx.lineTo(3 * 0.85 + this.axisRotateR, -3 * 0.85);

        ctx.lineTo(2.55 + this.axisRotateR, -2.55);
        ctx.closePath();
        ctx.fill();
      } else {
        drawWaveBullet(this, 'axisRotateR', 1.6, 'rgba(255, 255, 255, 0.72)');
      }

      ctx.restore();
    }
  }, {
    key: "update",
    value: function update(bulletIdx) {
      var _this3 = this;

      // 移動子彈
      this.axisRotateR += this.v;
      var anglePanFn;
      var shotRRangeFn; // 判斷子彈為哪一類型
      // 一般類型

      if (game.shooter.state !== 'wave') {
        var bulletMoveLen = this.axisRotateR + this.bodyLen; // 判斷子彈有無射中圓形

        game.circles.forEach(function (circle, cirIdx) {
          anglePanFn = function anglePanFn() {
            return Math.asin(circle.r / circle.axisRotateR);
          };

          shotRRangeFn = function shotRRangeFn() {
            return bulletMoveLen >= circle.axisRotateR - circle.r / 2 && bulletMoveLen <= circle.axisRotateR + circle.r / 2;
          };

          _this3.attackEnemy(circle, cirIdx, game.circles, bulletIdx, anglePanFn, shotRRangeFn, '245, 175, 95');
        }); // 判斷子彈有無射中三角形

        game.triangles.forEach(function (triangle, triIdx) {
          anglePanFn = function anglePanFn() {
            var lengthX = triangle.axisRotateR + triangle.r / 2;
            var lengthY = triangle.r / 2 * Math.sqrt(3);
            return Math.atan2(lengthY, lengthX);
          };

          shotRRangeFn = function shotRRangeFn() {
            return bulletMoveLen >= triangle.axisRotateR && bulletMoveLen <= triangle.axisRotateR + triangle.r / 2;
          };

          _this3.attackEnemy(triangle, triIdx, game.triangles, bulletIdx, anglePanFn, shotRRangeFn, '54, 118, 187');
        }); // 判斷子彈有無射中多邊形

        game.polygons.forEach(function (polygon, polyIdx) {
          // 當多邊形未分裂
          if (polygon.HP.whole) {
            shotRRangeFn = function shotRRangeFn() {
              var sideA = polygon.axisRotateR.whole;
              return bulletMoveLen >= sideA && bulletMoveLen <= sideA + 9;
            };

            _this3.attackPolygon(polygon, polyIdx, 'whole', 34, 21, 360 - (202 + 75), 8 + 75, 75, bulletIdx, shotRRangeFn);
          } else {
            // 當多邊形分裂
            // 大分裂
            if (polygon.HP.big) {
              shotRRangeFn = function shotRRangeFn() {
                var sideA = polygon.axisRotateR.big;
                return bulletMoveLen >= sideA + 8 && bulletMoveLen <= sideA + 16;
              };

              _this3.attackPolygon(polygon, polyIdx, 'big', 34, 23, 202 + 44 - 180, 180 - (70 + 44), 44, bulletIdx, shotRRangeFn);
            } // 小分裂


            if (polygon.HP.small) {
              shotRRangeFn = function shotRRangeFn() {
                var sideA = polygon.axisRotateR.small;
                return bulletMoveLen >= sideA + 8 && bulletMoveLen <= sideA + 16;
              };

              _this3.attackPolygon(polygon, polyIdx, 'small', 22, 23, 255 + 17.5 - 180, 180 - (70 + 17.5), 17.5, bulletIdx, shotRRangeFn);
            }
          }
        }); // 判斷子彈有無射中 boss

        var boss = game.boss;

        if (boss) {
          anglePanFn = function anglePanFn() {
            return Math.asin(18 / (boss.axisRotateR + 6));
          };

          shotRRangeFn = function shotRRangeFn() {
            return bulletMoveLen >= boss.axisRotateR + 9 + 8 && bulletMoveLen <= boss.axisRotateR + 28;
          };

          this.attackEnemy(boss, NaN, null, bulletIdx, anglePanFn, shotRRangeFn, '255, 255, 255', 'ordinary', true);
        }
      } else {
        // 波狀類型
        // 有無射中圓形
        game.circles.forEach(function (circle, cirIdx) {
          anglePanFn = function anglePanFn() {
            return Math.asin(circle.r / circle.axisRotateR);
          };

          shotRRangeFn = function shotRRangeFn() {
            return _this3.axisRotateR >= circle.axisRotateR - circle.r / 2 && _this3.axisRotateR <= circle.axisRotateR + circle.r / 2;
          };

          _this3.attackEnemy(circle, cirIdx, game.circles, bulletIdx, anglePanFn, shotRRangeFn, '245, 175, 95', 'wave');
        }); // 有無射中三角形

        game.triangles.forEach(function (triangle, triIdx) {
          anglePanFn = function anglePanFn() {
            var lengthX = triangle.axisRotateR + triangle.r / 2;
            var lengthY = triangle.r / 2 * Math.sqrt(3);
            return Math.atan2(lengthY, lengthX);
          };

          shotRRangeFn = function shotRRangeFn() {
            return _this3.axisRotateR >= triangle.axisRotateR && _this3.axisRotateR <= triangle.axisRotateR + triangle.r / 2;
          };

          _this3.attackEnemy(triangle, triIdx, game.triangles, bulletIdx, anglePanFn, shotRRangeFn, '54, 118, 187', 'wave');
        }); // 有無射中多邊形

        game.polygons.forEach(function (polygon, polyIdx) {
          // 當多邊形尚未分裂
          if (polygon.HP.whole) {
            shotRRangeFn = function shotRRangeFn() {
              var sideA = polygon.axisRotateR.whole;
              return _this3.axisRotateR >= sideA && _this3.axisRotateR <= sideA + 9;
            };

            _this3.attackPolygon(polygon, polyIdx, 'whole', 34, 21, 360 - (202 + 75), 8 + 75, 75, bulletIdx, shotRRangeFn, 'wave');
          } else {
            // 當多邊形已經分裂
            // 大分裂
            if (polygon.HP.big) {
              shotRRangeFn = function shotRRangeFn() {
                var sideA = polygon.axisRotateR.big;
                return _this3.axisRotateR >= sideA + 8 && _this3.axisRotateR <= sideA + 16;
              };

              _this3.attackPolygon(polygon, polyIdx, 'big', 34, 23, 202 + 44 - 180, 180 - (70 + 44), 44, bulletIdx, shotRRangeFn, 'wave');
            } // 小分裂


            if (polygon.HP.small) {
              shotRRangeFn = function shotRRangeFn() {
                var sideA = polygon.axisRotateR.small;
                return _this3.axisRotateR >= sideA + 8 && _this3.axisRotateR <= sideA + 16;
              };

              _this3.attackPolygon(polygon, polyIdx, 'small', 22, 23, 255 + 17.5 - 180, 180 - (70 + 17.5), 17.5, bulletIdx, shotRRangeFn, 'wave');
            } // 如果大小分裂都已被擊斃，移除此多邊形


            if (polygon.HP.big === 0 && polygon.HP.small === 0) {
              game.polygons.splice(polyIdx, 1); // 電池加一

              game.batteryNum += 1;
              batteryNum.textContent = game.batteryNum;
            }
          }
        }); // 判斷子彈有無射中 boss

        var _boss = game.boss;

        if (_boss) {
          anglePanFn = function anglePanFn() {
            return Math.asin(18 / (_boss.axisRotateR + 6));
          };

          shotRRangeFn = function shotRRangeFn() {
            return _this3.axisRotateR >= _boss.axisRotateR + 9 + 8 && _this3.axisRotateR <= _boss.axisRotateR + 28;
          };

          this.attackEnemy(_boss, NaN, null, bulletIdx, anglePanFn, shotRRangeFn, '255, 255, 255', 'wave', true);
        }
      } // 當子彈超出邊界


      this.beyondBoundary(bulletIdx);
    } // 攻擊敵人（圓形、三角形）
    // FIXME 當敵人太靠近會打不到

  }, {
    key: "attackEnemy",
    value: function attackEnemy(enemy, enemyIdx, enemies, bulletIdx, anglePanFn, shotRRangeFn, colorRGB) {
      var type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'ordinary';
      var isBoss = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

      /**
       * 射中角度範圍
       * 圓形：取得兩個外切線所構成角度的一半
       * 三角形：取得射中角度範圍的一半
       */
      var enemyAnglePan = anglePanFn();
      var enemyAngleMinus = enemy.axisRotateAngle % 360 * degToPi - enemyAnglePan;
      var enemyAngleAdd = enemy.axisRotateAngle % 360 * degToPi + enemyAnglePan;
      var shotAngleRange = this.judgeShotAngleRange(enemyAngleMinus, enemyAngleAdd, type); // 射中距離範圍

      var shotRRange = shotRRangeFn();

      if (!gameCrawler.textContent) {
        gameCrawler.textContent = Math.random() >= 0.5 ? 'FIRE🔥' : 'BANG👊';
      } // 判斷子彈有無射中敵人


      if (shotAngleRange && shotRRange) {
        // 移除子彈
        game.shooter.bullets.splice(bulletIdx, 1); // 扣敵人 1 生命值

        enemy.HP -= 1;

        if (type === 'ordinary') {
          playSound('membrane', 'D2');
        } else {
          playSound('mono', 'C2', '8n', 0, -10);
        } // 若敵人生命值為 0


        if (enemy.HP === 0) {
          if (isBoss) {
            // 移除 boss
            enemyMethods.bossDieResult();
            return;
          } else {
            // 移除敵人
            enemies.splice(enemyIdx, 1); // 移除效果

            enemyMethods.dieEffect(enemy.r, originPos(enemy.axisRotateR, enemy.axisRotateAngle).x, originPos(enemy.axisRotateR, enemy.axisRotateAngle).y, colorRGB); // 電池加一

            game.batteryNum += 1;
            batteryNum.textContent = game.batteryNum;
          }
        }

        gameCrawler.textContent = Math.random() >= 0.8 ? "BULL'S-EYE😤" : 'HIT👍';
      }
    } // 攻擊多邊形

  }, {
    key: "attackPolygon",
    value: function attackPolygon(polygon, polyIdx, form, sideB1Len, sideB2Len, angleAB1, angleAB2, rotateAngleJudge, bulletIdx, shotRRangeFn) {
      var type = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 'ordinary';
      var polyAxisRotateAngle = polygon.axisRotateAngle[form];
      var polyRotate = polygon.rotate[form]; // 取得兩側射中最大角度

      var sideA = polygon.axisRotateR[form];
      var sideB1 = sideB1Len;
      var sideB2 = sideB2Len;
      /**
       * 兩側點愈靠近軸心，夾角便愈大
       *   whole: 8°, 202°
       *   big: 70°, 202°
       *   small: 70°, 255°
         * 相同軸半徑下，當多邊形呈某一角度，兩側點離軸心（幾乎）最近，angleB 相同
       *   whole: axisRotateAngle 180°, rotate 75°
       *     270 - 202 = 68
       *     90 - 8 = 82
       *     (68 + 82) / 2 = 75
       * 
       *   big: axisRotateAngle 0°, rotate 44°
       *     270 - 202 = 68
       *     90 - 70 = 20
       *     (68 + 20) / 2 = 44
       * 
       *   small: axisRotateAngle 0°, rotate 17.5°
       *     270 - 255 = 15
       *     90 - 70 = 20
       *     (15 + 20) / 2 = 17.5
       */

      var sideC1 = cosineFormula(sideA, sideB1, angleAB1);
      var sideC2 = cosineFormula(sideA, sideB2, angleAB2); // 當多邊形的 axisRotateAngle、rotate 不同，要加上與減去的角度也不一樣

      var bottomJudge = polyAxisRotateAngle <= 180 && (polyRotate % 360 < rotateAngleJudge || polyRotate % 360 >= rotateAngleJudge + 180);
      var topJudge = polyAxisRotateAngle > 180 && (polyRotate % 360 >= rotateAngleJudge || polyRotate % 360 < rotateAngleJudge + 180);
      var angleB1;
      var angleB2;

      if (!gameCrawler.textContent) {
        gameCrawler.textContent = Math.random() >= 0.5 ? 'FIRE🔥' : 'BANG👊';
      }

      if (bottomJudge || topJudge) {
        angleB1 = getAngleB(sideA, sideB2, sideC2);
        angleB2 = getAngleB(sideA, sideB1, sideC1);
      } else {
        angleB1 = getAngleB(sideA, sideB1, sideC1);
        angleB2 = getAngleB(sideA, sideB2, sideC2);
      }
      /**
       * 射中角度範圍
       * 多邊形雖不會繞軸旋轉，axisRotateAngle 固定，但分裂時可能會超過 360°，故 % 360
       */


      var polyAngleMinus = polyAxisRotateAngle % 360 * degToPi - angleB1;
      var polyAngleAdd = polyAxisRotateAngle % 360 * degToPi + angleB2;
      var shotAngleRange = this.judgeShotAngleRange(polyAngleMinus, polyAngleAdd, type); // 射中距離範圍

      var shotRRange = shotRRangeFn(); // 判斷子彈有無射中多邊形

      if (shotAngleRange && shotRRange) {
        // 移除子彈
        game.shooter.bullets.splice(bulletIdx, 1); // 扣 1 生命值

        polygon.HP[form] -= 1;

        if (form === 'whole') {
          playSound('synth', 'D6', '16n');
        } // 若大或小分裂生命值為 0


        if (polygon.HP.big === 0 || polygon.HP.small === 0) {
          // 移除效果
          var polygonR = form === 'big' ? (34 + 22) / 2 : (23 + 21) / 2;
          enemyMethods.dieEffect(polygonR, polygon.originPos(form).x, polygon.originPos(form).y, '231, 70, 93');
        } // 如果大小分裂都被擊斃了，那就移除此多邊形


        if (polygon.HP.big === 0 && polygon.HP.small === 0) {
          game.polygons.splice(polyIdx, 1); // 電池加一

          game.batteryNum += 1;
          batteryNum.textContent = game.batteryNum;
        }

        gameCrawler.textContent = Math.random() >= 0.8 ? "BULL'S-EYE😤!" : 'HIT👍';

        if (type === 'ordinary') {
          playSound('membrane', 'D2');
        } else {
          playSound('mono', 'C2', '8n', 0, -10);
        }
      }
    } // 判斷射中角度範圍

  }, {
    key: "judgeShotAngleRange",
    value: function judgeShotAngleRange(enemyAngleMinus, enemyAngleAdd, type) {
      var shooterRotateAngle; // 當敵人 axisRotateAngle 在 360° 附近，且 shooter 槍口朝下（0° 下方）

      if (enemyAngleAdd > Math.PI * 2 && this.rotateAngle < Math.PI) {
        shooterRotateAngle = this.rotateAngle + Math.PI * 2;
      } else if ( // 當敵人 axisRotateAngle 皆小於 0
      enemyAngleMinus < 0 && enemyAngleAdd < 0 || // 當敵人 axisRotateAngle 在 0° 附近，且 shooter 槍口朝上（0° 上方）
      enemyAngleMinus < 0 && enemyAngleAdd > 0 && this.rotateAngle > Math.PI) {
        shooterRotateAngle = this.rotateAngle - Math.PI * 2;
      } else {
        shooterRotateAngle = this.rotateAngle;
      } // 判斷子彈為哪一類型
      // 一般子彈


      if (type !== 'wave') {
        return shooterRotateAngle >= enemyAngleMinus && shooterRotateAngle <= enemyAngleAdd;
      } else {
        // 波狀子彈
        var shooterAnglePan = Math.atan2(this.waveLength, this.axisRotateR);
        var shooterAngleMinus = shooterRotateAngle - shooterAnglePan;
        var shooterAngleAdd = shooterRotateAngle + shooterAnglePan;
        return enemyAngleMinus <= shooterAngleAdd && enemyAngleAdd >= shooterAngleMinus;
      }
    } // 當子彈超出邊界

  }, {
    key: "beyondBoundary",
    value: function beyondBoundary(bulletIdx) {
      /**
       * 856 / 2 = 428
       * 624 / 2 = 312
       * Math.sqrt(428 * 428 + 312 * 312) = 529.6
       */
      if (this.axisRotateR >= 530) {
        game.shooter.bullets.splice(bulletIdx, 1);
      }
    }
  }]);

  return ShooterBullet;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Triangle =
/*#__PURE__*/
function () {
  function Triangle(args) {
    _classCallCheck(this, Triangle);

    var def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      r: 26,
      rotate: 0,
      scale: 0,
      axisRotateRV: 0,
      axisRotateAngleV: 0,
      color: globalColor.blue,
      bullets: [],
      beforeRotateAxisAngleTime: new Date(),
      beforeShootTime: new Date(),
      HP: 4,
      isGeneratedSub: false,
      shootTimer: null,
      beginAppear: true,
      isBossGenerate: false
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(Triangle, [{
    key: "draw",
    value: function draw() {
      var triOuterBigR = this.r + 4;
      var triInnerBigR = this.r - 16;
      var triInnerSmallR = this.r - 22;
      ctx.save(); // 淡三角

      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
      ctx.scale(this.scale, this.scale);
      ctx.rotate(this.rotate * degToPi);
      ctx.save();
      ctx.translate(4, 0);
      ctx.beginPath();
      ctx.moveTo(triOuterBigR * Math.cos(60 * degToPi), triOuterBigR * Math.sin(60 * degToPi));
      ctx.$triLineTo(triOuterBigR, 180);
      ctx.$triLineTo(triOuterBigR, 300);
      ctx.closePath();
      ctx.fillStyle = 'rgba(54, 118, 187, 0.34)';
      ctx.fill();
      ctx.restore(); // 主體三角

      ctx.beginPath();
      ctx.moveTo(this.r * Math.cos(60 * degToPi), this.r * Math.sin(60 * degToPi));
      ctx.$triLineTo(this.r, 180);
      ctx.$triLineTo(this.r, 300);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill(); // 大白三角

      ctx.translate(0, -2.8);
      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.$triLineTo(triInnerBigR, 90);
      ctx.$triLineTo(triInnerBigR, 150);
      ctx.closePath();
      ctx.fill(); // 小白三角

      ctx.translate(8 * Math.cos(-40 * degToPi), 8 * Math.sin(-40 * degToPi));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.$triLineTo(triInnerSmallR, 90);
      ctx.$triLineTo(triInnerSmallR, 150);
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // 繪製三角子彈

      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
    }
  }, {
    key: "update",
    value: function update(idx) {
      var _this = this;

      this.beginAppear && this.appear(this.isBossGenerate);
      this.beginAppear = false;
      game.isStart && enemyMethods.approach(this); // 更新三角子彈

      this.bullets.forEach(function (bullet, idx, arr) {
        bullet.update(idx, arr);
      }); // 每 4-8 秒，三角移動 + 自身旋轉

      var rotateAxisAngleTime = new Date();
      var randomRotateAngle;

      if (rotateAxisAngleTime - this.beforeRotateAxisAngleTime > getRandom(4000, 8000)) {
        // 旋轉時不發射子彈
        if (this.shootTimer) {
          clearTimeout(this.shootTimer);
        }

        randomRotateAngle = (Math.random() >= 0.25 ? 1 : -1) * getRandom(45, 75); // 以 0.8 秒移動

        TweenLite.to(this, 0.8, {
          axisRotateAngle: "+=".concat(randomRotateAngle),
          ease: Power0.easeNone
        }); // 以 1.2 秒自身旋轉

        TweenLite.to(this, 1.2, {
          rotate: "+=".concat(randomRotateAngle + 360),
          ease: Power2.easeInOut,
          onComplete: function onComplete() {
            // 移動完後發射子彈
            // 當遊戲尚未開始、暫停，或此三角形已死掉，便不發射子彈
            if (!game.isStart || game.isPause || _this.HP === 0) return;

            _this.shoot(); // 發射一顆子彈後，每 2.4-7.2 秒發射第二發子彈


            _this.shootTimer = setTimeout(function () {
              if (!game.isStart || _this.HP === 0) return;

              _this.shoot();
            }, getRandom(2400, 7200));
          }
        });
        this.beforeRotateAxisAngleTime = rotateAxisAngleTime;
      } // 當生命值剩 2，派副三角形攻擊


      if (this.HP === 2 && !this.isGeneratedSub) {
        for (var i = 1; i <= 2; i += 1) {
          game.subTris.push(new TriSub({
            axisRotateR: this.axisRotateR,
            axisRotateAngle: this.axisRotateAngle,
            rotate: this.rotate,
            order: i
          }));
        }

        gameCrawler.textContent = 'COUNTERATTACK🤛';
        this.isGeneratedSub = true;
        playSound('synth', 'C6', '16n');
      } // 當三角形撞上 shooter


      enemyMethods.hitShooter(game.triangles, idx, 'triangle', this.axisRotateR, this.axisRotateAngle);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      this.bullets.push(new TriBullet({
        p: {
          x: originPos(this.axisRotateR, this.axisRotateAngle).x,
          y: originPos(this.axisRotateR, this.axisRotateAngle).y
        },
        axisRotateR: this.axisRotateR,
        rotateAngle: this.rotate
      }));
      gameCrawler.textContent = Math.random() >= 0.8 ? 'UNDER ATTACK🤕' : 'ATTACK⚡️';
      playSound('membrane', 'G5');
    }
  }, {
    key: "appear",
    value: function appear(isBossGenerate) {
      gameCrawler.textContent = '⚠ ENEMY IS COMING';
      TweenLite.to(this, 0.8, {
        scale: 1,
        ease: Back.easeOut.config(1.7)
      });
      var rotateNum = 0;

      if (isBossGenerate) {
        rotateNum = getRandom(40, 80);
        var rNum = getRandom(40, 80);
        TweenLite.to(this, 1.6, {
          axisRotateAngle: "+=".concat(rotateNum),
          axisRotateR: "+=".concat(rNum),
          ease: Power2.easeOut
        });
      }

      TweenLite.to(this, 1.6, {
        rotate: "+=".concat(rotateNum + 360),
        ease: Back.easeOut.config(1.7)
      });
      game.isStart && playSound('synth', 'B4', '4n');
    }
  }]);

  return Triangle;
}();

var TriSub =
/*#__PURE__*/
function () {
  function TriSub(args) {
    _classCallCheck(this, TriSub);

    var def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      // r: 26 * 0.4,
      r: 10.4,
      rotate: 0,
      rotateV: 4,
      color: globalColor.blue,
      HP: 2,
      isReproduceMoving: false,
      order: 0
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(TriSub, [{
    key: "draw",
    value: function draw() {
      var triOuterBigR = this.r + 1.6;
      var triInnerBigR = this.r - 6.4;
      var triInnerSmallR = this.r - 8.8;
      ctx.save(); // 淡三角

      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y); // ctx.scale(0.4, 0.4);

      ctx.rotate(this.rotate * degToPi);
      ctx.save();
      ctx.translate(0.8, -Math.sqrt(1.92));
      ctx.beginPath();
      ctx.moveTo(triOuterBigR * Math.cos(0), triOuterBigR * Math.sin(0));
      ctx.lineTo(triOuterBigR * Math.cos(120 * degToPi), triOuterBigR * Math.sin(120 * degToPi));
      ctx.lineTo(triOuterBigR * Math.cos(240 * degToPi), triOuterBigR * Math.sin(240 * degToPi));
      ctx.closePath();
      ctx.fillStyle = 'rgba(54, 118, 187, 0.34)';
      ctx.fill();
      ctx.restore(); // 主體三角

      ctx.beginPath();
      ctx.moveTo(this.r * Math.cos(0), this.r * Math.sin(0));
      ctx.lineTo(this.r * Math.cos(120 * degToPi), this.r * Math.sin(120 * degToPi));
      ctx.lineTo(this.r * Math.cos(240 * degToPi), this.r * Math.sin(240 * degToPi));
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill(); // 大白三角

      ctx.translate(-1.28, -0.64);
      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(triInnerBigR * Math.cos(30 * degToPi), triInnerBigR * Math.sin(30 * degToPi));
      ctx.lineTo(triInnerBigR * Math.cos(90 * degToPi), triInnerBigR * Math.sin(90 * degToPi));
      ctx.closePath();
      ctx.fill(); // 小白三角

      ctx.translate(0, -3.52);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(triInnerSmallR * Math.cos(30 * degToPi), triInnerSmallR * Math.sin(30 * degToPi));
      ctx.lineTo(triInnerSmallR * Math.cos(90 * degToPi), triInnerSmallR * Math.sin(90 * degToPi));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update(idx) {
      var _this2 = this;

      this.rotate += this.rotateV;

      if (!this.isReproduceMoving) {
        TweenLite.to(this, 0.8, {
          axisRotateAngle: "".concat(this.order === 1 ? '+=' : '-=', "10"),
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            TweenLite.to(_this2, 1.6, {
              axisRotateR: 0,
              ease: Power1.easeIn
            });
          }
        });
        this.isReproduceMoving = true;
      } // 當小三角形撞上 shooter


      enemyMethods.hitShooter(game.subTris, idx, 'triangle', this.axisRotateR, this.axisRotateAngle);
    }
  }]);

  return TriSub;
}();

var TriBullet =
/*#__PURE__*/
function () {
  function TriBullet(args) {
    _classCallCheck(this, TriBullet);

    var def = {
      p: {
        x: 0,
        y: 0
      },
      moveX: 0,
      moveXV: -4,
      rotateAngle: 0,
      color: globalColor.blue
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  _createClass(TriBullet, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.translate(this.p.x, this.p.y);
      ctx.rotate(this.rotateAngle * degToPi);
      ctx.translate(this.moveX, 0); // 主體三角子彈

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(-16, 0);
      ctx.$triLineTo(38, 174);
      ctx.$triLineTo(16.8, 200);
      ctx.closePath();
      ctx.fill(); // 淡三角子彈

      ctx.fillStyle = 'rgba(54, 118, 187, 0.34)';
      ctx.beginPath();
      ctx.moveTo(-16.4, 0);
      ctx.$triLineTo(38, 174);
      ctx.$triLineTo(15.6, 168);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update(idx, arr) {
      // 三角子彈移動
      this.moveX += this.moveXV; // 子彈擊中 shooter

      enemyMethods.attackShooter(this, idx, arr, 37.8); // 當子彈超出邊界

      this.beyondBoundary(idx, arr);
    } // 當子彈超出邊界

  }, {
    key: "beyondBoundary",
    value: function beyondBoundary(idx, arr) {
      // Math.sqrt(856 * 856 + 624 * 624) = 1059.3
      if (this.moveX <= -1060) {
        arr.splice(idx, 1);
      }
    }
  }]);

  return TriBullet;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

ctx.$triLineTo = function (r, angle) {
  var angleAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return ctx.lineTo(r * Math.cos(angle * degToPi + angleAdd), r * Math.sin(angle * degToPi + angleAdd));
}; // 繪製波狀子彈


function drawWaveBullet(bullet, originPos, lineWidth, shadowColor) {
  ctx.strokeStyle = bullet.color;
  ctx.lineWidth = lineWidth;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 2; // 正半波

  ctx.beginPath();

  for (var i = 0; i < bullet.waveLength; i += 1) {
    var degree = i * bullet.waveFreq + updateTime / bullet.waveFlow;
    ctx.lineTo(bullet[originPos] + bullet.waveAmp * Math.sin(degree), i);
  }

  ctx.stroke(); // 負半波

  ctx.beginPath();

  for (var _i = 0; _i < bullet.waveLength; _i += 1) {
    var _degree = _i * bullet.waveFreq + updateTime / bullet.waveFlow;

    ctx.lineTo(bullet[originPos] + bullet.waveAmp * Math.sin(_degree), -_i);
  }

  ctx.stroke();
} // 繪製電池


function drawBattery(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.fillStyle = globalColor.orange; // 瓶身

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-24, 0);
  ctx.lineTo(-24, 42);
  ctx.lineTo(0, 42);
  ctx.closePath();
  ctx.fill(); // 瓶底

  ctx.save();
  ctx.translate(0, 44);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-24, 0);
  ctx.lineTo(-24, 3);
  ctx.lineTo(0, 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore(); // 瓶蓋

  ctx.fillStyle = globalColor.white;
  ctx.save();
  ctx.translate(-6.75, 0);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -3);
  ctx.lineTo(-10.5, -3);
  ctx.lineTo(-10.5, -0);
  ctx.closePath();
  ctx.fill();
  ctx.restore(); // 閃電

  drawLightning({
    x: -11,
    y: 9
  });
  ctx.restore();
} // 繪製閃電


function drawLightning() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: 0,
    y: 0
  };
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  ctx.fillStyle = globalColor.white;
  ctx.translate(translate.x, translate.y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.rotate(18 * degToPi);
  ctx.lineTo(0, 10 * scale);
  ctx.translate(0, 10 * scale);
  ctx.rotate(-18 * degToPi);
  ctx.lineTo(10 * scale, 0);
  ctx.translate(10 * scale, 0);
  ctx.rotate(28 * degToPi);
  ctx.lineTo(0, 16 * scale);
  ctx.translate(0, 16 * scale);
  ctx.rotate(-28 * degToPi);
  ctx.rotate(3.6 * degToPi);
  ctx.lineTo(0, -10 * scale);
  ctx.translate(0, -10 * scale);
  ctx.rotate(-3.6 * degToPi);
  ctx.lineTo(-8 * scale, 0);
  ctx.closePath();
  ctx.fill();
}

function originPos(axisRotateR, axisRotateAngle) {
  return {
    x: gameW / 2 + axisRotateR * Math.cos(axisRotateAngle * degToPi),
    y: gameH / 2 + axisRotateR * Math.sin(axisRotateAngle * degToPi)
  };
} // 以 x 為底的 y 的對數：logxy


function baseLog(x, y) {
  return Math.log(y) / Math.log(x);
} // 餘弦定理


function cosineFormula(a, b, angle) {
  return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle * degToPi));
}

function getAngleB(a, b, c) {
  return Math.acos((a * a + c * c - b * b) / (2 * a * c));
} // 取得某區間的隨機亂數


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playSound(instrument, note) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '8n';
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var volume = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  if (game.isMuted) return;
  var synth;

  switch (instrument) {
    case 'membrane':
      setTimeout(function () {
        synth = new Tone.MembraneSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;

    case 'duo':
      setTimeout(function () {
        synth = new Tone.DuoSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;

    case 'mono':
      setTimeout(function () {
        synth = new Tone.MonoSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;

    default:
      setTimeout(function () {
        synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;
  }
}
/* 2D Vector Class */


var Vec2 =
/*#__PURE__*/
function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "move",
    value: function move(x, y) {
      this.x += x;
      this.y += y;
    }
  }, {
    key: "add",
    value: function add(v) {
      return new Vec2(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "sub",
    value: function sub(v) {
      return new Vec2(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "mul",
    value: function mul(s) {
      return new Vec2(this.x * s, this.y * s);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "equal",
    value: function equal(v) {
      return this.x === v.x && this.y === v.y;
    }
  }, {
    key: "length",
    get: function get() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set: function set(newVal) {
      var newLength = this.unit.mul(newVal);
      this.set(newLength.x, newLength.y);
    }
  }, {
    key: "angle",
    get: function get() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "unit",
    get: function get() {
      return this.mul(1 / this.length);
    }
  }]);

  return Vec2;
}();
//# sourceMappingURL=index.js.map
