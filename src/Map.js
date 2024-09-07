// import Prando from 'prando'
import EvilScienceGenerator from './generators/EvilScienceGenerator'

class Map {
  constructor () {
    this.tilesize = 16
    this.w = 64
    this.h = 128

    this.generator = new EvilScienceGenerator(this.w, this.h)
    this.tiles = this.generator.generateTiles()
  }

  getTileAtCoord (x, y) {
    return this.tiles[y * this.w + x]

  }

  setTileAtCoord (x, y, tileId) {
    if(y<0 || x<0 || x > this.w) return
    if(y<0 || x<0 || x > this.w || y > this.h) return
    this.tiles[y * this.w + x] = tileId
  }

  setTileAtPixel (x, y, tileId) {
    const coords = this.getMapCoordAtPixel(x, y)
    this.setTileAtCoord(coords.x, coords.y, tileId)
  }

  // TODO: rename all these to use Point instead of Pixel
  getMapCoordAtPixel (x, y) {
    return {
      x: Math.floor(Math.round(x)/this.tilesize),
      y: Math.floor(Math.round(y)/this.tilesize)
    }
  }

  getTileAtPixel (x, y) {
    const pos = this.getMapCoordAtPixel(x, y)
    return this.getTileAtCoord(pos.x, pos.y)
  }

  getSolidAtPixel (x, y) {
    return this.isTileIdSolid(this.getTileAtPixel(x, y))
  }

  isTileIdSolid (id) {
    return id>0
  }

}

export default Map
