/* 
 ** 敵人方法
 */
const enemyMethods = {
  // 逼近 shooter
  approach(enemy) {
    const axisRotateR = enemy.axisRotateR;
    const isPolygon = typeof(axisRotateR) === 'object';
    if (!enemy.axisRotateRV) {
      const shooter = game.shooter;
      const shooterBody = (shooter.r + (shooter.cirSolidLineW / 2));
      const distance = (isPolygon ? axisRotateR.whole : (axisRotateR - enemy.r)) - shooterBody;
      const seconds =  getRandom(30, 40);
      enemy.axisRotateRV = -(distance / (seconds * updateFPS));
    }
    if (isPolygon) {
      if (enemy.HP.whole) {
        axisRotateR.small = axisRotateR.big = axisRotateR.whole += enemy.axisRotateRV;
      } else {
        // 重物引力較強
        axisRotateR.big += enemy.axisRotateRV * getRandom(3, 4);
        // 輕物引力較弱
        axisRotateR.small += enemy.axisRotateRV * getRandom(1, 4);
      }
    } else {
      enemy.axisRotateR += enemy.axisRotateRV;
    }
  },


  // 死亡效果
  dieEffect(enemyR, effectX, effectY, colorRGB, isBoss = false) {
    let dieTime = 1;
    let effect = () => {
      if (!game.isPause) {
        dieTime += 1;
      }
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = `rgba(${colorRGB}, ${(48 - dieTime) / 46})`;
      ctx.fillStyle = `rgba(${colorRGB}, ${(48 - dieTime) / 230})`;
      ctx.shadowColor = `rgba(${colorRGB}, 0.48)`;
      ctx.shadowBlur = 2;
      ctx.lineWidth = 2;
      const effectR = enemyR * baseLog(3, (((dieTime - 2) / 46) * 8) + 1);
      ctx.arc(effectX, effectY, effectR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      // }
      if (dieTime < 48) {
        requestAnimationFrame(effect);
      }
    }
    requestAnimationFrame(effect);
    if (!isBoss) {
      setTimeout(() => {
        gameCrawler.textContent = 'ENEMY DIES😇';
      }, 0);
    }
    // playSound('duo', 'F4', '4n');
    playSound('synth', 'G2', '8n', 0, 25);
    playSound('duo', 'F2', '4n', 0, 15);
    playSound('duo', 'E2', '4n', 0, 10);
  },


  // 敵人撞擊 shooter 判定
  hitShooter(enemies, enemyIdx, type, enemyAxisRotateR, enemyAxisRotateAngle) {
    const enemy = enemies[enemyIdx];
    const shooter = game.shooter;
    let shieldAngleRange;
    if (shooter.state !== 'shield') {
      shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= (135 * degToPi) && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= (225 * degToPi);
    } else {
      shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= (90 * degToPi) && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= (270 * degToPi);
    }
    // const shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= (135 * degToPi) && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= (225 * degToPi);
    // 判斷是多邊形或其它敵人撞上 shooter
    const judgeWhatEnemyHit = function () {
      if (type !== 'big' && type !== 'small') {
        enemies.splice(enemyIdx, 1);
        // 移除敵人效果
        if (type !== 'whole') {
          const colorRGB = type === 'circle' ? '245, 175, 95' : '54, 118, 187';
          enemyMethods.dieEffect(enemy.r, originPos(enemyAxisRotateR, enemyAxisRotateAngle).x, originPos(enemyAxisRotateR, enemyAxisRotateAngle).y, colorRGB);
        } else {
          const polygonR = (34 + 22) / 2;
          enemyMethods.dieEffect(polygonR, enemy.originPos(type).x, enemy.originPos(type).y, '231, 70, 93');
        }
      } else {
        enemy.HP[type] -= 1;
        const polygonR = type === 'big' ? (34 + 22) / 2 : (23 + 21) / 2;
        enemyMethods.dieEffect(polygonR, enemy.originPos(type).x, enemy.originPos(type).y, '231, 70, 93');
        if (enemy.HP.big === 0 && enemy.HP.small === 0) {
          enemies.splice(enemyIdx, 1);
        }
      }
    }
    // 當敵人撞上 shooter 主體
    if (enemyAxisRotateR <= (shooter.r + (shooter.cirSolidLineW / 2))) {
      // shooter.HP -= 1;
      judgeWhatEnemyHit();
      enemyMethods.attackShooterResult();
      playSound('membrane', 'B4');
      // 當敵人撞上 shooter 護盾
    } else if (shieldAngleRange && (enemyAxisRotateR <= (shooter.shieldR + (shooter.shieldLineW / 2)))) {
      judgeWhatEnemyHit();
      shooter.isProtect = true;
      gameCrawler.textContent = 'BLOCK😉';
      playSound('membrane', 'D4');
    }
  },


  // 敵人子彈擊中 shooter 判定
  attackShooter(bullet, bulletIdx, bullets, bulletLen = 0) {
    const shooter = game.shooter;
    const shooterBody = shooter.r + (shooter.cirSolidLineW / 2);
    const shooterShield = shooter.shieldR + (shooter.shieldLineW / 2);
    // 當敵人子彈擊中 shooter 主體
    if (Math.abs(bullet.moveX) >= (bullet.axisRotateR - (shooterBody + bulletLen))) {
      // 子彈擊中後
      enemyMethods.attackShooterResult();
      // 移除敵人子彈
      bullets.splice(bulletIdx, 1);
      bullet.isBoss ? playSound('mono', 'C2', '8n', 0, -10) : playSound('membrane', 'B4');
    }
    // 當敵人子彈射中 shooter 的護盾
    const bulletRotate = bullet.isBoss ? bullet.rotateAngle + 90 : bullet.rotateAngle;
    const angleGap = Math.abs((mouseMoveAngle / degToPi) - ((bulletRotate % 360) + (bulletRotate < 0 ? 360 : 0)));
    let shieldAngleRange;
    if (shooter.state !== 'shield') {
      shieldAngleRange = (angleGap >= 135) && (angleGap <= 225);
    } else {
      shieldAngleRange = (angleGap >= 90) && (angleGap <= 270);
    }
    if (shieldAngleRange && (Math.abs(bullet.moveX) >= (bullet.axisRotateR - (shooterShield + bulletLen)))) {
      // 移除子彈
      bullets.splice(bulletIdx, 1);
      gameCrawler.textContent = 'BLOCK😉';
      playSound('membrane', 'D4');
    }
  },


  // 敵人撞擊或子彈擊中 shooter 後
  attackShooterResult() {
    if (!game.isStart || (game.currentLevel === 10 && !game.boss)) return;
    const shooter = game.shooter;
    const shooterHPBarOriginW = 216;
    // 命條減 1/3
    const shooterHPBarW = shooterHPBar.offsetWidth - (shooterHPBarOriginW / 3);
    shooter.isAttacked = true;
    // shooter 命減 1
    // shooter.HP -= 1;
    shooterHPBar.style.width = `${shooterHPBarW < 0 ? 0 : shooterHPBarW}px`;
    // 若 shooter 已經沒有命條
    if (shooterHPBarW <= 0) {
      // 若 shooter 還有愛心
      if (shooter.hearts) {
        // 減掉一顆愛心
        const shooterHeart = document.querySelectorAll('.panel__game-heart');
        shooterHeart[0].parentNode.removeChild(shooterHeart[0]);
        shooter.hearts -= 1;
        // 回復命條
        shooterHPBar.style.width = `${shooterHPBarOriginW}px`;
      } else {
        // 如果沒有愛心，結束遊戲
        game.endGame();
        playSound('synth', 'A3');
        playSound('synth', 'E2', '8n', 160);
        playSound('synth', 'A2', '8n', 320);
        clearTimeout(game.crawlerClearedTimer);
        gameCrawler.textContent = `YOU, ${game.playerName}💀, ARE DEAD`;
        return;
      }
    }
    gameCrawler.textContent = Math.random() >= 0.5 ? 'OUCH😣' : 'UGGH😫';
  },


  bossDieResult() {
    let boss = game.boss;
    enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '245, 175, 95', true);
    setTimeout(() => {
      enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '54, 118, 187', true);
    }, 300);
    setTimeout(() => {
      enemyMethods.dieEffect(264, originPos(boss.axisRotateR, boss.axisRotateAngle).x, originPos(boss.axisRotateR, boss.axisRotateAngle).y, '231, 70, 93', true);
    }, 600);
    game.boss = null;
    // 改變背景音樂
    bgm.pause();
    bgm.currentTime = 0;
    victoryBgm.play();
    victoryBgm.volume = 0.5;
    // 3 秒後，結束遊戲
    setTimeout(() => {
      game.endGame();
    }, 3000);
    clearTimeout(game.crawlerClearedTimer);
    gameCrawler.textContent = 'BOSS DIES!!!🎊';
  }
}