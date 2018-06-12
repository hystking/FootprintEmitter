module.exports = class FootprintEmitter {
  constructor(span) {
    this.span = span;
    this.reset(0, 0, 0);
  }

  reset(x, y, z) {
    this.prevX = 0;
    this.prevY = 0;
    this.prevZ = 0;
    this.accDistance = 0;
    this.prevFootprintProgress = 0;
  }

  update(x, y, z) {
    const dx = x - this.prevX;
    const dy = y - this.prevY;
    const dz = z - this.prevZ;

    this.accDistance += Math.sqrt(dx * dx + dy * dy + dz * dz);

    const footprintProgress = this.accDistance / this.span;
    const footprintIndex = Math.floor(footprintProgress);

    const dProgress = footprintProgress - this.prevFootprintProgress;
    const dxUnit = dx / dProgress;
    const dyUnit = dy / dProgress;
    const dzUnit = dz / dProgress;
    const prevFootprintIndex = Math.floor(this.prevFootprintProgress);

    for(let k = 1; prevFootprintIndex + k <= footprintIndex; k += 1) {
      const index = prevFootprintIndex + k;
      const frac = index - this.prevFootprintProgress;
      const x = this.prevX + frac * dxUnit;
      const y = this.prevY + frac * dyUnit;
      const z = this.prevZ + frac * dzUnit;
      this.onEmit(index, x, y, z);
    }

    this.prevX = x;
    this.prevY = y;
    this.prevZ = z;
    this.prevFootprintProgress = footprintProgress;
  }
}

