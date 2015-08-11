(function() {

  var canvas = document.getElementById( 'overview' );
  var sprite = new coolbox.Sprite( canvas, 0, 0, 16, 16 )
  var spriteEditor = new coolbox.SpriteEditor( 'editor', sprite );
  var spriteOverview = new coolbox.SpriteOverview( 'overview', sprite );
    
}())
