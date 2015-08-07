coolbox = window.coolbox;

coolbox.Sprite = function( imageData ) {

  var me = this;
  this.imageData = imageData;

  this.w = function() {
    return me.imageData.width;
  }

  this.h = function() {
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

}
