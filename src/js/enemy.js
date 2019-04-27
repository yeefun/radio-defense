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
      const seconds = 30 + (10 * Math.random());
      // const seconds = 100 + (10 * Math.random());
      enemy.axisRotateRV = -(distance / (seconds * updateFPS));
    }
    if (isPolygon) {
      if (enemy.HP.whole) {
        axisRotateR.small = axisRotateR.big = axisRotateR.whole += enemy.axisRotateRV;
      } else {
        axisRotateR.big += enemy.axisRotateRV;
        axisRotateR.small += enemy.axisRotateRV;
      }
    } else {
      enemy.axisRotateR += enemy.axisRotateRV;
    }
  },


  // 死亡效果
  dieEffect(enemyR, effectX, effectY, colorRGB) {
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
  },


  // 敵人撞擊 shooter 判定
  hitShooter(enemies, enemyIdx, type, enemyAxisRotateR, enemyAxisRotateAngle) {
    const enemy = enemies[enemyIdx];
    const shooter = game.shooter;
    const shieldAngleRange = Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) >= (135 * degToPi) && Math.abs(mouseMoveAngle - enemyAxisRotateAngle * degToPi) <= (225 * degToPi);
    // 判斷是多邊形或其它敵人撞上 shooter
    const judgeWhatEnemyHit = function () {
      if (type !== 'polyBig' && type !== 'polySmall') {
        enemies.splice(enemyIdx, 1);
        // 移除敵人效果
        if (type !== 'polyWhole') {
          const colorRGB = type === 'circle' ? '245, 175, 95' : '54, 118, 187';
          enemyMethods.dieEffect(enemy.r, originalPos(enemyAxisRotateR, enemyAxisRotateAngle).x, originalPos(enemyAxisRotateR, enemyAxisRotateAngle).y, colorRGB);
        } else {
          const polygonR = (34 + 22) / 2;
          enemyMethods.dieEffect(polygonR, enemy.originalPos(type).x, enemy.originalPos(type).y, '231, 70, 93');
        }
      } else {
        enemy.HP[type] -= 1;
        const polygonR = type === 'polyBig' ? (34 + 22) / 2 : (23 + 21) / 2;
        enemyMethods.dieEffect(polygonR, enemy.originalPos(type).x, enemy.originalPos(type).y, '231, 70, 93');
        if (!enemy.HP.big && !enemy.HP.small) {
          enemies.splice(enemyIdx, 1);
        }
      }
    }
    // 當敵人撞上 shooter 主體
    if (enemyAxisRotateR <= (shooter.r + (shooter.cirSolidLineW / 2))) {
      // shooter.HP -= 1;
      judgeWhatEnemyHit();
      enemyMethods.attackShooterResult();
      // 當敵人撞上 shooter 護盾
    } else if (shieldAngleRange && (enemyAxisRotateR <= (shooter.shieldR + (shooter.shieldLineW / 2)))) {
      judgeWhatEnemyHit();
      shooter.isProtect = true;
    }
  },


  // 敵人子彈擊中 shooter 判定
  attackShooter(bullet, bulletIdx, bullets, bulletLen = 0) {
    const shooter = game.shooter;
    const shooterBody = shooter.r + (shooter.cirSolidLineW / 2);
    const shooterShield = shooter.shieldR + (shooter.shieldLineW / 2);
    // 當敵人子彈擊中 shooter 主體
    if (-bullet.moveX >= (bullet.axisRotateR - (shooterBody + bulletLen))) {
      // 子彈擊中後
      enemyMethods.attackShooterResult();
      // 移除敵人子彈
      bullets.splice(bulletIdx, 1);
    }
    // 當敵人子彈射中 shooter 的護盾
    // const angleGap = Math.abs(mouseMoveAngle - (bullet.rotateAngle % 360) * degToPi);
    // const shieldAngleRange = angleGap >= (135 * degToPi) && angleGap <= (225 * degToPi);
    const angleGap = Math.abs((mouseMoveAngle / degToPi) - ((bullet.rotateAngle % 360) + (bullet.rotateAngle < 0 ? 360 : 0)));
    const shieldAngleRange = (angleGap >= 135) && (angleGap <= 225);
    if (shieldAngleRange && (-bullet.moveX >= (bullet.axisRotateR - (shooterShield + bulletLen)))) {
      // 移除子彈
      bullets.splice(bulletIdx, 1);
    }
  },


  // 敵人撞擊或子彈擊中 shooter 後
  attackShooterResult() {
    const shooter = game.shooter;
    const shooterHPBarOriginW = 216;
    const shooterHPBarW = shooterHPBar.offsetWidth - (shooterHPBarOriginW / 3);
    shooter.isAttacked = true;
    // shooter 命減 1
    // shooter.HP -= 1;
    shooterHPBar.style.width = `${shooterHPBarW < 0 ? 0 : shooterHPBarW}px`;
    if (shooterHPBarW <= 0) {
      const shooterHeart = document.querySelectorAll('.panel__game-heart');
      // 如果 shooter 還有愛心
      if (shooterHeart.length) {
        // 減掉一個愛心
        shooterHeart[0].parentNode.removeChild(shooterHeart[0]);
        // 命條減 1/3
        shooterHPBar.style.width = `${shooterHPBarOriginW}px`;
      } else {
        // 如果沒有愛心，結束遊戲
        game.endGame();
      }
    }
  },
}