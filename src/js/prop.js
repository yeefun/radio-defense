/* 道具 class */
class Prop {
  constructor(args) {
    const def = {
      img: new Image(),
      src: '',
      axisRotateR: 0,
      axisRotateAngle: 0,
      r: 32,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    if (!this.img.src) {
      this.img.src = this.src;
      // ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.msImageSmoothingEnabled = ctx.imageSmoothingEnabled = false;
    }
    if (this.img.complete) {
      ctx.save();
      ctx.translate(originalPos(this.axisRotateR, this.axisRotateAngle).x, originalPos(this.axisRotateR, this.axisRotateAngle).y);
      ctx.drawImage(this.img, 0, 0);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.arc(this.img.width / 2, this.img.height / 2, this.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  update(idx) {
    this.axisRotateR -= 3.2;
    // 當道具撞上 shooter 主體
    const shooter = game.shooter;
    // 判斷是否撞上
    if ((this.axisRotateR + this.r) <= (shooter.r + (shooter.cirSolidLineW / 2))) {
      game.props.splice(idx, 1);
      const propName = this.src.replace('../img/', '').split('.')[0];
      shooter.getProp(propName);
    }
  }
}