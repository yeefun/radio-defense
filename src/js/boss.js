class Boss {
  constructor(args) {
    const def = {
      axisRotateR: 0,
      axisRotateAngle: 0,
      rotate: 0,
      scale: 0,
      // axisRotateRV: 1,
      axisRotateAngleV: 1,
      rotateV: 1,
      bullets: [],
      HP: 24,
      beforeGenerateEnemyTime: new Date(),
      beginAppear: true,
      isAppearing: false,
      isDisappeared: false,
      appearTimes: 0,
      appearTimer: null,
      disappearTimer: null,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
      ctx.scale(this.scale, this.scale);
      ctx.rotate(this.rotate * degToPi);
      // 透明頭
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
      ctx.fill();
      // 黃頭
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
      ctx.fill();
      // 裝飾內透明頭
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
      ctx.fill();
      // 右白肩
      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(18, -6);
      ctx.lineTo(18 + 8, -6);
      ctx.lineTo(18 + 8 + 8, 15);
      ctx.lineTo(18 + 8 + 8, 36 + 6);
      ctx.lineTo(18, 36 + 6);
      ctx.closePath();
      ctx.fill();
      // 左白肩
      ctx.fillStyle = globalColor.white;
      ctx.beginPath();
      ctx.moveTo(-18, -6);
      ctx.lineTo(-18 - 8, -6);
      ctx.lineTo(-18 - 8 - 8, 15);
      ctx.lineTo(-18 - 8 - 8, 36 + 6);
      ctx.lineTo(-18, 36 + 6);
      ctx.closePath();
      ctx.fill();
      // 右紅翼
      ctx.fillStyle = globalColor.red;
      ctx.beginPath();
      ctx.moveTo(18 + 8 + 8, 9);
      ctx.lineTo(18 + 8 + 8 + 8, 9);
      ctx.lineTo(18 + 8 + 8 + 8 + 16, 36 + 6);
      ctx.lineTo(18 + 8 + 8 + 8 + 16, 36 + 6 + 8);
      ctx.lineTo(18 + 8 + 8, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill();
      // 左藍翼
      ctx.fillStyle = globalColor.blue;
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4, 9);
      ctx.lineTo(-18 - 8 - 8 - 8 + 4, 9);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 + 4, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill();
      // 右灰風口
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(18 + 8 + 8, 36 + 6 + 8);
      ctx.lineTo(18 + 8 + 8, 36 + 6 + 8 + 6);
      ctx.lineTo(18 + 8 + 8 + 16, 36 + 6 + 8 + 6);
      ctx.lineTo(18 + 8 + 8 + 16, 36 + 6 + 8);
      ctx.fill();
      // 左灰風口
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 + 4, 36 + 6 + 8 + 6);
      ctx.lineTo(-18 - 8 - 8 - 16 + 4, 36 + 6 + 8 + 6);
      ctx.lineTo(-18 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.fill();
      // 右裝飾白圈
      ctx.strokeStyle = globalColor.white;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(18 + 8 + 8 + 11, 36 + 6 - 2, 4.4, 0, Math.PI * 2);
      ctx.stroke();
      // 左裝飾黃叉
      ctx.strokeStyle = globalColor.orange;
      // ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 + 4 - 3.2, 9 + 16);
      ctx.lineTo(-18 - 8 - 8 + 4 - 3.2 - 9.6, 9 + 16 + 9.6);
      ctx.moveTo(-18 - 8 - 8 + 4 - 3.2 - 9.6, 9 + 16);
      ctx.lineTo(-18 - 8 - 8 + 4 - 3.2, 9 + 16 + 9.6);
      ctx.stroke();
      // 左裝飾透明四邊形
      ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.beginPath();
      ctx.moveTo(-18 - 8 - 8 - 8 - 16 + 4 + 4, 36 + 6 - 8.25);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6);
      ctx.lineTo(-18 - 8 - 8 - 8 - 16 + 4, 36 + 6 + 8);
      ctx.lineTo(-18 - 8 - 8 - 6 + 4, 36 + 6 + 8);
      ctx.closePath();
      ctx.fill();
    ctx.restore();
    // 繪製 boss 子彈
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }
  update() {
    // boss 出現
    this.beginAppear && this.appear();
    this.beginAppear = false;
    if (!this.isAppearing && !this.isDisappeared) {
    }
    // 更新 boss 子彈
    this.bullets.forEach((bullet, idx, arr) => {
      bullet.update(idx, arr);
    });
  }
  appear() {
    if (game.isEnd) return;
    this.appearTimes += 1;
    this.isDisappeared = false;
    this.isAppearing = true;
    gameCrawler.textContent = '⚠ BOSS IS COMING';
    TweenLite.to(this, 1.2, {
      scale: 1,
      ease: Expo.easeOut,
    });
    const rotateNum = getRandom(45, 135);
    TweenLite.to(this, 1.6, {
      axisRotateAngle: `+=${rotateNum}`,
      rotate: `+=${rotateNum}`,
      ease: Expo.easeOut,
      onComplete: () => {
        this.isAppearing = false;
      },
    });
    if (this.appearTimes && this.appearTimes % 3) {
      setTimeout(() => {
        if (this.HP === 0 || game.isPause) return;
        this.shoot();
      }, getRandom(1000, 2000));
    } else {
      setTimeout(() => {
        if (this.HP === 0 || game.isPause) return;
        this.generateEnemy();
      }, getRandom(1000, 2000));
    }
    this.disappearTimer = setTimeout(() => {
      if (this.HP === 0 || game.isPause) return;
      this.disappear();
    }, getRandom(3000, 4000));
    playSound('membrane', 'A4', '4n');
  }
  disappear() {
    if (game.isEnd) return;
    this.isDisappeared = true;
    TweenLite.to(this, 1.2, {
      scale: 0,
      ease: Expo.easeOut,
    });
    const rotateNum = getRandom(45, 225);
    TweenLite.to(this, 1.6, {
      axisRotateAngle: `+=${rotateNum}`,
      rotate: `+=${rotateNum}`,
      ease: Expo.easeOut,
    });
    this.appearTimer = setTimeout(() => {
      if (this.HP === 0 || game.isPause) return;
      this.appear();
    }, 2000);
    playSound('membrane', 'F3', '4n');
  }
  shoot() {
    this.bullets.push(new BossBullet({
      p: {
        x: originPos(this.axisRotateR, this.axisRotateAngle).x,
        y: originPos(this.axisRotateR, this.axisRotateAngle).y,
      },
      rotateAngle: this.rotate,
      axisRotateR: this.axisRotateR,
    }));
    playSound('mono', 'F2', '4n', 0, -10);
    setTimeout(() => {
      this.bullets.push(new BossBullet({
        p: {
          x: originPos(this.axisRotateR, this.axisRotateAngle).x,
          y: originPos(this.axisRotateR, this.axisRotateAngle).y,
        },
        rotateAngle: this.rotate,
        waveLength: 14,
        axisRotateR: this.axisRotateR,
      }));
      playSound('mono', 'F2', '4n', 0, -10);
    }, 200);
  }
  generateEnemy() {
    let num;
    const chooseEnemy = () => {
      num = getRandom(1, 3);
      switch (num) {
        case 1:
          game.circles.push(new Circle({
            axisRotateR: this.axisRotateR,
            axisRotateAngle: this.axisRotateAngle % 360,
            axisRotateAngleV: -(getRandom(2, 8) / 10),
            rotate: getRandom(0, 360),
            isBossGenerate: true,
          }));
          break;
        case 2:
          game.triangles.push(new Triangle({
            axisRotateR: this.axisRotateR,
            axisRotateAngle: this.axisRotateAngle % 360,
            axisRotateAngleV: getRandom(2, 8) / 10,
            rotate: this.axisRotateAngle % 360,
            isBossGenerate: true,
          }));
          break;
        case 3:
          const rotate = getRandom(0, 360);
          game.polygons.push(new Polygon({
            axisRotateR: {
              whole: this.axisRotateR,
              big: this.axisRotateR,
              small: this.axisRotateR,
            },
            axisRotateAngle: {
              whole: this.axisRotateAngle % 360,
              big: this.axisRotateAngle % 360,
              small: this.axisRotateAngle % 360,
            },
            rotate: {
              whole: rotate,
              big: rotate,
              small: rotate,
            },
            rotateV: getRandom(4, 8) / 10,
            isBossGenerate: true,
          }));
          break;
        default:
          break;
      }
    }
    chooseEnemy();
    chooseEnemy();
    if (Math.random() >= 0.5) {
      setTimeout(() => {
        chooseEnemy();
      }, 400);
    }
  }
}

class BossBullet {
  constructor(args) {
    const def = {
      p: {
        x: 0,
        y: 0,
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
      isBoss: true,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
      ctx.translate(this.p.x, this.p.y);
      ctx.rotate((this.rotateAngle - 90) * degToPi);
      // 開始畫 boss 子彈
      drawWaveBullet(this, 'moveX', 2.4, 'rgba(245, 175, 95, 0.72)');
    ctx.restore();
  }
  update(idx, arr) {
    // boss 子彈移動
    this.moveX += this.moveXV;
    enemyMethods.attackShooter(this, idx, arr);
  }
}