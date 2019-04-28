/* Environment Variable */
const updateFPS = 30;
let updateTime = 0;

const globalColor = {
  red: '#e7465d',
  orange: '#f5af5f',
  yellow: '#f7b52c',
  blue: '#3676bb',
  blueDark: '#001d2e',
  white: '#fff',
}
const props = ['heart', 'crackdown', 'shield', 'double', 'wave'];


/* GUI Controls */
const controls = {
  // amp: 8,
  // freq: 0.3,
}

const gui = new dat.GUI();
// gui.add(controls, 'amp', 0, 30).step(1).onChange((value) => {});
// gui.add(controls, 'freq', 0, 1).step(0.1).onChange((value) => {});

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const cover = document.getElementById('cover');
const gamePanel = document.getElementById('game-panel');
const batteryInfo = document.getElementById('battery-info');
const shooterHPBar = document.getElementById('hp');
const heartWrapper = document.getElementById('heart-wrapper');
const prop = document.getElementById('prop');
const propImg = document.getElementById('prop__img');
const propLastTime = document.getElementById('prop__last-time');
const batteryNum = document.getElementById('battery-num');
const result = document.getElementById('result');
const resultNum = document.getElementById('result-num');
const panel = document.getElementById('panel');
const container = document.getElementById('container');
const keyboard = document.getElementById('keyboard');
const gameTime = document.getElementById('game-time');
const gameLevel = document.getElementById('game-level');
const gameCrawler = document.getElementById('game-crawler');



/* Initialize Canvas Settings */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let ww;
let wh;
let gameW;
let gameH;
let gameHalfDiagonalL;

function initCanvas() {
  gameW = canvas.width;
  gameH = canvas.height;
  gameHalfDiagonalL = Math.round(Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2);
  ww = document.documentElement.clientWidth;
  wh = document.documentElement.clientHeight;
}



const degToPi = Math.PI / 180;
let coverCircle;
let coverTriangle;
let coverPolygon;
let game;



