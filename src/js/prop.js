/* 道具 class */
class Prop {
  constructor(args) {
    const def = {
      img: new Image(),
      src: '',
      axisRotateR: 0,
      axisRotateRV: 0,
      axisRotateAngle: 0,
      r: 32,
    }
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    if (!this.img.src) {
      // 防止 Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
      // this.img.width = 44;
      // this.img.height = 44;
      this.img.src = this.src;
    }
    if (this.img.complete) {
      ctx.save();
      ctx.translate(originPos(this.axisRotateR, this.axisRotateAngle).x, originPos(this.axisRotateR, this.axisRotateAngle).y);
      // setTimeout(() => {
      ctx.drawImage(this.img, 0, 0);
      // }, 0);
      // ctx.drawImage(this.img, 0, 0);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.arc(this.img.width / 2, this.img.height / 2, this.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  update() {
    if (!this.axisRotateRV) {
      const seconds = getRandom(5, 8);
      this.axisRotateRV = -(gameHalfDiagonalL / (seconds * updateFPS));
    }
    this.axisRotateR += this.axisRotateRV;
    // 當道具撞上 shooter 主體
    const shooter = game.shooter;
    // 判斷是否撞上
    if ((this.axisRotateR + this.r) <= (shooter.r + (shooter.cirSolidLineW / 2))) {
      // 清掉該道具
      game.prop = '';
      const propName = this.src.replace('./img/', '').split('.')[0];
      shooter.getProp(propName);
    }
  }
}