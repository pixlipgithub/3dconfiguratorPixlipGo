import state from './state';
import * as THREE from 'three';

import clearDragObj from './clearDragObj';

var creatDragObj = function(type,angel) {
    if ((state.fileLogo!==false && type=='logoOffset') || (state.textWall!='' && type=='textOffset')) {
        state.isCreateObj[type] = false;
        var _wallOffset = 0;
        var _wall = 0;
        if (typeof state.dragObj[type] != 'undefined') if (typeof state.dragObj[type].userData!='undefined') _wallOffset = state.dragObj[type].userData.wallOffset;
        if (typeof state.dragObj[type] != 'undefined') if (typeof state.dragObj[type].userData!='undefined') _wall = state.dragObj[type].userData.wall;

        state.dragGroup.remove(state.dragObj[type]);
        
        var imageX = state.printWall[type]['imageX'];
        var imageY = state.printWall[type]['imageY'];

        var g = new THREE.BoxGeometry(imageX/state.canvasScale, imageY/state.canvasScale, 0.01);
        var m = new THREE.MeshStandardMaterial( { color: 0xFF3300 } );
        m.transparent=true;
        m.opacity=0;
        var dragObj = new THREE.Mesh(g,m);
        state.dragObj[type] = dragObj;

        dragObj.userData.name = type;
        dragObj.userData.wallOffset = _wallOffset;
        dragObj.userData.x = imageX/state.canvasScale;
        dragObj.userData.y = imageY/state.canvasScale;
        
        if (_wall==1) {
            angel = 0;
        } else if (_wall==2) {
            angel = -Math.PI/2;
        } else if (_wall==3) {
            angel = Math.PI;
        }

        var offsetLayers = 0.01;
        if (type=='textOffset') offsetLayers=0.015;
        if (angel===Math.PI/2) {
            dragObj.userData.wall = 0;
            dragObj.userData.offsetX = state.width/2-dragObj.userData.x/2 - state.depthWall;
            dragObj.userData.offsetZ = -state.length/2+offsetLayers;

            dragObj.position.x=dragObj.userData.offsetZ;
            dragObj.position.z=dragObj.userData.offsetX-state.dragOffset[type][0];
        } else if (angel===0) {
            dragObj.userData.wall = 1;
            dragObj.userData.offsetX = -state.width/2+offsetLayers;
            dragObj.userData.offsetZ = -state.length/2 + dragObj.userData.x/2;

            dragObj.position.x=dragObj.userData.offsetZ+state.dragOffset[type][0];
            dragObj.position.z=dragObj.userData.offsetX;
        } else if (angel===-Math.PI/2) {
            dragObj.userData.wall = 2;
            dragObj.userData.offsetX = -state.width/2+dragObj.userData.x/2;
            dragObj.userData.offsetZ = state.length/2 - offsetLayers - state.depthWall;

            dragObj.position.x=dragObj.userData.offsetZ;
            dragObj.position.z=dragObj.userData.offsetX+state.dragOffset[type][0];
        } else if (angel===Math.PI) {
            dragObj.userData.wall = 3;
            dragObj.userData.offsetX = state.width/2-offsetLayers;
            dragObj.userData.offsetZ = state.length/2 - dragObj.userData.x/2;
            
            dragObj.position.x=dragObj.userData.offsetZ-state.dragOffset[type][0];
            dragObj.position.z=dragObj.userData.offsetX;
        }
        
        dragObj.userData.offsetY = state.height-imageY/2/state.canvasScale;
        dragObj.position.y=dragObj.userData.offsetY-state.dragOffset[type][1];

        dragObj.rotateY(angel);

        state.dragGroup.add(dragObj);
    } else if ((state.textWall=='' && type=='textOffset') || (state.fileLogo===false && type=='logoOffset')) {
        clearDragObj(type);
    }    
}

export default creatDragObj;