class Game {
  constructor(args) {
    const def = {
      shooter: null,
      prop: null,
      propName: '',
      batteryNum: 0,
      circles: [],
      triangles: [],
      polygons: [],
      subTris: [],
      isStart: true,
      isPause: false,
      blockV: {
        x: -2,
        y: 2,
      },
      currentLevel: 0,
      downTime: 0,
      recoverHPTimer: null,
      countdownTimer: null,
      generatePropTimer: null,
      generatePropInterval: 20,
      boss: null,
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  init() {
    // coverCircle = new Circle({
    //   axisRotateR: 380,
    //   axisRotateAngle: -36,
    //   r: 39,
    // });
    // coverTriangle = new Triangle({
    //   axisRotateR: {
    //     x: 320,
    //     y: 320,
    //   },
    //   axisRotateAngle: 40,
    //   rotate: 32,
    //   r: 44,
    // });
    // coverPolygon = new Polygon({
    //   p: {
    //     x: 72,
    //     y: 96,
    //   },
    //   scale: 1.25,
    // });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keyup', handleKeyup);
    startBtn.addEventListener('click', () => {
      this.startGame();
    }, { once: true });
    restartBtn.addEventListener('click', () => {
      this.restartGame();
    });
    this.startGame();
    this.render();
    this.update();
    // 初始化方格移動速率與計時器
    this.setBlockV();
    // 緩慢恢復 shooter 生命條
    this.recoverShooterHPBar();
  }
  render() {
    // if (!this.isPause) {
    ctx.fillStyle = globalColor.blueDark;
    ctx.fillRect(0, 0, gameW, gameH);
    // if (this.isStart) {
    // 繪製方格
    this.drawBlock();
    // 繪製 shooter
    this.shooter.draw();
    // 繪製每個 circle
    this.circles.forEach((circle) => {
      circle.draw();
    });
    // 繪製每個 triangle
    this.triangles.forEach((triangle) => {
      triangle.draw();
    });
    // 繪製每個 polygon
    this.polygons.forEach((polygon) => {
      polygon.draw();
    });
    // 繪製每個 sub triangle
    this.subTris.forEach((subTriangle) => {
      subTriangle.draw();
    });
    // 繪製 prop（道具）
    this.prop && this.prop.draw();
    // 繪製魔王
    this.boss && this.boss.draw();
    // 繪製滑鼠
    this.drawMouse();
    // } else {
      // this.startGame();
      // this.drawCover();
    // }
    // }
    requestAnimationFrame(() => {
      this.render();
    });
  }
  update() {
    updateTime += 1;
    if (this.isStart && !this.isPause) {
      // 更新 shooter
      this.shooter.update();
      // 更新每個 circle
      this.circles.forEach((circle, idx) => {
        circle.update(idx);
      });
      // 更新每個 triangle
      this.triangles.forEach((triangle, idx) => {
        triangle.update(idx);
      });
      // 更新每個 polygon
      this.polygons.forEach((polygon, idx) => {
        polygon.update(idx);
      });
      // 更新每個 sub triangle
      this.subTris.forEach((subTriangle, idx) => {
        subTriangle.update(idx);
      });
      // 更新 prop（道具）
      this.prop && this.prop.update();
      // 更新魔王
      this.boss && this.boss.update();
    }
    setTimeout(() => {
      this.update();
    }, 1000 / updateFPS);
  }
  // 繪製封面
  drawCover() {
    // if (this.rLogo.complete) {
    //   ctx.drawImage(this.rLogo, gameW / 2 - 12, gameH / 2 - 70, 31 * 1.7, 38 * 1.7);
    // }
    // 中央兩白圈
    // ctx.save();
    //   ctx.translate(gameW / 2, gameH / 2);
    //   ctx.beginPath();
    //   ctx.arc(0, 0, 180, 0, Math.PI * 2);
    //   ctx.strokeStyle = globalColor.white;
    //   ctx.stroke();
    //   ctx.beginPath();
    //   ctx.arc(0, 0, 264, 0, Math.PI * 2);
    //   ctx.globalAlpha = 0.3;
    //   ctx.stroke();
    // ctx.restore();
    // 黃圓
    // coverCircle.draw();
    // coverCircle.update();
    // 藍三角
    // coverTriangle.draw();
    // coverTriangle.update();
    // 紅多邊形
    // coverPolygon.draw();
    // coverPolygon.update();
    // 電池
    // drawBattery({
    //   x: gameW / 2 - 24,
    //   y: gameH / 2 - 52,
    // });
    // R 字小角裝飾
    // ctx.save();
    //   ctx.translate(gameW / 2 + 24, gameH / 2 - 30);
    //   ctx.rotate(-132 * degToPi);
    //   ctx.beginPath();
    //   ctx.moveTo(0, 0);
    //   ctx.lineTo(4, 0);
    //   ctx.lineTo(0, -8.4);
    //   ctx.lineTo(-4.2, 0);
    //   ctx.closePath();
    //   ctx.fillStyle = globalColor.white;
    //   ctx.fill();
    // ctx.restore();
  }
  // 畫方格
  drawBlock() {
    ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 0.4;
      // 畫橫列
      for (let i = 0; i < 18; i += 1) {
        ctx.moveTo(i * 56 + ((updateTime * this.blockV.x) % 56), 0);
        ctx.lineTo(i * 56 + ((updateTime * this.blockV.x) % 56), gameH);
      }
      // 畫直行
      for (let i = 0; i < 14; i += 1) {
        ctx.moveTo(0, i * 52 + ((updateTime * this.blockV.y) % 52));
        ctx.lineTo(gameW, i * 52 + ((updateTime * this.blockV.y) % 52));
      }
      ctx.stroke();
    ctx.restore();
  }
  // 畫滑鼠
  drawMouse() {
    const mouseMovePosX = mouseMovePos.x + gameW / 2;
    const mouseMovePosY = mouseMovePos.y + gameH / 2;
    const length = 12;
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
  }
  // 設定方格移動速率
  setBlockV() {
    setTimeout(() => {
      this.blockV.x = Math.random() * 8 - 4;
      this.blockV.y = Math.random() * 8 - 4;
      this.setBlockV();
    }, 8000);
  }
  // 開始遊戲（當讀者按下 'Start Play' 按鈕）
  startGame() {
    this.isStart = true;
    // 移除封面
    cover.style.display = 'none';
    // 顯示遊戲介面
    gamePanel.style.display = 'block';
    // 初始化 shooter
    this.shooter = new Shooter();
    // 隱藏預設滑鼠
    container.style.cursor = 'none';
    // 讓滑鼠點擊無效
    panel.style.pointerEvents = 'none';
    // 倒數計時 3 秒
    this.downTime = 3;
    gameCrawler.textContent = 'READY!';
    gameTime.textContent = `00:0${this.downTime}”`;
    const countdownStartTime = () => {
      setTimeout(() => {
        if (!this.downTime) {
          this.currentLevel += 1;
          this.setLevel(this.currentLevel);
          // 開始產生道具
          this.generateProp();
          // 定時清除跑馬燈
          const clearCrawler = () => {
            gameCrawler.textContent = '';
            setTimeout(clearCrawler, 2000);
          }
          clearCrawler();
          return;
        }
        this.downTime -= 1;
        gameTime.textContent = `00:0${this.downTime}”`;
        switch (this.downTime) {
          case 2:
            gameCrawler.textContent = 'READY!!';
            break;
          case 1:
            gameCrawler.textContent = 'READY!!!';
            break;
          case 0:
            gameCrawler.textContent = 'GO!';
            break;
          default:
            break;
        }
        countdownStartTime();
      }, 1000);
    }
    countdownStartTime();
  }
  restartGame() {
    this.isStart = true;
    // 重設敵人
    this.circles = [];
    this.triangles = [];
    this.polygons = [];
    this.subTris = [];
    // 電池資訊歸零
    batteryNum.textContent = 0;
    // 重設生命條
    shooterHPBar.style.width = '216px';
    // 重設 shooter
    this.shooter = new Shooter();
    // 隱藏結果
    result.style.opacity = 0;
    // 讓滑鼠點擊無效
    panel.style.pointerEvents = 'none';
    // 顯示獲得電池資訊
    batteryInfo.style.opacity = 1;
    // 顯示鍵盤指示
    keyboard.style.opacity = 1;
    // this.inLevel1 = false;
  }
  // 遊戲結束
  endGame() {
    this.isStart = false;
    // 隱藏電池分數資訊
    batteryInfo.style.opacity = 0;
    // 隱藏鍵盤指示
    keyboard.style.opacity = 0;
    // 貼上電池數量
    resultNum.textContent = this.batteryNum;
    // 顯示結果
    result.style.opacity = 1;
    // 顯示預設滑鼠
    container.style.cursor = 'auto';
    // 讓滑鼠可以點擊
    panel.style.pointerEvents = 'auto';
    // 移除道具顯示介面
    prop.style.opacity = 0;
  }
  // 暫停遊戲
  pauseGame() {
    if (!this.currentLevel) return;
    this.isPause = !this.isPause;
    if (this.isPause) {
      clearTimeout(this.countdownTimer);
      clearTimeout(this.generatePropTimer);
    } else {
      this.countdownTime();
      this.generateProp();
    }
  }
  // 產生道具
  generateProp() {
    if (!this.propName) {
      // 如果已經有 5 顆心，便排除愛心
      if (this.shooter.hearts === 5) {
        this.propName = props[getRandom(1, 4)];
      } else {
        this.propName = props[getRandom(0, 4)];
      }
    }
    // 在當前有道具起作用的狀況下，如果道具不是愛心或清場，那就繼續停止計時
    if (this.prop && this.propName !== 'heart' && this.propName !== 'crackdown') return;
    this.generatePropTimer = setTimeout(() => {
      this.generatePropInterval -= 1;
      if (this.generatePropInterval === 0) {
        this.prop = new Prop({
          src: `../img/${this.propName}.svg`,
          axisRotateR: Math.random() + gameHalfDiagonalL,
          axisRotateAngle: Math.random() * 360,
        });
        this.propName = '';
        // 每 20 秒產生一個道具
        this.generatePropInterval = 20;
      }
      this.generateProp();
    }, 100);
  }
  countdownTime() {
    this.countdownTimer = setTimeout(() => {
      if (!this.downTime) {
        this.currentLevel += 1;
        this.setLevel(this.currentLevel);
        return;
      }
      this.downTime -= 1;
      gameTime.textContent = `00:${this.downTime < 10 ? `0${this.downTime}` : this.downTime}”`;
      // gameTime.textContent = `00:${this.downTime}”`;
      this.countdownTime();
    }, 1000);
  }
  // 自動恢復 shooter 生命條
  recoverShooterHPBar() {
    this.recoverHPTimer = setTimeout(() => {
      if (this.isPause || !this.isStart) {
        this.recoverShooterHPBar();
        return;
      }
      const nowHPW = shooterHPBar.offsetWidth;
      if (nowHPW < 216) {
        const recoverHPBarW = nowHPW + 1;
        shooterHPBar.style.width = `${recoverHPBarW}px`;
      }
      this.recoverShooterHPBar();
    }, 500);
  }
  // 設定關卡
  setLevel(level) {
    switch (level) {
      case 1:
        this.downTime = 4;
        gameTime.textContent = `00:0${this.downTime}”`;
        gameLevel.textContent = 'Wave 01';
        this.countdownTime();
        break;
      case 2:
        this.downTime = 5;
        gameTime.textContent = `00:0${this.downTime}”`;
        gameLevel.textContent = 'Wave 02';
        this.countdownTime();
        break;
      default:
        break;
    }
    // this.boss = new Boss({
    //   axisRotateR: 200,
    //   axisRotateAngle: 90,
    // });;
    // this.circles.push(new Circle({
    //   axisRotateR: 240,
    //   axisRotateAngle: 270,
    //   rotate: 235,
    // }));
    // this.triangles.push(new Triangle({
    //   axisRotateR: 280,
    //   // axisRotateAngle 與 rotate 必須相同
    //   axisRotateAngle: 230,
    //   rotate: 230,
    // }));
    // this.polygons.push(new Polygon({
    //   axisRotateR: {
    //     whole: 280,
    //     big: 280,
    //     small: 280,
    //   },
    //   axisRotateAngle: {
    //     whole: 210,
    //     big: 210,
    //     small: 210,
    //   },
    //   rotate: {
    //     whole: 56,
    //     big: 56,
    //     small: 56,
    //   },
    // }));
  }
}



// Page Loaded
function handleLoad() {
  game = new Game();
  initCanvas();
  game.init();
  // requestAnimationFrame(draw);
  // setInterval(update, 1000 / updateFPS);
}

// load & resize event
window.addEventListener('load', handleLoad);
window.addEventListener('resize', initCanvas);



// Mouse Events & Recording
let mouseMovePos = {}
let mouseMoveAngle = 0;
function handleMouseMove(evt) {
  mouseMovePos.x = evt.x - ww / 2;
  mouseMovePos.y = evt.y - wh / 2;
  const angle = Math.atan2(mouseMovePos.y, mouseMovePos.x);
  mouseMoveAngle = angle < 0 ? (angle + 2 * Math.PI) : angle;
};

let beforeShootTime = new Date();
function handleClick() {
  if (game.isPause) return;
  game.shooter.shoot();
};

function handleKeyup(evt) {
  if (evt.key === 's') {
    game.shooter.shoot();
  }
  if (evt.key === 'p') {
    game.pauseGame();
  }
}