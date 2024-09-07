import Item from '../Item'
import Missle from '../mobs/Missile'

class Supernova extends Item {

  constructor(player) {
    super(player, 'supernova', 'Supernova')
  }

  use () {
    console.log("Use supernova");

    let bx, bxv
    // TODO: export LEFT const
    if(this.player.facing === 'l') {
      bxv = this.player.xv +  -1
    } else {
      bxv = this.player.xv + 1
    }
    bxv = bxv * 5

    const missile = new Missle(
      this.player.game,
      this.player.centerX(),
      this.player.centerY() - 3.5)
      missile.xv = bxv
      missile.yv = 0
    this.game.spawnEntity(missile)

  }

}

export default Supernova
