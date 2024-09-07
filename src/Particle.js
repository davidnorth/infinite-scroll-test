import Entity from './Entity'

class Particle extends Entity {

  constructor (game, x, y, w, h) {
    super(game, x, y, w, h)

    this.collideWithSolid = false
    this.falls = false

    this.lifetime = 240

    // particle sprites are centered on their bb
    this.spriteOffsetX = -this.w/2
    this.spriteOffsetY = -this.h/2
  }

  // By default, no behaviour other than to die when their lifetime is expired
  doBehaviour () {
    if(this.aliveTime >= this.lifetime) {
      this.kill()
    }
  }

}

export default Particle
