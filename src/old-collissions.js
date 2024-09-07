
    // move right to not intersect on left
    while(
      this.game.map.getTileAtPixel(this.x, this.y-2) > -1 ||
      this.game.map.getTileAtPixel(this.x-1, this.y - this.height) > -1
    ) {
      this.xv = 0
      this.x = Math.round(this.x+1)
    }

    // move left to not intersect on right
    while(
+     this.game.map.getTileAtPixel(this.x+this.w-1, this.y - 2) > -1 ||
      this.game.map.getTileAtPixel(this.x+this.w-1, this.y - this.height) > -1
    ) {
      this.xv = 0
      this.x = Math.round(this.x-1)
    }

    // move up to not intersect ground
    while(
      this.game.map.getTileAtPixel(this.x, this.y) > -1 ||
      this.game.map.getTileAtPixel(this.x + this.w-1, this.y) > -1
    ) {
      this.yv = 0
      this.y = Math.round(this.y-1)
    }

    // move down to not intersect ceiling
    while(
      this.game.map.getTileAtPixel(this.x+4, this.y+this.height) > -1
    ) {
      this.yv = 0
      this.y = Math.round(this.y+1)
    }


    const onGround = this.game.map.getTileAtPixel(this.x+this.w*0.5, this.y+1) > -1
