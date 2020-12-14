import * as THREE from 'three';
import state from './state';

import buildFloor from './buildFloor';
import buildWall from './buildWall';
import buildCabin from './buildCabin';
import buildCounter from './buildCounter';

import creatWallpaper from './creatWallpaper';
import creatDragObj from './creatDragObj';

var build = function(callbck) {
    var group=new THREE.Group();
    
    if (state.isClearDragObj===true) {
        state.isClearDragObj = false;
    }
    creatWallpaper(function() {
        var offsetCanvas = 0;
        state.isCreateObj['logoOffset'] = true;
        state.isCreateObj['textOffset'] = true;
        
        //left
        state.wallsName = '';
        if (state.walls>0) {
            var wall2 = 0;
            var wall2_offset = -state.depthWall;
            if (state.walls>1) {
                wall2 = state.depthWall;
                wall2_offset = -state.depthWall/2;
            } 
            buildWall(group, state.width-wall2, state.height, -state.length/2-state.depthWall/2, wall2_offset, Math.PI/2, offsetCanvas);
            if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', Math.PI/2);
            if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', Math.PI/2);
            offsetCanvas+=state.width-wall2;
            state.wallsName = 'I';
        } 
        //right
        if (state.walls>1) {
            var wall3 = 0;
            if (state.walls>2) wall3 = state.depthWall;
            buildWall(group, state.length-state.depthWall-wall3, state.height, -state.depthWall/2-wall3/2, -state.width/2-state.depthWall/2, 0, offsetCanvas);
            if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', 0 );
            if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', 0 );
            offsetCanvas+=state.length-state.depthWall-wall3;
            state.wallsName = 'L';
        }
        //F-left
        if (state.walls>2) { 
            if (state.length>1) {
                buildWall(group, state.width-state.depthWall, state.height, state.length/2-state.depthWall/2-state.depthWall, -state.depthWall/2, -Math.PI/2, offsetCanvas);
                if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', -Math.PI/2);
                if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', -Math.PI/2);
                offsetCanvas+=state.width-state.depthWall;
                state.wallsName = 'U';
            }
        }
       
        state.isUpdateWallpaper=false;

        buildCabin(group);
        
        buildFloor(group);
    
        //left
        buildCounter(group);
    
        state.scene.remove(state.group);
        state.scene.add(group);
        state.group = group;
        state.needsUpdate=false;
        callbck();
    });
}

export default build;