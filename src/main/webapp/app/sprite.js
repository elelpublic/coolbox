coolbox = window.coolbox;

coolbox.Sprite = function( canvas, x, y, w, h ) {

  var me = this;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.context = canvas.getContext( '2d' );
  this.imageData = me.context.getImageData( x, y, w, h );    

  this.getW = function() {
    return me.imageData.width;
  }

  this.getH = function() {
    return me.imageData.height;
  }

  this.getPixel = function( x, y ) {
    return {
      r: me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) ]
      , g: me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 1 ]
      , b: me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 2 ]
      , a: me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 3 ]
    }
  };

  this.setPixel = function( x, y, r, g, b, a ) {
    me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) ] = r;
    me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 1 ] = g;
    me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 2 ] = b;
    me.imageData.data[ ( ( y * ( me.imageData.width * 4 ) ) + ( x * 4 ) ) + 3 ] = a;
  }
  
  this.draw = function() {
    me.context.putImageData( me.imageData, x, y );
  }

}
