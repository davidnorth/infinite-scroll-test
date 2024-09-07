import Entity from '../Entity'

class MiniKupa extends Entity {

  constructor (game, x, y) {
    super(game, x, y, 14, 8)
    this.falls = true

    // offset drawing of sprite from sprite's coordinates
    this.spriteOffsetX = 0
    this.spriteOFfsetY = -15

    this.speed = 0.5

    this.xv = -this.speed
  }


  doBehaviour () {
    // bounce off left wall
    if(this.xv < 0 && this.game.map.getSolidAtPixel (this.left() - 1, this.y - 3)) {
      this.xv = this.speed
    }
    // bounce off right wall
    if(this.xv > 0 && this.game.map.getSolidAtPixel (this.right() + 1, this.y - 3)) {
      this.xv = -this.speed
    }

    // if(this.fastDistanceTo(this.game.player) < 32) {
    //   this.xv = 0.25
    // } else {
    //   this.xv = -0.25
    // }
  }

  getSprite () {
    return 49
    // if(this.xv < 0) { return 50 }
    // if(this.xv > 0) { return 49 }
    // return 48
  }

}

export default MiniKupa
