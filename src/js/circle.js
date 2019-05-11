class Circle {
  constructor(args) {
    const def = {
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
      isBossGenerate: false,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }


  draw() {
    const circleBigR = this.r + 5;
    const circleSmallR = this.r - 10;
    const subAxisRotateR = 14;
    ctx.save();
    ctx.translate(originalPos(this.axisRotateR, this.axisRotateAngle).x, originalPos(this.axisRotateR, this.axisRotateAngle).y);
    ctx.rotate(this.rotate * degToPi);
    ctx.scale(this.scale, this.scale);
    // 大淡圓
    ctx.beginPath();
    ctx.arc(4, 0, circleBigR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 175, 95, 0.21)';
    ctx.fill();
    // 小淡圓
    ctx.beginPath();
    ctx.arc(-20, 0, circleSmallR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 175, 95, 0.21)';
    ctx.fill();
    // 主體圓
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    // 小三圓
    ctx.beginPath();
    ctx.fillStyle = globalColor.white;
    // ctx.arc(subAxisRotateR, 0, 2.4, 0, Math.PI * 2);
    ctx.arc(subAxisRotateR * Math.cos(60 * degToPi), subAxisRotateR * Math.sin(60 * degToPi), 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(subAxisRotateR * Math.cos(180 * degToPi), subAxisRotateR * Math.sin(180 * degToPi), 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(subAxisRotateR * Math.cos(300 * degToPi), subAxisRotateR * Math.sin(300 * degToPi), 2.4, 0, Math.PI * 2);
    ctx.fill();
    // 神經
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
    ctx.restore();
    // 繪製圓形子彈
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }


  update(idx) {
    this.beginAppear && this.appear(this.isBossGenerate);
    this.beginAppear = false;
    enemyMethods.approach(this);
    // 更新圓形子彈
    this.bullets.forEach((bullet, idx, arr) => {
      bullet.update(idx, arr);
    });
    // 當圓形自身在旋轉時，圓形不要移動
    if (!this.isRotating) {
      this.axisRotateAngle += this.axisRotateAngleV;
    }
    // 每 4-8 秒，自身旋轉一次
    const rotateTime = new Date();
    if ((rotateTime - this.beforeRotateTime) > getRandom(4000, 8000)) {
      this.isRotating = true;
      TweenLite.to(this, 0.4, {
        // rotate: this.axisRotateAngle - 180,
        // rotate: this.axisRotateAngle % 360,
        rotate: this.axisRotateAngle,
        ease: Power2.easeOut,
        // 自身旋轉完後射擊
        onComplete: () => {
          this.shoot();
          this.isRotating = false;
        },
      });
      this.beforeRotateTime = rotateTime;
    }
    // 當圓形撞上 shooter
    enemyMethods.hitShooter(game.circles, idx, 'circle', this.axisRotateR, this.axisRotateAngle);
  }


  shoot() {
    // 射 1-2 發
    for (let i = 0; i < getRandom(1, 2); i += 1) {
      const timer = setTimeout(() => {
        this.bullets.push(new CirBullet({
          p: {
            x: originalPos(this.axisRotateR, this.axisRotateAngle).x,
            y: originalPos(this.axisRotateR, this.axisRotateAngle).y,
          },
          rotateAngle: this.rotate,
          moveX: -this.r - 10,
          // rotateAngle: Math.sin(this.rotate * degToPi),
          axisRotateR: this.axisRotateR,
        }));
        clearTimeout(timer);
        // 間隔 0.2-0.4 秒
      }, i * getRandom(200, 400));
    }
    gameCrawler.textContent = Math.random() >= 0.9 ? 'UNDER ATTACK' : 'ATTACK!';
  }


  appear(isBossGenerate) {
    gameCrawler.textContent = 'ENEMY IS COMING';
    // gameCrawler.innerHTML = '<i class="fas fa-exclamation-triangle"></i>ENEMY IS COMING!';
    TweenLite.to(this, 0.8, {
      scale: 1,
      ease: Back.easeOut.config(1.7),
    });
    TweenLite.from(this, 1.6, {
      rotate: 0,
      ease: Back.easeOut.config(1.7),
    });
    if (isBossGenerate) {
      TweenLite.to(this, 1.6, {
        axisRotateR: `+=${getRandom(80, 160)}`,
        ease: Power2.easeOut,
      });
    }
  }
}



class CirBullet {
  constructor(args) {
    const def = {
      p: {
        x: 0,
        y: 0,
      },
      axisRotateR: 0,
      color: globalColor.orange,
      moveX: 0,
      moveXV: -3,
      // v: 4,
      rotateAngle: 0,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    // console.log(this.rotateAngle);
    ctx.save();
      ctx.translate(this.p.x, this.p.y);
      ctx.rotate(this.rotateAngle * degToPi); 
      ctx.beginPath();
      ctx.arc(this.moveX, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    ctx.restore();
  }
  update(idx, arr) {
    // 圓形子彈移動
    this.moveX += this.moveXV;
    // 子彈擊中 shooter
    enemyMethods.attackShooter(this, idx, arr);
  }
}