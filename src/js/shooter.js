class Shooter {
  constructor(args) {
    const def = {
      color: globalColor.white,
      // r: 34 * 0.85,
      r: 28.9,
      // shieldR: (34 + 36) * 0.85,
      shieldR: 60,
      // cirSolidLineW: 6 * 0.85,
      cirSolidLineW: 6,
      // shieldLineW: 4 * 0.85,
      shieldLineW: 4,
      rotateAngle: 0,
      bullets: [],
      bulletNum: 0,
      hearts: 3,
      state: '',
      isAttacked: false,
      isProtect: false,
      beforeShootTime: new Date(),
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    if (!game.isStart && !game.isEnd) return;
    ctx.save();
    // 輪圍
    ctx.translate(gameW / 2, gameH / 2);
    ctx.save();
    ctx.beginPath();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    ctx.shadowBlur = 16;
    ctx.lineWidth = this.cirSolidLineW;
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    if (!this.isAttacked) {
      ctx.strokeStyle = this.color;
    } else {
      ctx.strokeStyle = globalColor.red;
      this.isAttacked = false;
    }
    ctx.stroke();
    // 輪軸
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.$triLineTo(this.r, 0, this.rotateAngle);
    ctx.moveTo(0, 0);
    ctx.$triLineTo(this.r, 120, this.rotateAngle);
    ctx.moveTo(0, 0);
    ctx.$triLineTo(this.r, 240, this.rotateAngle);
    // ctx.lineWidth = 3 * 0.85;
    ctx.lineWidth = 2.55;
    ctx.stroke();
    ctx.restore();
    // 輪圍外虛線
    ctx.strokeStyle = this.color;
    // const outerR = this.r + 22 * 0.85;
    const outerR = this.r + 20;
    for (let i = 0; i < 360; i += 1) {
      const x1 = outerR * Math.cos(i * degToPi + this.rotateAngle);
      const y1 = outerR * Math.sin(i * degToPi + this.rotateAngle);
      const x2 = outerR * Math.cos((i + 1) * degToPi + this.rotateAngle);
      const y2 = outerR * Math.sin((i + 1) * degToPi + this.rotateAngle);
      if (i % 10 < 5) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    // 護盾
    ctx.beginPath();
    ctx.lineWidth = this.shieldLineW;
    // 如果 shooter 狀態為 shield，護盾變為 180°
    if (this.state !== 'shield') {
      ctx.arc(0, 0, this.shieldR, 135 * degToPi + this.rotateAngle, 225 * degToPi + this.rotateAngle);
    } else {
      ctx.arc(0, 0, this.shieldR, 90 * degToPi + this.rotateAngle, 270 * degToPi + this.rotateAngle);
    }
    if (!this.isProtect) {
      ctx.strokeStyle = this.color;
    } else {
      ctx.strokeStyle = globalColor.blue;
      this.isProtect = false;
    }
    ctx.stroke();
    // 砲口
    ctx.beginPath();
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    ctx.shadowBlur = 16;
    ctx.rotate(this.rotateAngle);
    ctx.translate(this.r + 8, 0);
    ctx.moveTo(0, 0);
    // 下方長方形長 13.6、寬（高） 10.2
    // 上方梯形高 11.8、上邊寬 6.8
    ctx.lineTo(0, 6.8);
    ctx.lineTo(10.2, 6.8);
    ctx.lineTo(22.1, 3.4);
    ctx.lineTo(22.1, -3.4);
    ctx.lineTo(10.2, -6.8);
    ctx.lineTo(0, -6.8);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.restore();
    // 發射子彈
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }
  update() {
    this.rotateAngle = mouseMoveAngle;
    this.bullets.forEach((bullet, idx) => {
      bullet.update(idx);
    });
  }
  shoot() {
    const shootTime = new Date();
    if (shootTime - beforeShootTime > 400) {
      let bulletNum;
      // 如果 shooter 狀態為 double，每次射兩發，兩發之間隔 0.16 秒
      if (this.state !== 'double') {
        bulletNum = 1;
      } else {
        bulletNum = 2;
      }
      for (let i = 0; i < bulletNum; i++) {
        if (this.state !== 'wave') {
          setTimeout(() => {
            this.bulletNum += 1;
            this.bullets.push(new ShooterBullet({
              // axisRotateR: 62 * 0.85,
              axisRotateR: 52.7,
              rotateAngle: mouseMoveAngle,
            }));
            playSound('membrane', 'D3');
          }, 160 * i);
        } else {
          setTimeout(() => {
            this.bulletNum += 1;
            this.bullets.push(new ShooterBullet({
              waveLength: getRandom(40, 80),
              waveFreq: getRandom(2, 4) / 10,
              waveAmp: getRandom(4, 8),
              waveFlow: getRandom(4, 8),
              // axisRotateR: 70 * 0.85,
              axisRotateR: 59.5,
              rotateAngle: mouseMoveAngle,
            }));
            playSound('mono', 'F2', '4n', 0, -10);
          }, 160 * i);
        }
      }
      beforeShootTime = shootTime;
    }
  }
  getProp(propName) {
    // 持續秒數
    let lastTime;
    switch (propName) {
      case 'heart':
        this.recoverHeart();
        lastTime = 0;
        gameCrawler.textContent = 'GAIN LIFE💕';
        break;
      case 'crackdown':
        this.drawCrackdownEffect();
        lastTime = 0;
        gameCrawler.textContent = 'BOOM💥';
        break;
      case 'shield':
        lastTime = 25000;
        gameCrawler.textContent = 'EXTEND SHIELD💪';
        break;
      case 'double':
        lastTime = 20000;
        gameCrawler.textContent = 'DOUBLE SHOOT✌️';
        break;
      case 'wave':
        lastTime = 15000;
        gameCrawler.textContent = 'WAVE BULLET🌊';
        break;
      default:
        lastTime = 0;
    }
    // 將道具設為 shooter 的狀態
    this.state = propName;
    // 時間到後，移除道具效果
    const countLastTime = () => {
      setTimeout(() => {
        if (!game.isStart) return;
        if (game.isPause) {
          countLastTime();
        } else {
          lastTime -= 1000;
          if (lastTime > 0) {
            countLastTime();
          } else {
            this.state = '';
            // 重新道具計時
            game.generateProp();
          }
        }
      }, 1000);
    }
    // 顯示道具效果持續時間
    this.displayPropInfo(propName, lastTime);
    if (propName !== 'crackdown') {
      playSound('synth', 'E5');
      playSound('synth', 'G5', '8n', 160);
    }
    countLastTime();
  }
  // 繪製清場效果
  drawCrackdownEffect() {
    let crackdownTime = 1;
    const boss = game.boss;
    const effect = () => {
      if (!game.isPause) {
        crackdownTime += 1;
      }
      ctx.save();
      ctx.beginPath();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.72)';
      ctx.shadowBlur = 2;
      // 透明度從 1 到 0
      ctx.strokeStyle = `rgba(255, 255, 255, ${(100 - crackdownTime) / 98})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${(100 - crackdownTime) / 490})`;
      ctx.lineWidth = 5;
      /**
       * baseLog() 從 0 到 3
       * 所以 (((crackdownTime - 2) / 98) * 26) + 1 為從 1 到 27
       * 清場半徑因此為從 0 到 528
       */
      const effectR = 176 * baseLog(3, (((crackdownTime - 2) / 98) * 26) + 1);
      ctx.arc(gameW / 2, gameH / 2, effectR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      // 清除敵人
      game.circles.forEach((circle, idx) => {
        if (effectR > circle.axisRotateR) {
          enemyMethods.dieEffect(circle.r, originPos(circle.axisRotateR, circle.axisRotateAngle).x, originPos(circle.axisRotateR, circle.axisRotateAngle).y, '245, 175, 95');
          game.circles.splice(idx, 1);
        }
      });
      game.triangles.forEach((triangle, idx) => {
        if (effectR > triangle.axisRotateR) {
          enemyMethods.dieEffect(triangle.r, originPos(triangle.axisRotateR, triangle.axisRotateAngle).x, originPos(triangle.axisRotateR, triangle.axisRotateAngle).y, '54, 118, 187');
          game.triangles.splice(idx, 1);
        }
      });
      game.polygons.forEach((polygon, idx) => {
        if (effectR > polygon.axisRotateR.whole) {
          if (polygon.HP.whole) {
            const polygonWholeR = (34 + 21) / 2;
            enemyMethods.dieEffect(polygonWholeR, polygon.originPos('whole').x, polygon.originPos('whole').y, '231, 70, 93');
          } else {
            if (polygon.HP.big) {
              const polygonBigR = (34 + 22) / 2;
              enemyMethods.dieEffect(polygonBigR, polygon.originPos('big').x, polygon.originPos('big').y, '231, 70, 93');
              game.polygons.splice(idx, 1);
            }
            if (polygon.HP.small) {
              const polygonSmallR = (23 + 21) / 2;
              enemyMethods.dieEffect(polygonSmallR, polygon.originPos('small').x, polygon.originPos('small').y, '231, 70, 93');
              game.polygons.splice(idx, 1);
            }
          }
          game.polygons.splice(idx, 1);
        }
      });
      game.subTris.forEach((subTriangle, idx) => {
        if (effectR > subTriangle.axisRotateR) {
          game.subTris.splice(idx, 1);
        }
      });
      // 清除 boss
      if (game.boss) {
        if (effectR > boss.axisRotateR && boss.HP === 0) {
          enemyMethods.bossDieResult();
        }
      }
      if (crackdownTime < 100) {
        requestAnimationFrame(effect);
      }
    }
    requestAnimationFrame(effect);
    if (boss) {
      boss.HP -= 1;
    }
    // playSound('duo', 'F4', '2n');
    playSound('synth', 'C6', '2n');
    // playSound('synth', 'G2', '8n', 0, 20);
    // playSound('duo', 'F2', '2n', 0, 15);
    // playSound('duo', 'E2', '2n', 0, 10);
    // playSound('duo', 'D2', '8n', 1000, 10);
  }
  // 恢復一個愛心命
  recoverHeart() {
    const heart = document.createElement('DIV');
    heart.classList.add('panel__game-heart');
    heartWrapper.appendChild(heart);
    this.hearts += 1;
  }
  displayPropInfo(propName, lastTime) {
    if (propName === 'crackdown' || propName === 'heart') return;
    prop.classList.remove('op0');
    propImg.src = `./img/${propName}--panel.svg`;
    lastTime /= 1000;  
    propLastTime.textContent = lastTime;
    const countLastTime = () => {
      // const propInfoTimer = setTimeout(() => {
      setTimeout(() => {
        if (!game.isStart) return;
        if (game.isPause) {
          countLastTime();
          return;
        }
        // 遊戲結束時，清除計時器
        // if (!game.isStart) {
        //   clearTimeout(propInfoTimer);
        //   return;
        // }
        lastTime -= 1;
        propLastTime.textContent = lastTime >= 10 ? lastTime : `0${lastTime}`;
        if (lastTime) {
          countLastTime();
        } else {
          prop.classList.add('op0');
          // clearTimeout(propInfoTimer);
        }
      }, 1000);
    }
    countLastTime();
  }
}



class ShooterBullet {
  constructor(args) {
    const def = {
      // bodyLen: 15 * 0.85,
      bodyLen: 12.75,
      axisRotateR: 0,
      color: globalColor.white,
      v: 10,
      rotateAngle: 0,
      waveLength: 40,
      waveFreq: 0.2,
      waveAmp: 4,
      waveFlow: 4,
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw() {
    ctx.save();
    ctx.translate(gameW / 2, gameH / 2);
    ctx.rotate(this.rotateAngle);
    // 如果 shooter 狀態非 wave
    if (game.shooter.state !== 'wave') {
      // 殘影
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      // ctx.arc(-7 * 0.85 + this.axisRotateR, 0, 3 * 0.85, 0, Math.PI * 2);
      ctx.arc(-5.95 + this.axisRotateR, 0, 2.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      // ctx.arc(-12 * 0.85 + this.axisRotateR, 0, 2 * 0.85, 0, Math.PI * 2);
      ctx.arc(-10.2 + this.axisRotateR, 0, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      // ctx.arc(-15 * 0.85 + this.axisRotateR, 0, 1 * 0.85, 0, Math.PI * 2);
      ctx.arc(-12.75 + this.axisRotateR, 0, 0.85, 0, Math.PI * 2);
      ctx.fill();
      // 園底
      ctx.beginPath();
      ctx.fillStyle = this.color;
      // ctx.arc(0 + this.axisRotateR, 0, 4 * 0.85, 0, Math.PI * 2);
      ctx.arc(0 + this.axisRotateR, 0, 3.4, 0, Math.PI * 2);
      ctx.fill();
      // 尖頭
      ctx.beginPath();
      // ctx.moveTo(3 * 0.85 + this.axisRotateR, 3 * 0.85);
      ctx.moveTo(2.55 + this.axisRotateR, 2.55);
      ctx.lineTo(this.bodyLen + this.axisRotateR, 0);
      // ctx.lineTo(3 * 0.85 + this.axisRotateR, -3 * 0.85);
      ctx.lineTo(2.55 + this.axisRotateR, -2.55);
      ctx.closePath();
      ctx.fill();
    } else {
      drawWaveBullet(this, 'axisRotateR', 1.6, 'rgba(255, 255, 255, 0.72)');
    }
    ctx.restore();
  }
  update(bulletIdx) {
    // 移動子彈
    this.axisRotateR += this.v;
    let anglePanFn;
    let shotRRangeFn;
    // 判斷子彈為哪一類型
    // 一般類型
    if (game.shooter.state !== 'wave') {
      const bulletMoveLen = this.axisRotateR + this.bodyLen;
      // 判斷子彈有無射中圓形
      game.circles.forEach((circle, cirIdx) => {
        anglePanFn = () => {
          return Math.asin(circle.r / circle.axisRotateR);
        }
        shotRRangeFn = () => {
          return (bulletMoveLen >= (circle.axisRotateR - (circle.r / 2))) && (bulletMoveLen <= (circle.axisRotateR + (circle.r / 2)));
        }
        this.attackEnemy(circle, cirIdx, game.circles, bulletIdx, anglePanFn, shotRRangeFn, '245, 175, 95');
      });
      // 判斷子彈有無射中三角形
      game.triangles.forEach((triangle, triIdx) => {
        anglePanFn = () => {
          const lengthX = triangle.axisRotateR + (triangle.r / 2);
          const lengthY = (triangle.r / 2) * Math.sqrt(3);
          return Math.atan2(lengthY, lengthX);
        }
        shotRRangeFn = () => {
          return (bulletMoveLen >= triangle.axisRotateR) && (bulletMoveLen <= (triangle.axisRotateR + (triangle.r / 2)));
        }
        this.attackEnemy(triangle, triIdx, game.triangles, bulletIdx, anglePanFn, shotRRangeFn, '54, 118, 187');
      });
      // 判斷子彈有無射中多邊形
      game.polygons.forEach((polygon, polyIdx) => {
        // 當多邊形未分裂
        if (polygon.HP.whole) {
          shotRRangeFn = () => {
            const sideA = polygon.axisRotateR.whole;
            return (bulletMoveLen >= sideA) && (bulletMoveLen <= (sideA + 9));
          }
          this.attackPolygon(polygon, polyIdx, 'whole', 34, 21, (360 - (202 + 75)), (8 + 75), 75, bulletIdx, shotRRangeFn);
        } else {
          // 當多邊形分裂
          // 大分裂
          if (polygon.HP.big) {
            shotRRangeFn = () => {
              const sideA = polygon.axisRotateR.big;
              return (bulletMoveLen >= sideA + 8) && (bulletMoveLen <= (sideA + 16));
            }
            this.attackPolygon(polygon, polyIdx, 'big', 34, 23, ((202 + 44) - 180), (180 - (70 + 44)), 44, bulletIdx, shotRRangeFn);
          }
          // 小分裂
          if (polygon.HP.small) {
            shotRRangeFn = () => {
              const sideA = polygon.axisRotateR.small;
              return (bulletMoveLen >= sideA + 8) && (bulletMoveLen <= (sideA + 16));
            }
            this.attackPolygon(polygon, polyIdx, 'small', 22, 23, ((255 + 17.5) - 180), (180 - (70 + 17.5)), 17.5, bulletIdx, shotRRangeFn);
          }
        }
      });
      // 判斷子彈有無射中 boss
      const boss = game.boss;
      if (boss) {
        anglePanFn = () => {
          return Math.asin(18 / (boss.axisRotateR + 6));
        }
        shotRRangeFn = () => {
          return (bulletMoveLen >= (boss.axisRotateR + 9 + 8)) && (bulletMoveLen <= (boss.axisRotateR + 28));
        }
        this.attackEnemy(boss, NaN, null, bulletIdx, anglePanFn, shotRRangeFn, '255, 255, 255', 'ordinary', true);
      }
    } else {
      // 波狀類型
      // 有無射中圓形
      game.circles.forEach((circle, cirIdx) => {
        anglePanFn = () => {
          return Math.asin(circle.r / circle.axisRotateR);
        }
        shotRRangeFn = () => {
          return (this.axisRotateR >= (circle.axisRotateR - (circle.r / 2))) && (this.axisRotateR <= (circle.axisRotateR + (circle.r / 2)));
        }
        this.attackEnemy(circle, cirIdx, game.circles, bulletIdx, anglePanFn, shotRRangeFn, '245, 175, 95', 'wave');
      });
      // 有無射中三角形
      game.triangles.forEach((triangle, triIdx) => {
        anglePanFn = () => {
          const lengthX = triangle.axisRotateR + (triangle.r / 2);
          const lengthY = (triangle.r / 2) * Math.sqrt(3);
          return Math.atan2(lengthY, lengthX);
        }
        shotRRangeFn = () => {
          return (this.axisRotateR >= triangle.axisRotateR) && (this.axisRotateR <= (triangle.axisRotateR + (triangle.r / 2)));
        }
        this.attackEnemy(triangle, triIdx, game.triangles, bulletIdx, anglePanFn, shotRRangeFn, '54, 118, 187', 'wave');
      });
      // 有無射中多邊形
      game.polygons.forEach((polygon, polyIdx) => {
        // 當多邊形尚未分裂
        if (polygon.HP.whole) {
          shotRRangeFn = () => {
            const sideA = polygon.axisRotateR.whole;
            return (this.axisRotateR >= sideA) && (this.axisRotateR <= (sideA + 9));
          }
          this.attackPolygon(polygon, polyIdx, 'whole', 34, 21, (360 - (202 + 75)), (8 + 75), 75, bulletIdx, shotRRangeFn, 'wave');
        } else {
          // 當多邊形已經分裂
          // 大分裂
          if (polygon.HP.big) {
            shotRRangeFn = () => {
              const sideA = polygon.axisRotateR.big;
              return (this.axisRotateR >= sideA + 8) && (this.axisRotateR <= (sideA + 16));
            }
            this.attackPolygon(polygon, polyIdx, 'big', 34, 23, ((202 + 44) - 180), (180 - (70 + 44)), 44, bulletIdx, shotRRangeFn, 'wave');
          }
          // 小分裂
          if (polygon.HP.small) {
            shotRRangeFn = () => {
              const sideA = polygon.axisRotateR.small;
              return (this.axisRotateR >= sideA + 8) && (this.axisRotateR <= (sideA + 16));
            }
            this.attackPolygon(polygon, polyIdx, 'small', 22, 23, ((255 + 17.5) - 180), (180 - (70 + 17.5)), 17.5, bulletIdx, shotRRangeFn, 'wave');
          }
          // 如果大小分裂都已被擊斃，移除此多邊形
          if (polygon.HP.big === 0 && polygon.HP.small === 0) {
            game.polygons.splice(polyIdx, 1);
            // 電池加一
            game.batteryNum += 1;
            batteryNum.textContent = game.batteryNum;
          }
        }
      });
      // 判斷子彈有無射中 boss
      const boss = game.boss;
      if (boss) {
        anglePanFn = () => {
          return Math.asin(18 / (boss.axisRotateR + 6));
        }
        shotRRangeFn = () => {
          return (this.axisRotateR >= (boss.axisRotateR + 9 + 8)) && (this.axisRotateR <= (boss.axisRotateR + 28));
        }
        this.attackEnemy(boss, NaN, null, bulletIdx, anglePanFn, shotRRangeFn, '255, 255, 255', 'wave', true);
      }
    }
    // 當子彈超出邊界
    this.beyondBoundary(bulletIdx);
  }
  // 攻擊敵人（圓形、三角形）
  // FIXME 當敵人太靠近會打不到
  attackEnemy(enemy, enemyIdx, enemies, bulletIdx, anglePanFn, shotRRangeFn, colorRGB, type = 'ordinary', isBoss = false) {
    /**
     * 射中角度範圍
     * 圓形：取得兩個外切線所構成角度的一半
     * 三角形：取得射中角度範圍的一半
     */
    const enemyAnglePan = anglePanFn();
    const enemyAngleMinus = (enemy.axisRotateAngle % 360) * degToPi - enemyAnglePan;
    const enemyAngleAdd = (enemy.axisRotateAngle % 360) * degToPi + enemyAnglePan;
    const shotAngleRange = this.judgeShotAngleRange(enemyAngleMinus, enemyAngleAdd, type);
    // 射中距離範圍
    const shotRRange = shotRRangeFn();

    if (!gameCrawler.textContent) {
      gameCrawler.textContent = Math.random() >= 0.5 ? 'FIRE🔥' : 'BANG👊';
    }
    // 判斷子彈有無射中敵人
    if (shotAngleRange && shotRRange) {
      // 移除子彈
      game.shooter.bullets.splice(bulletIdx, 1);
      // 扣敵人 1 生命值
      enemy.HP -= 1;
      if (type === 'ordinary') {
        playSound('membrane', 'D2');
      } else {
        playSound('mono', 'C2', '8n', 0, -10);
      }
      // 若敵人生命值為 0
      if (enemy.HP === 0) {
        if (isBoss) {
          // 移除 boss
          enemyMethods.bossDieResult();
          return;
        } else {
          // 移除敵人
          enemies.splice(enemyIdx, 1);
          // 移除效果
          enemyMethods.dieEffect(enemy.r, originPos(enemy.axisRotateR, enemy.axisRotateAngle).x, originPos(enemy.axisRotateR, enemy.axisRotateAngle).y, colorRGB);
          // 電池加一
          game.batteryNum += 1;
          batteryNum.textContent = game.batteryNum;
        }
      }
      gameCrawler.textContent = Math.random() >= 0.8 ? "BULL'S-EYE😤" : 'HIT👍';
    }
  }
  // 攻擊多邊形
  attackPolygon(polygon, polyIdx, form, sideB1Len, sideB2Len, angleAB1, angleAB2, rotateAngleJudge, bulletIdx, shotRRangeFn, type = 'ordinary') {
    const polyAxisRotateAngle = polygon.axisRotateAngle[form];
    const polyRotate = polygon.rotate[form];
    // 取得兩側射中最大角度
    const sideA = polygon.axisRotateR[form];
    const sideB1 = sideB1Len;
    const sideB2 = sideB2Len;
    /**
     * 兩側點愈靠近軸心，夾角便愈大
     *   whole: 8°, 202°
     *   big: 70°, 202°
     *   small: 70°, 255°

     * 相同軸半徑下，當多邊形呈某一角度，兩側點離軸心（幾乎）最近，angleB 相同
     *   whole: axisRotateAngle 180°, rotate 75°
     *     270 - 202 = 68
     *     90 - 8 = 82
     *     (68 + 82) / 2 = 75
     * 
     *   big: axisRotateAngle 0°, rotate 44°
     *     270 - 202 = 68
     *     90 - 70 = 20
     *     (68 + 20) / 2 = 44
     * 
     *   small: axisRotateAngle 0°, rotate 17.5°
     *     270 - 255 = 15
     *     90 - 70 = 20
     *     (15 + 20) / 2 = 17.5
     */
    const sideC1 = cosineFormula(sideA, sideB1, angleAB1);
    const sideC2 = cosineFormula(sideA, sideB2, angleAB2);
    // 當多邊形的 axisRotateAngle、rotate 不同，要加上與減去的角度也不一樣
    const bottomJudge = (polyAxisRotateAngle <= 180) && ((polyRotate % 360) < rotateAngleJudge || (polyRotate % 360) >= (rotateAngleJudge + 180));
    const topJudge = (polyAxisRotateAngle > 180) && ((polyRotate % 360) >= rotateAngleJudge || (polyRotate % 360) < (rotateAngleJudge + 180));
    let angleB1;
    let angleB2;

    if (!gameCrawler.textContent) {
      gameCrawler.textContent = Math.random() >= 0.5 ? 'FIRE🔥' : 'BANG👊';
    }
    if (bottomJudge || topJudge) {
      angleB1 = getAngleB(sideA, sideB2, sideC2);
      angleB2 = getAngleB(sideA, sideB1, sideC1);
    } else {
      angleB1 = getAngleB(sideA, sideB1, sideC1);
      angleB2 = getAngleB(sideA, sideB2, sideC2);
    }
    /**
     * 射中角度範圍
     * 多邊形雖不會繞軸旋轉，axisRotateAngle 固定，但分裂時可能會超過 360°，故 % 360
     */
    const polyAngleMinus = (polyAxisRotateAngle % 360) * degToPi - angleB1;
    const polyAngleAdd = (polyAxisRotateAngle % 360) * degToPi + angleB2;
    const shotAngleRange = this.judgeShotAngleRange(polyAngleMinus, polyAngleAdd, type);
    // 射中距離範圍
    const shotRRange = shotRRangeFn();
    // 判斷子彈有無射中多邊形
    if (shotAngleRange && shotRRange) {
      // 移除子彈
      game.shooter.bullets.splice(bulletIdx, 1);
      // 扣 1 生命值
      polygon.HP[form] -= 1;
      if (form === 'whole') {
        playSound('synth', 'D6', '16n');
      }
      // 若大或小分裂生命值為 0
      if (polygon.HP.big === 0 || polygon.HP.small === 0) {
        // 移除效果
        const polygonR = form === 'big' ? (34 + 22) / 2 : (23 + 21) / 2;
        enemyMethods.dieEffect(polygonR, polygon.originPos(form).x, polygon.originPos(form).y, '231, 70, 93');
      }
      // 如果大小分裂都被擊斃了，那就移除此多邊形
      if (polygon.HP.big === 0 && polygon.HP.small === 0) {
        game.polygons.splice(polyIdx, 1);
        // 電池加一
        game.batteryNum += 1;
        batteryNum.textContent = game.batteryNum;
      }
      gameCrawler.textContent = Math.random() >= 0.8 ? "BULL'S-EYE😤!" : 'HIT👍';
      if (type === 'ordinary') {
        playSound('membrane', 'D2');
      } else {
        playSound('mono', 'C2', '8n', 0, -10);
      }
    }
  }
  // 判斷射中角度範圍
  judgeShotAngleRange(enemyAngleMinus, enemyAngleAdd, type) {
    let shooterRotateAngle;
    // 當敵人 axisRotateAngle 在 360° 附近，且 shooter 槍口朝下（0° 下方）
    if (enemyAngleAdd > Math.PI * 2 && this.rotateAngle < Math.PI) {
      shooterRotateAngle = this.rotateAngle + Math.PI * 2;
    } else if (
      // 當敵人 axisRotateAngle 皆小於 0
      (enemyAngleMinus < 0 && enemyAngleAdd < 0) || 
      // 當敵人 axisRotateAngle 在 0° 附近，且 shooter 槍口朝上（0° 上方）
      (enemyAngleMinus < 0 && enemyAngleAdd > 0 && this.rotateAngle > Math.PI)) {
      shooterRotateAngle = this.rotateAngle - Math.PI * 2;
    } else {
      shooterRotateAngle = this.rotateAngle;
    }
    // 判斷子彈為哪一類型
    // 一般子彈
    if (type !== 'wave') {
      return shooterRotateAngle >= enemyAngleMinus && shooterRotateAngle <= enemyAngleAdd;
    } else {
      // 波狀子彈
      const shooterAnglePan = Math.atan2(this.waveLength, this.axisRotateR);
      const shooterAngleMinus = shooterRotateAngle - shooterAnglePan;
      const shooterAngleAdd = shooterRotateAngle + shooterAnglePan;
      return (enemyAngleMinus <= shooterAngleAdd) && (enemyAngleAdd >= shooterAngleMinus);
    }
  }
  // 當子彈超出邊界
  beyondBoundary(bulletIdx) {
    /**
     * 856 / 2 = 428
     * 624 / 2 = 312
     * Math.sqrt(428 * 428 + 312 * 312) = 529.6
     */
    if (this.axisRotateR >= 530) {
      game.shooter.bullets.splice(bulletIdx, 1);
    }
  }
}