import Prando from 'prando'
import Player from './Player'
import Map from './Map'
import MiniKupa from './mobs/MiniKupa'

const SCREEN_WIDTH = 400
const SCREEN_HEIGHT = 300

// TODO: Move to its own file
class Game {
  constructor () {
    this.map = new Map()
    this.entities = []
    this.t = 0
  }

  spawnEntity (e) {
    this.entities.push(e)
    return e
  }

  removeEntity (e) {
    const index = this.entities.indexOf(e)
    if(index > -1) {
      this.entities.splice(index, 1)
    }

  }

}

const game = new Game()
window.game = game

game.player = game.spawnEntity(new Player(game, (game.map.w * game.map.tilesize)/2, -10))
game.spawnEntity(new MiniKupa(game, 100, -10))

const cursor = {
  x: 8,
  y: 0
}

let cam = {
  x: 0,
  y: -64
}

const ROWS_ON_SCREEN = 18

// let chunkIndex = 0

// const CHUNKS_ON_SCREEN = Math.ceil(ROWS_ON_SCREEN/game.map.chunkHeight)




exports.update = function () {
  game.t++

  // chunkIndex = Math.max(0, Math.floor(cam.y / (game.map.chunkHeight*game.map.tilesize)))

  // for(let i = 0;i<CHUNKS_ON_SCREEN;i++){
  //   game.map.ensureChunk(chunkIndex + i)
  // }



  game.entities.forEach(entity => entity.update())

  cursor.x = game.player.x
  cursor.y = game.player.y

  cam.y = Math.max(0,game.player.y) - 64
  cam.y = game.player.y - SCREEN_HEIGHT / 2
  cam.x = game.player.x - SCREEN_WIDTH / 2

  // if(btn.left) cam.x--
  // if(btn.right) cam.x++
  //   if(btn.down) cam.y++
  //     if(btn.up) cam.y--

  render()
};

function render() {
  // Rendering
  paper(12)
  cls()
  camera(cam.x, cam.y);




  // extents of map to render
  // const tl = game.map.getMapCoordAtPixel (game.player.x-128, game.player.y-128)
  // const br = game.map.getMapCoordAtPixel (game.player.x+128, game.player.y+128)

  for(let y = 0; y<game.map.h; y++){
    for(let x = 0; x<game.map.w; x++) {
      let tileId = game.map.getTileAtCoord(x, y)
      if(tileId > 0) {
        // subtract one because 0 means air. So 1 would use sprite 0 from tilemap
        sprite(tileId -1, x*game.map.tilesize, y*game.map.tilesize)
      }
    }
  }

  // debugging cursor
  paper(14)
  rectfill(cursor.x + 1, cursor.y, 2, 1)
  rectfill(cursor.x - 2, cursor.y, 2, 1)
  rectfill(cursor.x, cursor.y + 1, 1, 2)
  rectfill(cursor.x, cursor.y - 2, 1, 2)



        // sprite(tileId,
        //        x*game.map.tilesize,
        //        y*game.map.tilesize + i*game.map.tilesize*game.map.chunkHeight)


  // for(x =
  // for(let i = 0;i<CHUNKS_ON_SCREEN;i++){
  //   renderChunk(chunkIndex + i);
  // }

  game.entities.forEach(entity => {
    if(entity.visible) {
      sprite(
        entity.getSprite(),
        Math.round(entity.x + entity.spriteOffsetX),
        Math.round(entity.y + entity.spriteOFfsetY)
      )
    }
  })
  


  camera(0, 0)
  // print("Depth: "+Math.round(player.y/8)+"m", 2, 2)
  // print("y: "+player.y, 2, 10)
  print("tile at foot: " + 42, 2, 2)
  //

  renderGUI();

};


// function renderChunk(i) {
//   let tileId
//   for(let y=0;y<game.map.chunkHeight;y++) {
//     for(let x=0;x<game.map.chunkWidth;x++) {
//       tileId = game.map.getTileAtCoord(x, i * game.map.chunkHeight + y)
//       if(tileId > -1) {
//         sprite(tileId,
//                x*game.map.tilesize,
//                y*game.map.tilesize + i*game.map.tilesize*game.map.chunkHeight)
//       }
//     }
//   }
// }





function renderGUI() {

  // Hotbar
  const hotbarWidth = 77
  const hotbarHeight = 22
  const hotbarCellWidth = 18
  const hotbarX = 125 - hotbarWidth/2
  const hotbarY = 250 - hotbarHeight - 4

  draw(assets.gui.hotbar, hotbarX, hotbarY)
  for(let i=0;i<game.player.hotbarItems.length;i++) {
    draw(assets.itemIcons[game.player.hotbarItems[i].id], hotbarX + 3 + i * hotbarCellWidth, hotbarY + 3)
  }
  draw(assets.gui.hotbarSelection, hotbarX - 1 + game.player.hotbarSelectedIndex * hotbarCellWidth, hotbarY - 1)


}
