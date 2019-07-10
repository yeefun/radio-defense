class Triangle {
  constructor(args) {
    const def = {
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
      isBossGenerate: false,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }


  
  draw() {
    const triOuterBigR = this.r + 4;
    const triInnerBigR = this.r - 16;
    const triInnerSmallR = this.r - 22;
    ctx.save();
    // 淡三角
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
    ctx.restore();
    // 主體三角
    ctx.beginPath();
    ctx.moveTo(this.r * Math.cos(60 * degToPi), this.r * Math.sin(60 * degToPi));
    ctx.$triLineTo(this.r, 180);
    ctx.$triLineTo(this.r, 300);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    // 大白三角
    ctx.translate(0, -2.8);
    ctx.fillStyle = globalColor.white;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.$triLineTo(triInnerBigR, 90);
    ctx.$triLineTo(triInnerBigR, 150);
    ctx.closePath();
    ctx.fill();
    // 小白三角
    ctx.translate(8 * Math.cos(-40 * degToPi), 8 * Math.sin(-40 * degToPi))
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.$triLineTo(triInnerSmallR, 90);
    ctx.$triLineTo(triInnerSmallR, 150);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // 繪製三角子彈
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }



  update(idx) {
    this.beginAppear && this.appear(this.isBossGenerate);
    this.beginAppear = false;
    game.isStart && enemyMethods.approach(this);
    // 更新三角子彈
    this.bullets.forEach((bullet, idx, arr) => {
      bullet.update(idx, arr);
    });
    // 每 4-8 秒，三角移動 + 自身旋轉
    const rotateAxisAngleTime = new Date();
    let randomRotateAngle;
    if (rotateAxisAngleTime - this.beforeRotateAxisAngleTime > getRandom(4000, 8000)) {
      // 旋轉時不發射子彈
      if (this.shootTimer) {
        clearTimeout(this.shootTimer);
      }
      randomRotateAngle = (Math.random() >= 0.25 ? 1 : -1) * getRandom(45, 75);
      // 以 0.8 秒移動
      TweenLite.to(this, 0.8, {
        axisRotateAngle: `+=${randomRotateAngle}`,
        ease: Power0.easeNone,
      });
      // 以 1.2 秒自身旋轉
      TweenLite.to(this, 1.2, {
        rotate: `+=${randomRotateAngle + 360}`,
        ease: Power2.easeInOut,
        onComplete: () => {
          // 移動完後發射子彈
          // 當遊戲尚未開始、暫停，或此三角形已死掉，便不發射子彈
          if (!game.isStart || game.isPause || this.HP === 0) return;
          this.shoot();
          // 發射一顆子彈後，每 2.4-7.2 秒發射第二發子彈
          this.shootTimer = setTimeout(() => {
            if (!game.isStart || this.HP === 0) return;
            this.shoot();
          }, getRandom(2400, 7200));
        }
      });
      this.beforeRotateAxisAngleTime = rotateAxisAngleTime;
    }
    // 當生命值剩 2，派副三角形攻擊
    if (this.HP === 2 && !this.isGeneratedSub) {
      for (let i = 1; i <= 2; i += 1) {
        game.subTris.push(new TriSub({
          axisRotateR: this.axisRotateR,
          axisRotateAngle: this.axisRotateAngle,
          rotate: this.rotate,
          order: i,
        }));
      }
      gameCrawler.textContent = 'COUNTERATTACK🤛';
      this.isGeneratedSub = true;
      playSound('synth', 'C6', '16n');
    }
    // 當三角形撞上 shooter
    enemyMethods.hitShooter(game.triangles, idx, 'triangle', this.axisRotateR, this.axisRotateAngle);
  }



  shoot() {
    this.bullets.push(new TriBullet({
      p: {
        x: originPos(this.axisRotateR, this.axisRotateAngle).x,
        y: originPos(this.axisRotateR, this.axisRotateAngle).y,
      },
      axisRotateR: this.axisRotateR,
      rotateAngle: this.rotate,
    }));
    gameCrawler.textContent = Math.random() >= 0.8 ? 'UNDER ATTACK🤕' : 'ATTACK⚡️';
    playSound('membrane', 'G5');
  }



  appear(isBossGenerate) {
    gameCrawler.textContent = '⚠ ENEMY IS COMING';
    TweenLite.to(this, 0.8, {
      scale: 1,
      ease: Back.easeOut.config(1.7),
    });
    let rotateNum = 0;
    if (isBossGenerate) {
      rotateNum = getRandom(40, 80);
      const rNum = getRandom(40, 80);
      TweenLite.to(this, 1.6, {
        axisRotateAngle: `+=${rotateNum}`,
        axisRotateR: `+=${rNum}`,
        ease: Power2.easeOut,
      });
    }
    TweenLite.to(this, 1.6, {
      rotate: `+=${rotateNum + 360}`,
      ease: Back.easeOut.config(1.7),
    });
    game.isStart && playSound('synth', 'B4', '4n');
  }
}



class TriSub {
  constructor(args) {
    const def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      // r: 26 * 0.4,
      r: 10.4,
      rotate: 0,
      rotateV: 4,
      color: globalColor.blue,
      HP: 2,
      isReproduceMoving: false,
      order: 0,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    const triOuterBigR = this.r + 1.6;
    const triInnerBigR = this.r - 6.4;
    const triInnerSmallR = this.r - 8.8;
    ctx.save();
    // 淡三角
    ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
    // ctx.scale(0.4, 0.4);
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
    ctx.restore();
    // 主體三角
    ctx.beginPath();
    ctx.moveTo(this.r * Math.cos(0), this.r * Math.sin(0));
    ctx.lineTo(this.r * Math.cos(120 * degToPi), this.r * Math.sin(120 * degToPi));
    ctx.lineTo(this.r * Math.cos(240 * degToPi), this.r * Math.sin(240 * degToPi));
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    // 大白三角
    ctx.translate(-1.28, -0.64);
    ctx.fillStyle = globalColor.white;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(triInnerBigR * Math.cos(30 * degToPi), triInnerBigR * Math.sin(30 * degToPi));
    ctx.lineTo(triInnerBigR * Math.cos(90 * degToPi), triInnerBigR * Math.sin(90 * degToPi));
    ctx.closePath();
    ctx.fill();
    // 小白三角
    ctx.translate(0, -3.52);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(triInnerSmallR * Math.cos(30 * degToPi), triInnerSmallR * Math.sin(30 * degToPi));
    ctx.lineTo(triInnerSmallR * Math.cos(90 * degToPi), triInnerSmallR * Math.sin(90 * degToPi));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  update(idx) {
    this.rotate += this.rotateV;
    if (!this.isReproduceMoving) {
      TweenLite.to(this, 0.8, {
        axisRotateAngle: `${this.order === 1 ? '+=' : '-='}10`,
        ease: Power2.easeOut,
        onComplete: () => {
          TweenLite.to(this, 1.6, {
            axisRotateR: 0,
            ease: Power1.easeIn,
          });
        }
      });
      this.isReproduceMoving = true;
    }
    // 當小三角形撞上 shooter
    enemyMethods.hitShooter(game.subTris, idx, 'triangle', this.axisRotateR, this.axisRotateAngle);
  }
}



class TriBullet {
  constructor(args) {
    const def = {
      p: {
        x: 0,
        y: 0,
      },
      moveX: 0,
      moveXV: -4.5,
      rotateAngle: 0,
      color: globalColor.blue,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
    ctx.translate(this.p.x, this.p.y);
    ctx.rotate(this.rotateAngle * degToPi);
    ctx.translate(this.moveX, 0);
    // 主體三角子彈
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.$triLineTo(38, 174);
    ctx.$triLineTo(16.8, 200);
    ctx.closePath();
    ctx.fill();
    // 淡三角子彈
    ctx.fillStyle = 'rgba(54, 118, 187, 0.34)';
    ctx.beginPath();
    ctx.moveTo(-16.4, 0);
    ctx.$triLineTo(38, 174);
    ctx.$triLineTo(15.6, 168);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  update(idx, arr) {
    // 三角子彈移動
    this.moveX += this.moveXV;
    // 子彈擊中 shooter
    enemyMethods.attackShooter(this, idx, arr, 37.8);
    // 當子彈超出邊界
    this.beyondBoundary(idx, arr);
  }
  // 當子彈超出邊界
  beyondBoundary(idx, arr) {
    // Math.sqrt(856 * 856 + 624 * 624) = 1059.3
    if (this.moveX <= -1060) {
      arr.splice(idx, 1);
    }
  }
}