var numPanels = 50;
var rando = function(x, r){
    return (Math.random() * (2 * r)) - r + x;
};

$(document).ready(function(){

    var foo = $(".node");
    console.log(foo.length);

    var panels = [];
    var circs = [];
    var translations = [];
    
    numPanels = foo.length;
    foo.each(function(idx){

        console.log( idx + ": " + $( this ).text() );
        
        var n = $(this);

        n.click(function(e){
            if(n.hasClass('unselected')){
                n.removeClass('unselected');
                n.addClass('selected');
            }else{
                n.addClass('unselected');
                n.removeClass('selected');
            }
        });
        
        var w2 = $('#space').width()/2;
        var h2 = $('#space').height()/2;

        var x = rando(w2 - 25, w2);
        var y = rando(h2 - 25, h2);
        var z = Math.round(Math.random() * -50);

        var x2 = rando(x, 100);
        var y2 = rando(y, 100);

        //
        var dx = x - x2;
        var dy = y - y2;
        var h = Math.sqrt((dx * dx) + (dy * dy));
        var a = Math.asin(dy/h);
        
        var circ = {
            ox: x2,
            oy: y2,
            r: h,
            a: a,
            speed: rando(0, (Math.PI/45))
        };
        
        //
        n.css("transform", " translateX(" + x + "px) translateY(" + y + "px)  translateZ(" + z + "px)");
        n.css("z-index", z);
            //n.css("opacity", (100+z)/100);
        //$("#space").append(n);

        panels.push(n);
        circs.push(circ);
        translations.push([x,y,z]);
        
    });
    
    var fps = 24;
    var currMouseX = 0;
    var currMouseY = 0;

    var newMouseX = 0;
    var newMouseY = 0;
    
    function draw() {
        setTimeout(function() {
            requestAnimationFrame(draw);

            if(currMouseX !== newMouseX || currMouseY !== newMouseY){
                currMouseX = newMouseX;
                currMouseY = newMouseY;

                var px = (1 - (newMouseX / $('#space').width()));
                var py = (1 - (newMouseY / $('#space').height()));

                px *= 100;
                py *= 100;
                
                $('#space').css('perspective-origin', px + '% ' + py + '%');
                
            }
            
            for(var i= 0; i<numPanels; i++){
                if(!panels[i].hasClass('selected')){
                    circs[i].a += circs[i].speed;
                    var tx = circs[i].ox + (Math.cos(circs[i].a) * circs[i].r);
                    var ty = circs[i].oy + (Math.sin(circs[i].a) * circs[i].r);
                    var tz = translations[i][2];
                    panels[i].css("transform", " translateX(" + tx + "px) translateY(" + ty + "px)  translateZ(" + tz + "px)");
                }
            }

        }, 1000 / fps);
    }
    draw();

    $('#space').mousemove(function(e){
        var o = $(this).offset();
        newMouseX = e.pageX - o.left;
        newMouseY = e.pageY - o.top;
    });
    
});
