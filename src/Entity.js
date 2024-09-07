const MAX_TILE_COLLISION_DIST = 3
const G = 0.1

class Entity {
  constructor (game, x, y, w, h) {
    this.game = game
    this.visible = true

    this.startT = this.game.t

    this.x = x
    this.y = y

    this.h = h
    this.w = w

    this.xv = 0
    this.yv = 0

    this.oldXv = 0
    this.oldYv = 0

    this.xFriction = 1
    this.yFriction = 1

    this.bounce = 0

    this.collideWithSolid = true

    // offset drawing of sprite from sprite's coordinates
    this.spriteOffsetX = 0
    this.spriteOFfsetY = 0
  }

  get aliveTime () {
    return this.game.t - this.startT
  }

  centerX () {
    return Math.round(this.x + (this.w/2))
  }

  centerY () {
    return Math.round(this.y - (this.h/2))
  }

  // Move these onto AABB classs
  left () {
    return Math.round(this.x)
  }
  right () {
    return Math.round(this.x) + this.w - 1 // rightmost pixel of aabb
  }
  top () {
    return Math.round(this.y)-this.h+1 // topmost pixel of aabb
  }
  bottom () {
    return Math.round(this.y)
  }


  onGround () {
    return this.game.map.getSolidAtPixel (
      this.left() + 3, this.bottom() + 1)
  }

  getSprite () {
    return 0
  }

  doBehaviour () {
  }

  collided () {
  }

  update () {
    this.doBehaviour()
    this.doPhysics()


    this.xo = this.xv
    this.yo = this.yv

    if(this.collideWithSolid) {
      this.collideWithMap()

    // quick and dirty way to check if we collided with wall
    // if(this.xv < this.oldXv) {
    //   console.log('collided');
    //   this.collided()
    // }


    }
    this.updatePosition()


    this.oldXv = this.xv
    this.oldYv = this.yv
  }

  doPhysics () {
    // Gravity
    if(this.falls) {
      // TODO check bottom left and right corners
      // this.yv = if(this.game.map.getTileAtPixel(this.x+this.w*0.5, this.y+1) > 0) ? 0 : G
      this.yv += G
    }
    // friction
    this.xv = this.xv * this.xFriction
    this.yv = this.yv * this.yFriction

    // bounce
    if(this.onGround()) {
      if(this.lastYv > 0.5) {
        this.yv = this.lastYv * -1 * this.bounce
      }
      // this.xv = this.speed
    }
    this.lastYv = this.yv

    // snap speed to 0 when very small
    if(Math.abs(this.xv) < 0.01) { this.xv = 0; this.x = Math.round(this.x) }
    if(Math.abs(this.yv) < 0.01) { this.yv = 0; this.y = Math.round(this.y) }
  }

  collideWithMap () {



    // collide with tiles up and down
    if(this.yv !== 0) {
      const dir = this.yv > 0 ? 1 : -1 // direction increment
      // "forward" facing edge coord
      const ffe = this.yv > 0 ? this.bottom() : this.top()
      // y coord of tiles forward facing edge is in
      const ffeTileY = this.game.map.getMapCoordAtPixel (0, ffe).y

      // tile columns overlapping the bb
      const colFrom = this.game.map.getMapCoordAtPixel (this.left(), 0).x
      const colTo = this.game.map.getMapCoordAtPixel (this.right(), 0).x

      // find closest solid tile in direction of movement from ffeTileY for each column
      for(let tileX = colFrom; tileX<colTo+1; tileX++) {
        for(let tileY = ffeTileY; dir === 1 ? tileY < ffeTileY + MAX_TILE_COLLISION_DIST : tileY > ffeTileY - MAX_TILE_COLLISION_DIST; tileY += dir) {
          // TODO: map.getSolidAtCoord
          // console.log("check " + tileX + " x " + tileY);


          if(this.game.map.getTileAtCoord(tileX, tileY) > 0) {
            // calculate distance from ffe to solid tile's top/bottom
            if(this.yv > 0) {
              this.yo = Math.min(this.yo, tileY * this.game.map.tilesize - ffe - dir)
            } else {
              this.yo = Math.max(this.yo, tileY * this.game.map.tilesize + this.game.map.tilesize - ffe)
            }
            break
          }
        }
      }
    }

    window.player = this

    // collide with tiles left and right
    if(this.xv !== 0) {
      const dir = this.xv > 0 ? 1 : -1 // direction increment

      // "forward" facing edge coord
      const ffe = this.xv > 0 ? this.right() : this.left()
      // x coord of the first tile after the one the forward facing edge is in,
      // i.e. the first we will check. No point checking the tile we're already in
      const ffeTileX = this.game.map.getMapCoordAtPixel (ffe, 0).x + dir

      // tile rows overlapping the bb
      const rowFrom = this.game.map.getMapCoordAtPixel (0,  this.top()).y
      const rowTo = this.game.map.getMapCoordAtPixel (0, this.bottom()).y

      // find closest solid tile in direciton of movement from ffeTileY for each column
      for(let tileY = rowFrom; tileY<rowTo+1; tileY++) {
        for(let tileX = ffeTileX; dir === 1 ? tileX < ffeTileX + MAX_TILE_COLLISION_DIST : tileX > ffeTileX - MAX_TILE_COLLISION_DIST; tileX += dir) {
      //     // TODO: map.getSolidAtCoord
          if(this.game.map.getTileAtCoord(tileX, tileY) > 0) {
            // calculate distance from ffe to solid tile's left/right
            if(this.xv > 0) {
              this.xo = Math.min(this.xo, tileX * this.game.map.tilesize - ffe - 1)
            } else {
              this.xo = Math.max(this.xo, tileX * this.game.map.tilesize + this.game.map.tilesize - ffe)
            }
            break
          }
        }
      }

    }


  }

  updatePosition () {
    this.xv = this.xo
    this.yv = this.yo

    if(this.xo === 0) {
      this.collided();
    }

    // Use offset allowed by collisions rather than xv/yv
    this.x += this.xo
    this.y += this.yo
  }

  kill () {
    this.game.removeEntity(this)
  }

  // Manhattan distance
  fastDistanceTo(other) {
    return Math.abs(other.x - this.x) +
      Math.abs(other.y - this.y)
  }

  // collidesWith(other) {
  //   return rect1.x < rect2.x + rect2.w &&
  //       rect1.x + rect1.w > rect2.x &&
  //       rect1.y < rect2.y + rect2.h &&
  //       rect1.y + rect1.h > rect2.y
  // }

}

export default Entity
