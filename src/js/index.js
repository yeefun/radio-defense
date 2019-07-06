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
  // amp: 8,
  // freq: 0.3,
  // testAngle: 40,
// }

// const gui = new dat.GUI();
// gui.add(controls, 'testAngle', 0, 90).step(1).onChange((value) => {});
// gui.add(controls, 'freq', 0, 1).step(0.1).onChange((value) => {});

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const starsBtn = document.getElementById('stars-btn');
const backBtn = document.getElementById('back-btn');
const restartBtnStars = document.getElementById('restart-btn--stars');

const cover = document.getElementById('cover');
const gamePanel = document.getElementById('game-panel');
const batteryInfo = document.getElementById('battery-info');
const shooterHPBar = document.getElementById('hp');
const heartWrapper = document.getElementById('heart-wrapper');
const prop = document.getElementById('prop');
const propImg = document.getElementById('prop__img');
const propLastTime = document.getElementById('prop__last-time');
const batteryNum = document.getElementById('battery-num');
const result = document.getElementById('game-result');
// const resultNum = document.getElementById('result-num');
const panel = document.getElementById('panel');
const container = document.getElementById('container');
const keyboard = document.getElementById('keyboard');
const gameTime = document.getElementById('game-time');
const gameLevel = document.getElementById('game-level');
const gameCrawler = document.getElementById('game-crawler');
const playerName = document.getElementById('player-name');

const resultBoss = document.getElementById('result-boss');
const resultBattery = document.getElementById('result-battery');
const resultBullet = document.getElementById('result-bullet');
// const totalPlayers = document.getElementById('total-players');
const rankingNum = document.getElementById('ranking-num');

const resultRanking = document.getElementById('result-ranking');
const resultScore = document.getElementById('result-score');
const resultStars = document.getElementById('result-stars');

// const share = document.getElementById('share');
const bgm = document.getElementById('bgm');
const victoryBgm = document.getElementById('victory-bgm');

const starWrapper1 = document.getElementById('star-wrapper1');
const starWrapper2 = document.getElementById('star-wrapper2');
const starWrapper3 = document.getElementById('star-wrapper3');

