class Polygon {
  constructor(args) {
    const def = {
      axisRotateR: {
        whole: 0,
        big: 0,
        small: 0,
      },
      axisRotateAngle: {
        whole: 0,
        big: 0,
        small: 0,
      },
      rotate: {
        whole: 0,
        big: 0,
        small: 0,
      },
      HP: {
        whole: 1,
        big: 1,
        small: 1,
      },
      axisRotateRV: 0,
      rotateV: 0,
      color: globalColor.red,
      // 是否正好要分裂
      isJustSplite: true,
      scale: 0,
      beginAppear: true,
      isBossGenerate: false,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }


  originPos(form) {
    return {
      x: (gameW / 2) + this.axisRotateR[form] * Math.cos(this.axisRotateAngle[form] * degToPi),
      y: (gameH / 2) + this.axisRotateR[form] * Math.sin(this.axisRotateAngle[form] * degToPi),
    };
  }


  draw() {
    if (this.HP.whole) {
      ctx.save();
      ctx.translate(this.originPos('whole').x, this.originPos('whole').y);
      ctx.rotate(this.rotate.whole * degToPi);
      ctx.scale(this.scale, this.scale);
      // 主體多邊形
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(21 * Math.cos(8 * degToPi), 21 * Math.sin(8 * degToPi));
      ctx.$triLineTo(23, 70);
      ctx.$triLineTo(23, 150);
      ctx.$triLineTo(34, 202);
      ctx.$triLineTo(22, 255);
      ctx.$triLineTo(22, 324);
      ctx.closePath();
      ctx.fill();
      // 右淡五邊形
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.moveTo(9.6, -2);
      ctx.$triLineTo(22, 324);
      ctx.$triLineTo(21, 8);
      ctx.$triLineTo(23, 70);
      ctx.$triLineTo(10, 36);
      ctx.closePath();
      ctx.fill();
      // 下淡四邊形
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
      ctx.moveTo(10 * Math.cos(40 * degToPi), 10 * Math.sin(40 * degToPi));
      ctx.$triLineTo(23, 70);
      ctx.$triLineTo(23, 150);
      ctx.lineTo(-8.8, 0);
      ctx.closePath();
      ctx.fill();
      // 閃電
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
        ctx.rotate(this.rotate.big * degToPi);
        // 大分裂主體
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(23 * Math.cos(70 * degToPi), 23 * Math.sin(70 * degToPi));
        ctx.$triLineTo(23, 150);
        ctx.$triLineTo(34, 202);
        ctx.$triLineTo(22, 255);
        ctx.closePath();
        ctx.fill();
        // 大分裂內下四邊形
        ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
        ctx.beginPath();
        ctx.moveTo(-8.8, 0);
        ctx.$triLineTo(4.8, 64);
        ctx.$triLineTo(23, 70);
        ctx.$triLineTo(23, 150);
        ctx.closePath();
        ctx.fill();
        // 大分裂左閃電
        drawLightning({
          x: -12,
          y: -8
        }, 0.6);
        ctx.restore();
      }
      // 小分裂四邊形
      if (this.HP.small) {
        ctx.save();
        ctx.translate(this.originPos('small').x, this.originPos('small').y);
        ctx.rotate(this.rotate.small * degToPi);
        // 小分裂主體
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(23 * Math.cos(70 * degToPi), 23 * Math.sin(70 * degToPi));
        ctx.$triLineTo(22, 255);
        ctx.$triLineTo(22, 324);
        ctx.$triLineTo(21, 8);
        ctx.closePath();
        ctx.fill();
        // 小分裂內下三角形
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.21)';
        ctx.moveTo(10 * Math.cos(40 * degToPi), 10 * Math.sin(40 * degToPi));
        ctx.$triLineTo(4.8, 64);
        ctx.$triLineTo(23, 70);
        ctx.closePath();
        ctx.fill();
        // 小分裂內右五邊形
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.moveTo(9.6, -2);
        ctx.$triLineTo(22, 324);
        ctx.$triLineTo(21, 8);
        ctx.$triLineTo(23, 70);
        ctx.$triLineTo(10, 36);
        ctx.closePath();
        ctx.fill();
        // 小分裂閃電
        drawLightning({
          x: 10,
          y: -8
        }, 0.5);
        ctx.restore();
      }
    }
  }


  update(idx) {
    this.beginAppear && this.appear(this.isBossGenerate);
    this.beginAppear = false;
    enemyMethods.approach(this);
    // 如果尚未分裂
    if (this.HP.whole) {
      this.rotate.whole = this.rotate.big = this.rotate.small += this.rotateV;
      // 當多邊形撞上 shooter
      game.isStart && enemyMethods.hitShooter(game.polygons, idx, 'whole', this.axisRotateR.whole, this.axisRotateAngle.whole);
    } else {
      // let rotateDirection;
      // 如果正好要分裂
      if (this.isJustSplite) {
        // const rotateOriginPos = 90 - 70;
        // const rotateDirection = (((this.rotate.whole % 360) >= rotateOriginPos) && ((this.rotate.whole % 360) < (180 + rotateOriginPos))) ? -1 : 1;
        const rotateDirection = Math.random() >= 0.5 ? 1 : -1;
        TweenLite.to(this.axisRotateAngle, 2.4, {
          big: `+=${getRandom(15, 30) * rotateDirection}`,
          small: `-=${getRandom(15, 30) * rotateDirection}`,
          ease: Circ.easeOut,
        });
        TweenLite.to(this.axisRotateR, 2.4, {
          big: `+=${getRandom(50, 150)}`,
          small: `+=${getRandom(50, 150)}`,
          ease: Circ.easeOut,
        });
        TweenLite.to(this.rotate, 2.4, {
          big: `+=${getRandom(180, 270)}`,
          small: `-=${getRandom(180, 270)}`,
          ease: Circ.easeOut,
        });
        // gameCrawler.textContent = 'ENEMY SPLITS';
        this.isJustSplite = false;
      }
      // 當大分裂撞上 shooter
      if (this.HP.big) {
        // 重物自轉較慢
        this.rotate.big += this.rotateV * 1.4;
        enemyMethods.hitShooter(game.polygons, idx, 'big', this.axisRotateR.big, this.axisRotateAngle.big);
      }
      // 當小分裂撞上 shooter
      if (this.HP.small) {
        // 輕物自轉較快
        this.rotate.small -= this.rotateV * 1.6;
        enemyMethods.hitShooter(game.polygons, idx, 'small', this.axisRotateR.small, this.axisRotateAngle.small);
      }
    }
  }


  appear(isBossGenerate) {
    gameCrawler.textContent = '⚠ ENEMY IS COMING';
    TweenLite.to(this, 0.8, {
      scale: 1,
      ease: Back.easeOut.config(1.7),
    });
    if (isBossGenerate) {
      const rotateNum = getRandom(40, 80);
      const rNum = getRandom(40, 80);
      TweenLite.to(this.axisRotateAngle, 1.6, {
        whole: `-=${rotateNum}`,
        big: `-=${rotateNum}`,
        small: `-=${rotateNum}`,
        ease: Power2.easeOut,
      });
      TweenLite.to(this.axisRotateR, 1.6, {
        whole: `+=${rNum}`,
        big: `+=${rNum}`,
        small: `+=${rNum}`,
        ease: Power2.easeOut,
      });
    }
    game.isStart && playSound('synth', 'C4', '4n');
  }
}