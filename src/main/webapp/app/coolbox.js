(function() {

    var coolbox = {};
    window.coolbox = coolbox;
    
    coolbox.fixEvent = function( e ) {
        
        e = e || window.event;
        
        if( !e.offsetX ) {
            var target = e.target || e.srcElement,
                style = target.currentStyle || window.getComputedStyle(target, null),
                borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
                borderTopWidth = parseInt(style['borderTopWidth'], 10),
                rect = target.getBoundingClientRect();

            e.offsetX = e.clientX - borderLeftWidth - rect.left,
            e.offsetY = e.clientY - borderTopWidth - rect.top;
        }
        
        return e;
        
    };

}())
