import Entity from '../Entity'
import Smoke from '../particles/Smoke'
import BombEntity from './BombEntity'

class Missile extends BombEntity {

  constructor (game, x, y) {
    super(game, x, y, 7, 8)
    this.falls = true

    this.blastRadius = 50
  }

  doBehaviour () {

      // this.state = 'exploded'
      // this.destroyTiles()
      // this.visible = false

      // Smoke trail
      // spawn every 4 frames
      if(this.aliveTime % 4 === 0) {
        this.game.spawnEntity(new Smoke(this.game, this.x + 4, this.y - 10))
      }
  }

  collided () {
    this.state = 'exploded'
    this.destroyTiles()
    this.visible = false
    this.kill()
  }

  getSprite () {
    return 33
  }

}

export default Missile