const shareFb = document.getElementById('share-fb');
const shareTwitter = document.getElementById('share-twitter');




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
      isStart: false,
      isEnd: false,
      isPause: false,
      blockV: {
        x: -2,
        y: 2,
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
      isDisplayStars: false,
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  init() {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keyup', handleKeyup);
    handlePlayerName();
    startBtn.addEventListener('click', () => {
      if (!this.checkPlayerName()) return;
      this.startGame();
    });
    restartBtn.addEventListener('click', () => {
      this.startGame();
    });
    restartBtnStars.addEventListener('click', () => {
      this.startGame();
    });
    this.drawCover();
    this.render();
    this.update();
    // 初始化方格移動速率與計時器
    this.setBlockV();
    // 緩慢恢復 shooter 生命條
    this.recoverShooterHPBar();
    starsBtn.addEventListener('click', () => {
      resultRanking.classList.add('dpn');
      resultScore.classList.add('dpn');
      resultStars.classList.remove('dpn');
      result.classList.add('t20');
      if (!this.isDisplayStars) {
        this.handleGameStars();
      }
      this.isDisplayStars = true;
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
      const url = 'https://yeefun.github.io/radio-defense';
      const name = 'szyeefun';
      window.open(`http://twitter.com/share?url=${encodeURIComponent(url)}&via=${encodeURIComponent(name)}`, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });
  }
  render() {
    // if (!this.isPause) {
    ctx.fillStyle = globalColor.blueDark;
    ctx.fillRect(0, 0, gameW, gameH);
    // 繪製方格
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
    }
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
    if (this.isStart) {
      // 繪製滑鼠
      this.drawMouse();
    }
    requestAnimationFrame(() => {
      this.render();
    });
  }
  update() {
    updateTime += 1;
    if (!this.isPause && !this.isEnd) {
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
  // 設置封面
  drawCover() {
    this.shooter = new Shooter();
    // 圓形
    this.circles.push(new Circle({
      axisRotateR: getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5),
      axisRotateAngle: 225,
      axisRotateAngleV: -(getRandom(2, 8) / 10),
      rotate: getRandom(0, 360),
    }));
    // 三角形
    this.triangles.push(new Triangle({
      axisRotateR: getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5),
      axisRotateAngle: 45,
      axisRotateAngleV: (getRandom(2, 8) / 10),
      rotate: 45,
    }));
    // 多邊形
    const rotateR = getRandom(gameHalfDiagonalL / 2, gameHalfDiagonalL / 1.5);
    const rotate = getRandom(0, 360);
    const rotateV = (getRandom(4, 8) / 10);
    this.polygons.push(new Polygon({
      axisRotateR: {
        whole: rotateR,
        big: rotateR,
        small: rotateR,
      },
      axisRotateAngle: {
        whole: 315,
        big: 315,
        small: 315,
      },
      rotate: {
        whole: rotate,
        big: rotate,
        small: rotate,
      },
      rotateV,
    }));
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
  // 開始遊戲（當讀者按下 'Start Play' or 'Restart' 按鈕）
  startGame() {
    this.isStart = true;
    this.isEnd = false;
    // 移除封面
    cover.style.display = 'none';
    // 顯示遊戲介面
    gamePanel.style.display = 'block';
    // 電池資訊歸零
    this.batteryNum = 0;
    batteryNum.textContent = this.batteryNum;
    // 重設生命條
    shooterHPBar.style.width = '216px';
    // 取得玩家名
    this.playerName = playerName.value;
    // 初始化 shooter
    this.shooter = new Shooter();
    // 三個愛心命
    heartWrapper.innerHTML = '';
    for (let i = 0; i < this.shooter.hearts; i++) {
      const heart = document.createElement('DIV');
      heart.classList.add('panel__game-heart');
      heartWrapper.appendChild(heart);
    }
    // 清空敵人與子彈
    this.circles.forEach((circle) => {
      circle.bullets = [];
    });
    this.triangles.forEach((triangle) => {
      triangle.bullets = [];
      triangle.HP = 0;
    });
    this.circles = [];
    this.triangles = [];
    this.polygons = [];
    if (this.boss) {
      this.boss.bullets = [];
      this.boss = null;
    }
    // 隱藏預設滑鼠
    container.style.cursor = 'none';
    // 隱藏結果
    result.classList.add('op0');
    // 讓滑鼠點擊無效
    panel.style.pointerEvents = 'none';
    // 顯示獲得電池資訊
    batteryInfo.classList.remove('op0');
    // 顯示鍵盤指示
    keyboard.classList.remove('op0');
    // 清空關卡字
    gameLevel.textContent = '';
    // 回到第 0 關
    this.currentLevel = 0;
    // 倒數計時 2 秒
    this.countdownSeconds = 3;

    gameCrawler.textContent = `👋${this.playerName}👋`;
    gameTime.textContent = `00:0${this.countdownSeconds}”`;
    const countdownStartTime = () => {
      setTimeout(() => {
        if (this.countdownSeconds === 0) {
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
    }
    countdownStartTime();
    playSound('synth', 'C#5');
    playSound('synth', 'E5', '8n', 160);
    // 改變背景音樂
    victoryBgm.pause();
    victoryBgm.currentTime = 0;
    bgm.play();
    bgm.volume = 0.5;
    // 遊戲結果返回第一頁
    resultRanking.classList.remove('dpn');
    resultScore.classList.remove('dpn');
    resultStars.classList.add('dpn');
    result.classList.remove('t20');
    // 將遊戲結果換成 loading 圖示
    const loadingIcon = '<img src="./img/loading.svg" alt="loading icon" />';
    rankingNum.innerHTML = loadingIcon;
    starWrapper1.innerHTML = loadingIcon;
    starWrapper2.innerHTML = loadingIcon;
    starWrapper3.innerHTML = loadingIcon;
    // 開啟讓 stars 重新取資料的開關
    this.isDisplayStars = false;
  }
  // 遊戲結束
  endGame() {
    this.isStart = false;
    this.isEnd = true;
    // 貼上電池數量
    // resultNum.textContent = this.batteryNum;
    // 填上結果
    if (this.currentLevel !== 10) {
      resultBoss.textContent = 'NO';
    } else {
      resultBoss.textContent = this.beatBossSeconds;
    }
    resultBattery.textContent = this.batteryNum;
    resultBullet.textContent = this.shooter.bulletNum;
    // 顯示結果
    result.classList.remove('op0');
    // 隱藏電池分數資訊
    batteryInfo.classList.add('op0');
    // 隱藏鍵盤指示
    keyboard.classList.add('op0');
    // 移除道具顯示介面
    prop.classList.add('op0');
    // 顯示預設滑鼠
    container.style.cursor = 'auto';
    // 讓滑鼠可以點擊
    panel.style.pointerEvents = 'auto';
    this.handleGameResult();
    clearTimeout(this.countdownTimer);
    clearTimeout(this.countupTimer);
    clearTimeout(this.propGeneratedTimer);
  }
  // 暫停遊戲
  pauseGame() {
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
      const boss = game.boss;
      if (boss.isDisappeared) {
        clearTimeout(boss.appearTimer);
        boss.appear();
      } else {
        clearTimeout(boss.disappearTimer);
        boss.disappear();
      }
    }
  }
  handleGameResult() {
    const name = this.playerName;
    const level = this.currentLevel;
    const battery = this.batteryNum;
    const bullet = this.shooter.bulletNum;
    let boss;
    if (level !== 9) {
      boss = 'no';
    } else {
      boss = this.beatBossSeconds;
    }
    axios.get('https://script.google.com/a/g.ntu.edu.tw/macros/s/AKfycbwwNUeevxFlQaLzP_gdhnTmSC97HgRlpV6DOCUIzg/dev', {
      params: {
        name,
        level,
        battery,
        bullet,
        boss,
      }
    })
    .then((res) => {
      const data = res.data;
      rankingNum.innerHTML = `
        <p>${data.rank}</p>
        <span>/&nbsp;${data.totalPlayers}</span>
      `;
    });
  }
  handleGameStars() {
    axios.get('https://script.google.com/a/g.ntu.edu.tw/macros/s/AKfycbx1L2GmotaRfoSMzVA5BtpC9kiWneoA69IOtoEi/dev')
      .then((res) => {
        const data = res.data;
        const firstStarData = data.firstData;
        const secondStarData = data.secondData;
        const thirdStarData = data.thirdData;
        let starScoreHTML = '';
        function fillStarScore(name, wave, bat, bullet, boss) {
          starScoreHTML = `
            <div class="star__name">${name}</div>
            <div class="star__scores">
              <div class="star__score">
                <div class="star__num">${wave}</div>
                <div class="star__text">WAVES</div>
              </div>
              <div class="star__score">
                <div class="star__num">${bat}</div>
                <div class="star__text">BATTERIES</div>
              </div>
              <div class="star__score">
                <div class="star__num">${bullet}</div>
                <div class="star__text">BULLETS</div>
              </div>
              <div class="star__score">
                <div class="star__num">${boss}</div>
                <div class="star__text">BOSS</div>
              </div>
            </div>
          `;
        }
        fillStarScore(...firstStarData);
        starWrapper1.innerHTML = starScoreHTML;
        fillStarScore(...secondStarData);
        starWrapper2.innerHTML = starScoreHTML;
        fillStarScore(...thirdStarData);
        starWrapper3.innerHTML = starScoreHTML;
      });
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
      if (this.countdownSeconds === 0) {
        this.currentLevel += 1;
        this.setLevel(this.currentLevel);
        return;
      }
      this.countdownSeconds -= 1;
      gameTime.textContent = `00:${this.countdownSeconds < 10 ? `0${this.countdownSeconds}` : this.countdownSeconds}”`;
      this.countdownTime();
    }, 1000);
  }
  countupTime() {
    this.countupTimer = setTimeout(() => {
      this.beatBossSeconds += 1;
      gameTime.textContent = `00:${this.beatBossSeconds < 10 ? `0${this.beatBossSeconds}` : this.beatBossSeconds}”`;
      this.countupTime();
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
    }, 300);
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
            rotateV: getRandom(4, 8) / 10,
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
      case 1:
        this.initLevel('01', 10);
        const rotateNum = 360;
        this.boss = new Boss({
          axisRotateR: getRandom(gameH / 3, gameH / 2.5),
          axisRotateAngle: rotateNum,
          rotate: rotateNum - 90,
        });
        // 設定敵人出場
        // this.setEnemy('circle', 2);
        // this.setEnemy('triangle', 0);
        // this.setEnemy('polygon', 0);
        break;
      // case 2:
      //   this.initLevel('02', 20);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('polygon', 10);
      //   break;
      // case 3:
      //   this.initLevel('03', 20);
      //   this.setEnemy('polygon', 2);
      //   this.setEnemy('circle', 5);
      //   this.setEnemy('polygon', 10);
      //   break;
      // case 4:
      //   this.initLevel('04', 30);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('polygon', 10);
      //   this.setEnemy('triangle', 15);
      //   this.setEnemy('polygon', 20);
      //   break;
      // case 5:
      //   this.initLevel('05', 30);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('circle', 5);
      //   this.setEnemy('polygon', 15);
      //   this.setEnemy('triangle', 20);
      //   break;
      // case 6:
      //   this.initLevel('06', 40);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('triangle', 5);
      //   this.setEnemy('circle', 15);
      //   this.setEnemy('circle', 25);
      //   this.setEnemy('polygon', 25);
      //   break;
      // case 7:
      //   this.initLevel('07', 60);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('circle', 10);
      //   this.setEnemy('triangle', 10);
      //   this.setEnemy('polygon', 15);
      //   this.setEnemy('polygon', 20);
      //   this.setEnemy('triangle', 25);
      //   this.setEnemy('polygon', 25);
      //   this.setEnemy('polygon', 35);
      //   this.setEnemy('triangle', 35);
      //   this.setEnemy('polygon', 40);
      //   this.setEnemy('circle', 45);
      //   this.setEnemy('circle', 50);
      //   break;
      // case 8:
      //   this.initLevel('08', 60);
      //   this.setEnemy('circle', 5);
      //   this.setEnemy('triangle', 10);
      //   this.setEnemy('triangle', 10);
      //   this.setEnemy('polygon', 15);
      //   this.setEnemy('circle', 15);
      //   this.setEnemy('circle', 20);
      //   this.setEnemy('polygon', 30);
      //   this.setEnemy('circle', 35);
      //   this.setEnemy('triangle', 35);
      //   this.setEnemy('polygon', 35);
      //   this.setEnemy('circle', 45);
      //   this.setEnemy('triangle', 45);
      //   this.setEnemy('circle', 50);
      //   this.setEnemy('polygon', 50);
      //   break;
      // case 9:
      //   this.initLevel('09', 30);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('circle', 2);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('triangle', 2);
      //   this.setEnemy('polygon', 10);
      //   this.setEnemy('circle', 15);
      //   this.setEnemy('triangle', 15);
      //   this.setEnemy('polygon', 15);
      //   this.setEnemy('polygon', 25);
      //   break;
      // case 10:
      //   gameLevel.textContent = 'Wave 10';
      //   const rotateNum = getRandom(0, 360);
      //   this.boss = new Boss({
      //     axisRotateR: getRandom(gameH / 3, gameH / 2.5),
      //     axisRotateAngle: rotateNum,
      //     rotate: rotateNum - 90,
      //   });
      //   this.countupTime();
      //   break;
      default:
        break;
    }
    playSound('synth', 'A6');
  }
  checkPlayerName() {
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
}



// Page Loaded
function handleLoad() {
  game = new Game();
  initCanvas();
  game.init();
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