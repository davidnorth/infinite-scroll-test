class Item {

  constructor(player, id, displayName) {
    this.player = player
    this.game = player.game
    this.id = id
    this.displayName = displayName
  }

  use () {
    console.log("Not implemented");
  }

}


export default Item
