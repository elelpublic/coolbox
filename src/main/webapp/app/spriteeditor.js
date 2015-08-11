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
  this.hasMoved = false;

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
    if( me.hasMoved ) {
        me.hasMoved = false;
    }
    else {
        me.invert( me.getPixel( mouseEvent ) );
    }
  }
  
  this.invert = function( p ) {
    //if( mouseEvent.shiftKey ) {
    if( me.sprite.getPixel( p.x, p.y ).a == 0 ) {
      me.paint( p );
    }
    else {
      me.erase( p )
    }
  }

  this.paint = function( p ) {
    me.context.fillRect( p.x * me.wPixel, p.y * me.hPixel, me.wPixel, me.hPixel );
    me.sprite.setPixel( p.x, p.y, 0, 0, 0, 255 );
    me.sprite.draw();
  }

  this.erase = function( p ) {
    me.clear( p.x * me.wPixel, p.y * me.hPixel, p.x * me.wPixel + me.wPixel, p.y * me.hPixel + me.hPixel );
    me.sprite.setPixel( p.x, p.y, 255, 255, 255, 0 );
    me.sprite.draw();
  }

  this.mousemove = function( mouseEvent ) {
    if( me.penDown ) {
        var p = me.getPixel( mouseEvent );
        if( !me.lastdraw || me.lastdraw.x != p.x || me.lastdraw.y != p.y ) {
            if( me.paintMode ) {
                me.paint( p );
            }
            else {
                me.erase( p );
            }
            me.lastdraw = p;
            me.hasMoved = true;
        }
    }
  }
  
  this.getPixel = function( mouseEvent ) {
    mouseEvent = coolbox.fixEvent( mouseEvent );
    var x = mouseEvent.offsetX;
    var y = mouseEvent.offsetY;
    return { 
      x: Math.floor( x / me.wPixel ),
      y: Math.floor( y / me.hPixel )
    }
  }
  
  this.mousedown = function( mouseEvent ) {
    me.penDown = true;
    var p = me.getPixel( mouseEvent );
    me.paintMode = me.sprite.getPixel( p.x, p.y ).a == 0;
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
