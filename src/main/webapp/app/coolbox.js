(function() {

  var coolbox = {};
  window.coolbox = coolbox;

  coolbox.SpriteConfig = function() {
    this.w = 32;
    this.h = 32;
  }

  coolbox.SpriteEditor = function( id, spriteConfig ) {

    var me = this;

    this.canvas = document.getElementById( id );
    this.context = canvas.getContext( "2d" );
    this.spriteConfig = spriteConfig;
    this.w = canvas.width;
    this.h = canvas.height;
    this.wPixel = Math.ceil( this.w / spriteConfig.w );
    this.hPixel = Math.ceil( this.h / spriteConfig.h );
    this.penDown = false;

    this.clear = function() {
      for( y = 0; y < this.h; y++ ) {
        var white = y % 2 == 0;
        for( x = 0; x < this.w; x++ ) {
          this.context.fillStyle = white ? '#ffffff' : '#aaaaaa';
          this.context.fillRect( x, y, 1, 1 );
          white = !white;
        }
      }
      this.context.fillStyle = '#000000';
    };

    this.click = function( mouseEvent ) {
      var x = mouseEvent.offsetX;
      var y = mouseEvent.offsetY;
      me.paint( x, y );
    }

    this.paint = function( x, y ) {
      var xP = Math.floor( x / me.wPixel );
      var yP = Math.floor( y / me.hPixel );
      me.context.fillRect( xP * me.wPixel, yP * me.hPixel, me.wPixel, me.hPixel );
    }

    this.mousemove = function( mouseEvent ) {
      var x = mouseEvent.offsetX;
      var y = mouseEvent.offsetY;
      if( me.penDown ) {
        me.paint( x, y );
        //console.log( 'mousemove ' + x + ':' + y );
      }
    }

    this.mousedown = function( mouseEvent ) {
      me.penDown = true;
    }

    this.mouseup = function( mouseEvent ) {
      me.penDown = false;
    }

    this.canvas.addEventListener( 'click', this.click, false );
    this.canvas.addEventListener( 'mousemove', this.mousemove, false );
    this.canvas.addEventListener( 'mousedown', this.mousedown, false );
    this.canvas.addEventListener( 'mouseup', this.mouseup, false );
    this.canvas.addEventListener( 'mouseout', this.mouseup, false );

    this.clear();

  }

}())
