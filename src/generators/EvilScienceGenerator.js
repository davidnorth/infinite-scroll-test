class EvilScienceGenerator {

  constructor (w, h) {
    this.w = w
    this.h = h
    this.tiles = new Uint8Array(w*h)
  }

  generateTiles () {


    // Fill all tiles with air
    this.tiles.fill(0)


    // Go through all tiles and close them based on a random chance

    for(let y = 0; y<this.h; y++) {
    //   console.log(this.tiles);
    //   this.tiles[y].fill(1)
      for(let x = 0; x<this.w; x++) {
        if(Math.random()*100 < 72) {
          this.setTile(x, y, 1)
        }
      }
    }


    const NEIGHBOURS = 4
    const EMPTY_NEIGHBOURS = 3

    // Pick cell at random
    for(let i = 0; i < 1000; i++) {
      const x = Math.round(Math.random() * this.w)
      const y = Math.round(Math.random() * this.w)
      // If solid neighbours is more than NEIGHBOURS, make solid, otherwise open
      this.setTile(x, y, this.getSolidNeighboursCount(x, y) > NEIGHBOURS ?  1 : 0)
    }

    // Smoothing


    // 5 iterations
    for(let i = 0; i < 1; i++) {
      // each cell
      for(let y = 0; y<this.h; y++) {
        // clear cell with 3 or more empty neighbours
        for(let x = 0; x<this.w; x++) {
          if(this.getSolidNeighboursCount(x, y) < 4) {
            this.setTile(x, y, 0)
          }
        }
      }
    }


    // fill empty cells with full neighbours
    // each cell
    for(let y = 0; y<this.h; y++) {
      // clear cell with 3 or more empty neighbours
      for(let x = 0; x<this.w; x++) {
        if(this.getTile(x, y) === 0 && this.getSolidNeighboursCount(x, y) > 4) {
          this.setTile(x, y, 1)
        }
      }
    }


    // grow grass
    // Find topmost solid block
    for(let x = 0; x< this.w; x++) {
      for(let y = 0; y< 20; y++ ) { 
        if( this.getTile(x,y) > 0 ) {
          // grass
          this.setTile(x, y, 5)
          // and some dirt
          this.setTile(x, y + 1, 2)
          this.setTile(x, y + 2, 2)
          break
        }
      }

    }


    return this.tiles
  }

  getTile (x, y) {
    return this.tiles[y * this.w + x]
  }

  setTile (x, y, tileId) {
    this.tiles[y * this.w + x] = tileId
  }

  getEmptyNeighboursCount (x, y) {
    let count = this.getSolidNeighboursCount(x, y)
    return 8 - count
  }

  getSolidNeighboursCount (x, y) {
    let count = 0
    if(this.getTile(x-1, y-1) > 0) { count ++ }
    if(this.getTile(x,   y-1) > 0) { count ++ }
    if(this.getTile(x+1, y-1) > 0) { count ++ }
    if(this.getTile(x-1, y)   > 0) { count ++ }
    if(this.getTile(x+1, y)   > 0) { count ++ }
    if(this.getTile(x-1, y+1) > 0) { count ++ }
    if(this.getTile(x,   y+1) > 0) { count ++ }
    if(this.getTile(x+1, y+1) > 0) { count ++ }
    return count
  }

}

export default EvilScienceGenerator
