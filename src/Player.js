import Entity from './Entity'

import Pickaxe from './items/Pickaxe'
import Bomb from './items/Bomb'
import Supernova from './items/Supernova'

const DOWN = 'd'
const UP = 'u'
const LEFT = 'l'
const RIGHT = 'r'

class Player extends Entity {

  constructor (game, x, y) {
    super(game, x, y, 9, 14)
    this.xa = 0
    this.ya = 0
    this.falls = true
    this.facing = DOWN
    this.xFriction = 0.9

    // offset drawing of sprite from sprite's coordinates
    this.spriteOffsetX = -4
    this.spriteOFfsetY = -15

    // Hotbar
    this.hotbarSelectedIndex = 0
    this.hotbarItems = [
      new Pickaxe(this),
      new Bomb(this),
      new Supernova(this)
    ]


  }

  getSprite () {
    switch (this.facing) {
      case LEFT:
        return 18
        break;
      case RIGHT:
        return 19
        break;
      case UP:
        return 17
        break;
      case DOWN:
        return 16
        break;
      default:
       return 16
       break;
    }
  }

  doInputs () {
    if(btn.down) {
      this.facing = DOWN
    }
    if(btn.left) {
      this.xa = -0.1
      this.facing = LEFT
    }
    if(btn.right) {
      this.xa = 0.1
      this.facing = RIGHT
    }
    if(btnp.up) {
      if(this.onGround()) {
      // Jump
        this.yv = -4
      }
      this.facing = UP
    }
    if(!btn.left && !btn.right) {
      this.xa = 0
    }



    // Hotbar selection
    if(btnp.one) { this.hotbarSelectedIndex = 0 }
    if(btnp.two) { this.hotbarSelectedIndex = 1 }
    if(btnp.three) { this.hotbarSelectedIndex = 2 }
    if(btnp.four) { this.hotbarSelectedIndex = 3 }

    // Use active hotbar item
    if(btnp.A) {
      const item  =this.hotbarItems[this.hotbarSelectedIndex]
      if(item) {
        this.hotbarItems[this.hotbarSelectedIndex].use()
      }
    }

  }

  doBehaviour () {
    this.doInputs()
    // acceleration
    this.xv = clamp(this.xv + this.xa, -1, 1)
    // top speed clamp to integer
    this.yv = clamp(this.yv, -4, 4)
    this.xv = clamp(this.xv, -4, 4)
  }

}


export default Player
