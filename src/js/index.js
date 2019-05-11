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
// const controls = {
//   amp: 8,
//   freq: 0.3,
// }

// const gui = new dat.GUI();
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
      countdownSeconds: 0,
      hpRecoverTimer: null,
      countdownTimer: null,
      propGeneratedTimer: null,
      crawlerClearedTimer: null,
      propGeneratedInterval: 200,
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
    this.countdownSeconds = 3;
    gameCrawler.textContent = 'READY!';
    gameTime.textContent = `00:0${this.countdownSeconds}”`;
    const countdownStartTime = () => {
      setTimeout(() => {
        if (!this.countdownSeconds) {
          this.currentLevel += 1;
          this.setLevel(this.currentLevel);
          // 開始產生道具
          this.generateProp();
          // 開始清除跑馬燈
          this.clearCrawler();
          return;
        }
        this.countdownSeconds -= 1;
        gameTime.textContent = `00:0${this.countdownSeconds}”`;
        switch (this.countdownSeconds) {
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
    this.setLevel(this.currentLevel);
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
    clearTimeout(this.countdownTimer);
  }
  // 暫停遊戲
  pauseGame() {
    if (!this.currentLevel) return;
    this.isPause = !this.isPause;
    if (this.isPause) {
      clearTimeout(this.countdownTimer);
      clearTimeout(this.propGeneratedTimer);
      clearTimeout(this.crawlerClearedTimer);
    } else {
      this.countdownTime();
      this.generateProp();
      this.clearCrawler();
    }
  }
  // 產生道具
  generateProp() {
    // 如果已有道具，便停止計時
    if (this.prop) return;
    this.propGeneratedTimer = setTimeout(() => {
      this.propGeneratedInterval -= 1;
      // 20 秒過後
      if (this.propGeneratedInterval === 0) {
        let propName;
        // 如果大於 5 顆心，便排除愛心
        if (this.shooter.hearts < 5) {
          propName = props[getRandom(0, 4)];
        } else {
          propName = props[getRandom(1, 4)];
        }
        this.prop = new Prop({
          src: `../img/${propName}.svg`,
          axisRotateR: gameHalfDiagonalL,
          axisRotateAngle: getRandom(0, 360),
        });
        // 每 20 (200 * 100) 秒產生一個道具
        this.propGeneratedInterval = 200;
      }
      this.generateProp();
    }, 100);
  }
  // 倒數遊戲時間
  countdownTime() {
    this.countdownTimer = setTimeout(() => {
      if (!this.countdownSeconds) {
        this.currentLevel += 1;
        this.setLevel(this.currentLevel);
        return;
      }
      this.countdownSeconds -= 1;
      gameTime.textContent = `00:${this.countdownSeconds < 10 ? `0${this.countdownSeconds}` : this.countdownSeconds}”`;
      // gameTime.textContent = `00:${this.countdownSeconds}”`;
      this.countdownTime();
    }, 1000);
  }
  // 自動恢復 shooter 生命條
  recoverShooterHPBar() {
    this.hpRecoverTimer = setTimeout(() => {
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
  // 每 3 秒清除一次跑馬燈
  clearCrawler() {
    gameCrawler.textContent = '';
    // CONFUSED 為什麼這樣寫不行？（只會觸發兩次）
    // setTimeout(this.clearCrawler, 3000);
    this.crawlerClearedTimer = setTimeout(() => {
      this.clearCrawler();
    }, 3000);
  }
  // 設定敵人出場
  setEnemy(form, seconds = 0) {
    setTimeout(() => {
      switch (form) {
        case 'circle': {
          this.circles.push(new Circle({
            axisRotateR: getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL),
            axisRotateAngle: getRandom(0, 360),
            axisRotateAngleV: -(getRandom(2, 8) / 10),
            rotate: getRandom(0, 360),
            // rotateV: Math.random() * 0.4 + 0.4,
          }));
          break;
        }
        case 'triangle': {
          // axisRotateAngle 與 rotate 必須相同
          const angle = getRandom(0, 360);
          this.triangles.push(new Triangle({
            axisRotateR: getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL),
            axisRotateAngle: angle,
            axisRotateAngleV: getRandom(2, 8) / 10,
            rotate: angle,
          }));
          break;
        }
        case 'polygon': {
          const rotateR = getRandom(gameHalfDiagonalL / 3, gameHalfDiagonalL / 1.5);
          const rotateAngle = getRandom(0, 360);
          const rotate = getRandom(0, 360);
          const rotateV = (getRandom(4, 8) / 10);
          this.polygons.push(new Polygon({
            axisRotateR: {
              whole: rotateR,
              big: rotateR,
              small: rotateR,
            },
            axisRotateAngle: {
              whole: rotateAngle,
              big: rotateAngle,
              small: rotateAngle,
            },
            rotate: {
              whole: rotate,
              big: rotate,
              small: rotate,
            },
            rotateV,
          }));
          break;
        }
        default:
          break;
      }
    }, seconds * 1000);
  }
  // 初始化關卡
  initLevel(level, seconds) {
    gameLevel.textContent = `Wave ${level}`;
    this.countdownSeconds = seconds;
    gameTime.textContent = `00:${this.countdownSeconds}”`;
    this.countdownTime();
  }
  // 設定關卡
  setLevel(level) {
    switch (level) {
      case 1: {
        this.initLevel('01', 10);
        // 設定敵人出場
        this.setEnemy('circle', 0);
        // this.setEnemy('polygon', 10);
        break;
      }
      case 2: {
        this.initLevel('02', 20);
        this.setEnemy('triangle', 0);
        this.setEnemy('polygon', 10);
        break;
      }
      case 3: {
        this.initLevel('03', 20);
        this.setEnemy('polygon', 0);
        this.setEnemy('circle', 5);
        this.setEnemy('polygon', 10);
        break;
      }
      case 4: {
        this.initLevel('04', 30);
        this.setEnemy('circle', 0);
        this.setEnemy('triangle', 0);
        this.setEnemy('polygon', 10);
        this.setEnemy('triangle', 15);
        this.setEnemy('polygon', 20);
        break;
      }
      case 5: {
        this.initLevel('05', 30);
        this.setEnemy('circle', 0);
        this.setEnemy('circle', 0);
        this.setEnemy('circle', 5);
        this.setEnemy('polygon', 15);
        this.setEnemy('triangle', 20);
        break;
      }
      case 6: {
        this.initLevel('06', 40);
        this.setEnemy('triangle', 0);
        this.setEnemy('triangle', 5);
        this.setEnemy('circle', 15);
        this.setEnemy('circle', 25);
        this.setEnemy('polygon', 25);
        break;
      }
      case 7: {
        this.initLevel('07', 60);
        this.setEnemy('circle', 0);
        this.setEnemy('triangle', 0);
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
      }
      case 8: {
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
      }
      case 9: {
        this.initLevel('09', 30);
        this.setEnemy('circle', 0);
        this.setEnemy('circle', 0);
        this.setEnemy('triangle', 0);
        this.setEnemy('triangle', 0);
        this.setEnemy('polygon', 10);
        this.setEnemy('circle', 15);
        this.setEnemy('triangle', 15);
        this.setEnemy('polygon', 15);
        this.setEnemy('polygon', 25);
        break;
      }
      default:
        break;
    }
    // this.boss = new Boss({
    //   axisRotateR: 200,
    //   axisRotateAngle: 90,
    // });;
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