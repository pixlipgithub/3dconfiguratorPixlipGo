import state from './state';
import * as THREE from 'three';

import creatText from './creatText';

var creatWallpaper = function(callback) {
    
    var _Canvas=document.createElement("CANVAS");
    var c_x = 0;

    if (state.walls>0) c_x +=state.width;
    if (state.walls>1) c_x +=state.length;
    if (state.walls>2) c_x +=state.width;
    c_x*=state.canvasScale;

    var c_y = state.height*state.canvasScale;
    _Canvas.width=c_x;
    _Canvas.height=c_y;
    var _Context=_Canvas.getContext('2d');
    _Context.fillStyle=state.wallColor1;
    _Context.fillRect(0,0,c_x,c_y);
    
    if (state.fileLogo!==false) {
        var image = new Image();
        state.wallpaperImage = image;
        image.src = state.fileLogo;
        image.setAttribute('crossOrigin', 'anonymous');
    
        image.onload = function(e) {

            var logoScale = state.logoScale/state.canvasScale/10;
            var imageX = image.width*logoScale;
            var imageY = image.height*logoScale;

            var type = 'logoOffset';
            state.printWall[type] = {};
            state.printWall[type]['imageX'] = imageX;
            state.printWall[type]['imageY'] = imageY;
            
            var _offsetX = state.dragOffset['logoOffset'][0];
            if (typeof state.dragObj[type] != 'undefined')  if (typeof state.dragObj[type].userData != 'undefined') _offsetX += state.dragObj[type].userData.wallOffset;
            _Context.drawImage(this, parseInt(_offsetX * state.canvasScale), parseInt(state.dragOffset[type][1] * state.canvasScale), imageX, imageY );

            creatText(_Context);
            state.wallpaper = _Canvas;

            callback();
        };
    } else {
        creatText(_Context);
        state.wallpaper = _Canvas;
        callback();
    }
}

export default creatWallpaper;