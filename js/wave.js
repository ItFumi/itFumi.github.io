$(function() {
var pixi = {
    'stage'         : '',
    'renderer'      : '',
    'width'         : $("#wave").width(),
    'height'        : $("#wave").height()
};
 
var wave = {
    points : [],
    g: '',
    tween: '',
    count : 0,
    ropePoint : 20,
    delay : 0.1
};
if (pixi.width <= 767) {
    wave.strength = 2;
} else {
    wave.strength = 10;
}
wave.ropeLength = pixi.width / wave.ropePoint;
 
init();

function init() {
    //PIXI initialize
    pixi.stage = new PIXI.Container();
    pixi.renderer = new PIXI.autoDetectRenderer(
        pixi.width,
        pixi.height,
        {
            transparent: true,
            antialias: true
        }
    );
    $("#wave").append(pixi.renderer.view);
     
    // wave path create
    // start path
    for (var i = 0; i < wave.ropePoint+1; i++)
    {
        wave.points.push(new PIXI.Point((i) * wave.ropeLength,0));
    }
    // stop path
    wave.points.push(new PIXI.Point((wave.ropePoint) * wave.ropeLength,pixi.height));
    wave.points.push(new PIXI.Point(0 ,pixi.height));
     
    // wave container
    wave.g = new PIXI.Graphics();
    wave.g.position.y = pixi.height/2;
    pixi.stage.addChild(wave.g);
    
    // click wave
    $("#wave").click(function () {
        waveTween();
    });

    // initialize wave
    waveTween();
     
    //animate
    animate(); 
}
 
function waveTween() {
    if( wave.tween === undefined) { wave.tween.stop(); }
    wave.tween = new TWEEN.Tween( wave )
        .to( { strength: wave.strength + 3, delay: 0.2 }, 3000 )
        .easing( TWEEN.Easing.Quartic.Out )
        .onComplete( function(){
            wave.tween = new TWEEN.Tween( wave )
                .to( { strength: 1.3, delay: Math.PI/2 }, 4000 )
                .start();
        })
        .start();
}
     
function animate() {
 
    wave.count += 0.1;
     
    for (var i = 1, l = wave.points.length-2; i < l; i++) {
        var vy = (wave.points[i-1].y - wave.points[i].y);
        vy += (wave.points[i].y - wave.points[i*1].y);
        wave.points[i].y += vy;
        wave.points[i].y += Math.sin(((i) * wave.delay) + wave.count) * wave.strength;
    }
    renderPoints();

    TWEEN.update();
    pixi.renderer.render(pixi.stage);
    requestAnimationFrame( animate );
}

function renderPoints () {
     
    // canvas clear
    wave.g.clear();
     
    // path draw
    wave.g.beginFill(0x00a3d9);
    wave.g.moveTo(wave.points[0].x,wave.points[0].y);
     
    for (var i = 1; i < wave.points.length; i++) {
            var cpx = wave.points[i-1].x + (wave.points[i-1].x - wave.points[i].x) / 2;
            var cpy = wave.points[i-1].y + (wave.points[i-1].y - wave.points[i].y) / 2;
            wave.g.bezierCurveTo(cpx,cpy,cpx,cpy,wave.points[i].x,wave.points[i].y);
    }
    wave.g.endFill();
}
});