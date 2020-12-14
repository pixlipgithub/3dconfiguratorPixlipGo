import state from './state';
import * as THREE from 'three';

var creatText = function(ctx) {
    var type = 'textOffset';
    ctx.fillStyle = state.fontColor;
    ctx.font = (state.textSize/5)+"px "+(state.font);

    var text = state.textWall.split('\n');
    var lengthText = 0;

    var lineheight = state.textSize/5;
    var x = state.dragOffset[type][0]*state.canvasScale;
    if (typeof state.dragObj[type] != 'undefined')  if (typeof state.dragObj[type].userData != 'undefined') x += state.dragObj[type].userData.wallOffset*state.canvasScale;
    var y = state.dragOffset[type][1]*state.canvasScale;

    for (var i = 0; i<text.length; i++) {
        ctx.fillText(text[i], x, y + ((i+1)*lineheight) );
        if (ctx.measureText(text[i]).width>lengthText) lengthText=ctx.measureText(text[i]).width;
    } 
    
    state.printWall[type] = {};
    state.printWall[type]['imageX'] = lengthText;
    state.printWall[type]['imageY'] = (state.textSize/5)*(text.length);
    
}

export default creatText;