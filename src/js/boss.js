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
      beforeGenerateEnemyTime: new Date(),
      beginAppear: true,
      isAppearing: false,
      isDisappeared: false,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
      ctx.translate(originalPos(this.axisRotateR, this.axisRotateAngle).x, originalPos(this.axisRotateR, this.axisRotateAngle).y);
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
  }
  update() {
    // boss 出現
    this.beginAppear && this.appear();
    this.beginAppear = false;
    if (!this.isAppearing && !this.isDisappeared) {
      // 產生敵人
      const generateEnemyTime = new Date();
      if (generateEnemyTime - this.beforeGenerateEnemyTime > 2000) {
        this.generateEnemy();
        this.beforeGenerateEnemyTime = generateEnemyTime;
      }
      this.axisRotateAngle += this.axisRotateAngleV;
      this.rotate += this.rotateV;
    }
  }
  appear() {
    this.isDisappeared = false;
    this.isAppearing = true;
    gameCrawler.textContent = '⚠ BOSS IS COMING';
    // setTimeout(() => {
      TweenLite.to(this, 1.2, {
        scale: 1,
        ease: Expo.easeOut,
      });
      TweenLite.from(this, 1.6, {
        axisRotateAngle: '-=45',
        rotate: '-=45',
        ease: Expo.easeOut,
        onComplete: () => {
          this.isAppearing = false;
        },
      });
    // }, 3000);
    setTimeout(() => {
      this.disappear();
    }, 4000);
  }
  disappear() {
    this.isDisappeared = true;
    TweenLite.to(this, 1.2, {
      scale: 0,
      ease: Expo.easeOut,
    });
    TweenLite.to(this, 1.6, {
      axisRotateAngle: '-=45',
      rotate: '-=45',
      ease: Expo.easeOut,
      // onComplete: () => {
      //   this.isDisappearing = false;
      // },
    });
    setTimeout(() => {
      this.appear();
    }, 4000);
  }
  generateEnemy() {
    // game.circles.push(new Circle({
    //   axisRotateR: this.axisRotateR,
    //   axisRotateAngle: this.axisRotateAngle % 360,
    //   isBossGenerate: true,
    // }));
    // game.triangles.push(new Triangle({
    //   axisRotateR: this.axisRotateR,
    //   axisRotateAngle: this.axisRotateAngle % 360,
    //   rotate: this.axisRotateAngle % 360,
    //   isBossGenerate: true,
    // }));
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
      isBossGenerate: true,
    }));
  }
}