coolbox = window.coolbox;

coolbox.SpriteEditor = function( id, sprite ) {

  var me = this;

  this.canvas = document.getElementById( id );
  this.context = this.canvas.getContext( "2d" );
  this.sprite = sprite;
  this.w = this.canvas.width;
  this.h = this.canvas.height;
  this.wPixel = Math.ceil( this.w / sprite.getW() );
  this.hPixel = Math.ceil( this.h / sprite.getH() );
  this.penDown = false;

  this.clear = function( xStart, yStart, xEnd, yEnd ) {

    xStart = xStart ? xStart : 0;
    yStart = yStart ? yStart : 0;
    xEnd = xEnd ? xEnd : me.w;
    yEnd = yEnd ? yEnd : me.h;

    var whiteStart = yStart % 2 == 0;
    if( xStart % 2 != 0 ) {
      whiteStart = !whiteStart;
    }

    for( y = yStart; y < yEnd; y++ ) {
      var white = whiteStart;
      whiteStart = !whiteStart;
      for( x = xStart; x < xEnd; x++ ) {
        this.context.fillStyle = white ? '#ffffff' : '#aaaaaa';
        this.context.fillRect( x, y, 1, 1 );
        white = !white;
      }
    }
/*
    for( y = 0; y < me.h; y++ ) {
      for( x = 0; x < me.w; x++ ) {
        sprite.setPixel( x, y, 255, 255, 255, 255 );
      }
    }
*/
    this.context.fillStyle = '#000000';

  };

  this.click = function( mouseEvent ) {
    var x = mouseEvent.offsetX;
    var y = mouseEvent.offsetY;
    var xP = Math.floor( x / me.wPixel );
    var yP = Math.floor( y / me.hPixel );
    me.invert( xP, yP );
  }
  
  this.invert = function( xP, yP ) {
    //if( mouseEvent.shiftKey ) {
    if( me.sprite.getPixel( xP, yP ).a == 0 ) {
      me.paint( xP, yP );
    }
    else {
      me.erase( xP, yP )
    }
  }

  this.paint = function( xP, yP ) {
    me.context.fillRect( xP * me.wPixel, yP * me.hPixel, me.wPixel, me.hPixel );
    me.sprite.setPixel( xP, yP, 0, 0, 0, 255 );
    me.sprite.draw();
  }

  this.erase = function( xP, yP ) {
    me.clear( xP * me.wPixel, yP * me.hPixel, xP * me.wPixel + me.wPixel, yP * me.hPixel + me.hPixel );
    me.sprite.setPixel( xP, yP, 255, 255, 255, 0 );
    me.sprite.draw();
  }

  this.mousemove = function( mouseEvent ) {
    var x = mouseEvent.offsetX;
    var y = mouseEvent.offsetY;
    var xP = Math.floor( x / me.wPixel );
    var yP = Math.floor( y / me.hPixel );
    if( me.penDown ) {
        if( !me.lastdraw || me.lastdraw.xP != xP || me.lastdraw.yP != yP ) {
            me.invert( xP, yP );
            me.lastdraw = { xP: xP, yP: yP };
        }
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
