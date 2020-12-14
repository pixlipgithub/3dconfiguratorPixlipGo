import * as THREE from 'three';
import state from './state';
import createАasteners from './createАasteners';

import cloneCanvas from './cloneCanvas';
import getNameBox from './getNameBox';

var buildWall = function(scene, witdh, height, offsetX, offsetZ, angel, offsetCanvas) {
    var g = new THREE.BoxBufferGeometry(witdh-0.01, height, state.depthWall);

    var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
    var m2 = new THREE.MeshStandardMaterial( { color: 0xcccccc } );

    var canvasMaterial = new THREE.MeshStandardMaterial( );
    
    if ( state.wallpaper!==false ) {
        var _texture=new THREE.CanvasTexture(cloneCanvas(state.wallpaper));
        canvasMaterial.map = _texture;
        canvasMaterial.map.offset.set(offsetCanvas/(state.wallpaper.width/state.canvasScale),0);
        canvasMaterial.map.repeat.set(witdh/(state.wallpaper.width/state.canvasScale),height/(state.wallpaper.height/state.canvasScale));
        
        _texture = true;
        canvasMaterial.needsUpdate = true;
    }
    var o = new THREE.Mesh(g,[m1,m1,m1,m1,canvasMaterial,m2]);

    o.position.y = height/2;
    o.position.x = offsetX;
    o.position.z = offsetZ;
    o.rotateY(angel);

    var h_m = new THREE.MeshStandardMaterial( { color: 0xff3300 } );
   
    h_m.transparent = true;
    h_m.opacity = 0;

    witdh = Math.round(witdh*100)/100;
    var arr_Frame = new Array();
    if (state.cabin>0 && state.walls==2) { // L - cabinet
        if (angel == 0) {
            //передня
            if(witdh == 1.85) arr_Frame = [1.85];
            else if(witdh == 2.85) arr_Frame = [0.85, 2];
            else if(witdh == 3.85) arr_Frame = [1.85, 2];
            else if(witdh == 4.85) arr_Frame = [1.85, 1, 2];
            else if(witdh == 5.85) arr_Frame = [1.85, 2, 2];
        } else {
            //левая стена
            if(witdh == 1.85) arr_Frame = [1, 0.85];
            else if(witdh == 2.85) arr_Frame = [1, 1.85];
            else if(witdh == 3.85) arr_Frame = [1, 0.85, 2];
            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
            else if(witdh == 5.85) arr_Frame = [1, 0.85, 2, 2];
        }
    } else if (state.cabin>0 && state.walls==3) { // U - cabinet
        if (angel == 0) {
            //передня
            if(witdh == 1.7) arr_Frame = [0.85, 0.85];
            else if(witdh == 2.7) arr_Frame = [0.85, 1.85];
            else if(witdh == 3.7) arr_Frame = [1.85, 1.85];
            else if(witdh == 4.7) arr_Frame = [1.85, 0.85, 2];
            else if(witdh == 5.7) arr_Frame = [1.85, 2, 1.85];
        } else if (angel == Math.PI/2) {
            //левая стена
            if(witdh == 1.85) arr_Frame = [1, 0.85];
            else if(witdh == 2.85) arr_Frame = [1, 1.85];
            else if(witdh == 3.85) arr_Frame = [1, 0.85, 2];
            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
            else if(witdh == 5.85) arr_Frame = [1, 0.85, 2, 2];
        } else {
            //правая стена
            if(witdh == 1.85) arr_Frame = [1.85];
            else if(witdh == 2.85) arr_Frame = [1, 1.85];
            else if(witdh == 3.85) {
                if (state.length == 2) arr_Frame = [1, 0.85, 2];
                else arr_Frame = [1.85, 2];
            }
            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
            else if(witdh == 5.85) {
                if (state.length == 2) arr_Frame = [1, 0.85, 2, 2];
                else arr_Frame = [1.85, 2, 2];
            }
        }

    } else if(witdh == 0.85) arr_Frame = [0.85];
    else if(witdh == 1) arr_Frame = [1];
    else if(witdh == 1.7) arr_Frame = [0.85, 0.85];
    else if(witdh == 1.85) arr_Frame = [1.85];
    else if(witdh == 2) arr_Frame = [2];
    else if(witdh == 2.7) arr_Frame = [1.85, 0.85];
    else if(witdh == 2.85) arr_Frame = [0.85, 2];
    else if(witdh == 3) arr_Frame = [2, 1];
    else if(witdh == 3.7) arr_Frame = [1.85, 1.85];
    else if(witdh == 3.85) arr_Frame = [1.85, 2];
    else if(witdh == 4) arr_Frame = [2, 2];
    else if(witdh == 4.7) arr_Frame = [1.85, 1, 1.85];
    else if(witdh == 4.85) arr_Frame = [2, 0.85, 2];
    else if(witdh == 5) arr_Frame = [2, 1, 2];
    else if(witdh == 5.7) arr_Frame = [1.85, 2, 1.85];
    else if(witdh == 5.85) arr_Frame = [2, 1.85, 2];
    else if(witdh == 6) arr_Frame = [2, 2, 2];
    
    var flagDirection = false;
    if (angel == Math.PI/2) {
        flagDirection = true;
    }
    
    var _offset= 0;
    for (var i = 0; i<arr_Frame.length; i++) {
        var h_g = new THREE.BoxBufferGeometry(arr_Frame[i], height+0.01, state.depthWall+0.01);
        var h_o = new THREE.Mesh(h_g,h_m);
            h_o.userData = getNameBox(arr_Frame[i],height);
            h_o.name = h_o.userData.name;
            h_o.isLightBox = true;
            if (flagDirection) {
                h_o.position.x = witdh/2 - arr_Frame[i]/2 - _offset;
            } else {
                h_o.position.x = -witdh/2 + arr_Frame[i]/2 + _offset;
            }
            _offset+=arr_Frame[i];
            if (arr_Frame[i]>1) createАasteners(o, h_o.position.x, height);
            createАasteners(o, h_o.position.x - arr_Frame[i]/2 + 0.18/2, height);
            createАasteners(o, h_o.position.x + arr_Frame[i]/2 - 0.18/2, height);
            
        var box = new THREE.BoxHelper( h_o, 0x424242 );
        o.add(h_o);
        o.add(box);
    }
    
    scene.add(o);
}

export default buildWall;