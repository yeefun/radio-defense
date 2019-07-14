ctx.$triLineTo = function (r, angle, angleAdd = 0) {
  return ctx.lineTo(r * Math.cos(angle * degToPi + angleAdd), r * Math.sin(angle * degToPi + angleAdd));
}

// 繪製波狀子彈
function drawWaveBullet(bullet, originPos, lineWidth, shadowColor) {
  ctx.strokeStyle = bullet.color;
  ctx.lineWidth = lineWidth;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 2;
  // 正半波
  ctx.beginPath();
  for (let i = 0; i < bullet.waveLength; i += 1) {
    const degree = (i * bullet.waveFreq) + (updateTime / bullet.waveFlow);
    ctx.lineTo(bullet[originPos] + (bullet.waveAmp * Math.sin(degree)), i);
  }
  ctx.stroke();
  // 負半波
  ctx.beginPath();
  for (let i = 0; i < bullet.waveLength; i += 1) {
    const degree = (i * bullet.waveFreq) + (updateTime / bullet.waveFlow);
    ctx.lineTo(bullet[originPos] + (bullet.waveAmp * Math.sin(degree)), -i);
  }
  ctx.stroke();
}

// 繪製電池
// function drawBattery(p) {
//   ctx.save();
//     ctx.translate(p.x, p.y);
//     ctx.fillStyle = globalColor.orange;
//     // 瓶身
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(-24, 0);
//     ctx.lineTo(-24, 42);
//     ctx.lineTo(0, 42);
//     ctx.closePath();
//     ctx.fill();
//     // 瓶底
//     ctx.save();
//       ctx.translate(0, 44);
//       ctx.beginPath();
//       ctx.moveTo(0, 0);
//       ctx.lineTo(-24, 0);
//       ctx.lineTo(-24, 3);
//       ctx.lineTo(0, 3);
//       ctx.closePath();
//       ctx.fill();
//     ctx.restore();
//     // 瓶蓋
//     ctx.fillStyle = globalColor.white;
//     ctx.save();
//       ctx.translate(-6.75, 0);
//       ctx.beginPath();
//       ctx.moveTo(0, 0);
//       ctx.lineTo(0, -3);
//       ctx.lineTo(-10.5, -3);
//       ctx.lineTo(-10.5, -0);
//       ctx.closePath();
//       ctx.fill();
//     ctx.restore();
//     // 閃電
//     drawLightning({ x: -11, y: 9 });
//   ctx.restore();
// }



// 繪製閃電
function drawLightning(translate = { x: 0, y: 0 }, scale = 1) {
  ctx.fillStyle = globalColor.white;
  ctx.translate(translate.x, translate.y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.rotate(18 * degToPi);
  ctx.lineTo(0, 10 * scale);
  ctx.translate(0, 10 * scale);
  ctx.rotate(-18 * degToPi);

  ctx.lineTo(10 * scale, 0);
  ctx.translate(10 * scale, 0);

  ctx.rotate(28 * degToPi);
  ctx.lineTo(0, 16 * scale);
  ctx.translate(0, 16 * scale);
  ctx.rotate(-28 * degToPi);

  ctx.rotate(3.6 * degToPi);
  ctx.lineTo(0, -10 * scale);
  ctx.translate(0, -10 * scale);
  ctx.rotate(-3.6 * degToPi);

  ctx.lineTo(-8 * scale, 0);
  ctx.closePath();
  ctx.fill();
}



function originPos(axisRotateR, axisRotateAngle) {
  return {
    x: (gameW / 2) + axisRotateR * Math.cos(axisRotateAngle * degToPi),
    y: (gameH / 2) + axisRotateR * Math.sin(axisRotateAngle * degToPi),
  };
}



// 以 x 為底的 y 的對數：logxy
function baseLog(x, y) {
  return Math.log(y) / Math.log(x);
}



// 餘弦定理
function cosineFormula(a, b, angle) {
  return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle * degToPi));
}

function getAngleB(a, b, c) {
  return Math.acos((a * a + c * c - b * b) / (2 * a * c));
}



// 取得某區間的隨機亂數
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function playSound(instrument, note, duration = '8n', timeout = 0, volume = 0) {
  if (game.isMuted) return;
  let synth;
  switch (instrument) {
    case 'membrane':
      setTimeout(() => {
        synth = new Tone.MembraneSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;
    case 'duo':
      setTimeout(() => {
        synth = new Tone.DuoSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;
    case 'mono':
      setTimeout(() => {
        synth = new Tone.MonoSynth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;
    default:
      setTimeout(() => {
        synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, duration);
        synth.volume.value = volume;
      }, timeout);
      break;
  }
}

function isMob() {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}


/* 2D Vector Class */
// class Vec2 {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   set(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   move(x, y) {
//     this.x += x;
//     this.y += y;
//   }
//   add(v) {
//     return new Vec2(this.x + v.x, this.y + v.y);
//   }
//   sub(v) {
//     return new Vec2(this.x - v.x, this.y - v.y);
//   }
//   mul(s) {
//     return new Vec2(this.x * s, this.y * s);
//   }
//   clone() {
//     return new Vec2(this.x, this.y);
//   }
//   equal(v) {
//     return this.x === v.x && this.y === v.y;
//   }
//   get length() {
//     return Math.sqrt(this.x * this.x + this.y * this.y);
//   }
//   set length(newVal) {
//     const newLength = this.unit.mul(newVal);
//     this.set(newLength.x, newLength.y);
//   }
//   get angle() {
//     return Math.atan2(this.y, this.x);
//   }
//   get unit() {
//     return this.mul(1 / this.length);
//   }
// }