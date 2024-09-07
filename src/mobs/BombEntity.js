import Entity from '../Entity'
import Smoke from '../particles/Smoke'

class BombEntity extends Entity {

  constructor (game, x, y) {
    super(game, x, y, 7, 8)
    this.falls = true

    // offset drawing of sprite from sprite's coordinates
    this.spriteOffsetX = 0
    this.spriteOFfsetY = -15

    this.bounce = 0.4

    this.xv = 2
    this.yv = -0.3
    this.xFriction = 0.99
    this.state = 'waiting'

    this.blastRadius = 44

  }


  doBehaviour () {
    if(this.aliveTime > 200 && this.state === 'waiting') {
      this.state = 'goingToExplode'
    }
    if(this.state === 'goingToExplode') {
      this.visible = this.aliveTime % 8 > 4
    }
    if(this.aliveTime > 300 && this.state === 'goingToExplode') {
      this.state = 'exploded'
      this.destroyTiles()
      this.visible = false
      this.kill()
    }

  }

  destroyTiles () {

    // square of tiles centered on entity that could potentially be destroyed by the blast
    // blastradius is in pixels
    const xFrom = this.centerX() - this.blastRadius
    const xTo = this.centerX() + this.blastRadius
    const yFrom = this.centerY() - this.blastRadius
    const yTo = this.centerY() + this.blastRadius
    // get top left and bottom right map coords
    const tl = this.game.map.getMapCoordAtPixel (xFrom, yFrom)
    const br = this.game.map.getMapCoordAtPixel (xTo, yTo)

    const sqRadius = this.blastRadius * this.blastRadius
    let sqDist
    let tx, ty

    for(let y = tl.y; y<br.y+1; y++) {
      for(let x = tl.x; x<br.x+1; x++) {

        // pixel coords of tile center
        tx = x * this.game.map.tilesize + (this.game.map.tilesize/2)
        ty = y * this.game.map.tilesize + (this.game.map.tilesize/2)

        // comparing square of distance with square of blast radius
        sqDist = Math.pow( Math.abs(tx - this.centerX()), 2) + Math.pow( Math.abs(ty - this.centerY()), 2)
        if(sqDist <= sqRadius) {

          this.game.map.setTileAtCoord(x, y, 0)

          this.game.spawnEntity(
            new Smoke(this.game,
                      x*this.game.map.tilesize + this.game.map.tilesize/2,
                      y*this.game.map.tilesize + this.game.map.tilesize/2)
          )

        }

      }
    }

  }

  getSprite () {
    return 32
  }

}

export default BombEntity
