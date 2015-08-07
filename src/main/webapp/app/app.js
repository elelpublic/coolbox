(function() {

  var spriteConfig = new coolbox.SpriteConfig();
  spriteConfig.w = 16;
  spriteConfig.h = 16;

  var canvas = document.getElementById( 'overview' );
  var context = this.canvas.getContext( '2d' );
  var sprite = context.getImageData( 0, 0, 16, 16 )

  var spriteEditor = new coolbox.SpriteEditor( 'editor', sprite );

  var spriteOverview = new coolbox.SpriteOverview( 'overview', sprite );


}())
