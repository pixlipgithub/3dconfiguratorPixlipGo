import * as THREE from 'three';
import state from './state';

var updateCanvas = function() {
    var _Canvas = state.wallpaper;
    var c_x = 0;

    if (state.walls>0) c_x +=state.width;
    if (state.walls>1) c_x +=state.length;
    if (state.walls>2) c_x +=state.width;
    c_x*=state.canvasScale;

    var c_y = state.height*state.canvasScale;

    var _Context=_Canvas.getContext('2d');
    _Context.fillStyle=state.wallColor1;
    _Context.fillRect(0,0,c_x,c_y);

    var image = state.wallpaperImage;

    var logoScale = state.logoScale/state.canvasScale/10;
    var imageX = image.width*logoScale;
    var imageY = image.height*logoScale;
    _Context.drawImage(image, parseInt(state.logoOffset[0]*state.canvasScale), state.logoOffset[1]*state.canvasScale , imageX, imageY );
    
    state.needsUpdateCanvas = false;

    return _Canvas;
}

export default updateCanvas;