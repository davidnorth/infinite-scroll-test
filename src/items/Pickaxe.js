import Item from '../Item'

class Pickaxe extends Item {

  constructor(player) {
    super(player, 'pickaxe', 'Pickaxe')
  }

  use () {
    let x,y
    switch (this.player.facing) {
      case 'l':
        x = this.player.left() - 1
        y = this.player.centerY()
        break;
      case 'r':
        x = this.player.right() + 1
        y = this.player.centerY()
        break;
      case 'u':
        x = this.player.centerX()
        y = this.player.bottom() - this.game.map.tilesize - 3
        break;
      default:
        x = this.player.centerX()
        y = this.player.bottom() + 1
       break;
    }
    this.game.map.setTileAtPixel(x, y, 0)

  }


}

export default Pickaxe
