import Particle from '../Particle'

class Smoke extends Particle {

  constructor (game, x, y) {
    super(game, x, y, 16, 16)

    this.animationSprites = [80, 81, 82, 83]
    this.currentSpriteIndex = 0

    this.lifetime = 100
  }

  getSprite () {
    // TODO: come up with a proper system for handling animations
    this.currentSpriteIndex = Math.min(this.animationSprites.length,  Math.floor(this.aliveTime / 4))
    return this.animationSprites[this.currentSpriteIndex]
  }

}

export default Smoke
