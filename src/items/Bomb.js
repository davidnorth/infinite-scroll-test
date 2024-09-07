import Item from '../Item'
import BombEntity from '../mobs/BombEntity'

class Bomb extends Item {

  constructor(player) {
    super(player, 'bomb', 'Bomb')
  }

  use () {
    console.log("Use bomb");

    let bx, bxv
    // TODO: export LEFT const
    if(this.player.facing === 'l') {
      bxv = this.player.xv +  -0.5
    } else {
      bxv = this.player.xv + 0.5
    }
    bxv = bxv * (0.5 + Math.random() / 2)
    const bomb = new BombEntity(
      this.player.game,
      this.player.centerX(),
      this.player.centerY() - 3.5)
    bomb.xv = bxv
    bomb.yv = -1
    this.game.spawnEntity(bomb)

  }

}

export default Bomb
