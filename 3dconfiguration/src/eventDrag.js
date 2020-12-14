import * as THREE from 'three';
import state from './state';

var eventDrag = function(event) {
    var offsetLayers = 0.01;
    if (typeof event.object.userData != 'undefined') if (typeof event.object.userData.name != 'undefined') if (event.object.userData.name=='textOffset') offsetLayers=0.015;
    if (event.object.userData.wall==0) {
        event.object.position.x = event.object.userData.offsetZ;
        
        state.dragOffset[event.object.userData.name][0] =  event.object.userData.offsetX - event.object.position.z;
        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;
        
        if (state.dragOffset[event.object.userData.name][0] > state.width - event.object.userData.x/2 && state.walls>1) {
            event.object.userData.wall = 1;
            event.object.userData.wallOffset = state.width;

            event.object.rotateY(Math.PI/2);
           
            event.object.userData.offsetX = -state.width/2+offsetLayers;
            event.object.userData.offsetZ = -state.length/2 + event.object.userData.x/2;

            event.object.position.x=event.object.userData.offsetZ;
            event.object.position.z=event.object.userData.offsetX;

            state.dragOffset[event.object.userData.name][0] = 0;
        }
    } else if (event.object.userData.wall==1) {
        event.object.position.z = event.object.userData.offsetX;
        
        state.dragOffset[event.object.userData.name][0] =  -(event.object.userData.offsetZ - event.object.position.x);
        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>0) {
            event.object.userData.wall = 0;
            event.object.userData.wallOffset = 0;

            event.object.rotateY(-Math.PI/2);
            
            event.object.userData.offsetX = state.width/2-event.object.userData.x/2;
            event.object.userData.offsetZ = -state.length/2+offsetLayers;

            event.object.position.x = event.object.userData.offsetZ;
            event.object.position.z = -event.object.userData.offsetX;
        } else if (state.dragOffset[event.object.userData.name][0] > state.length - event.object.userData.x/2 && state.walls>2) {
            event.object.userData.wall = 2;
            event.object.userData.wallOffset += state.length;

            event.object.rotateY(Math.PI/2);

            event.object.userData.offsetX = -state.width/2 + event.object.userData.x/2;
            event.object.userData.offsetZ = state.length/2-offsetLayers - state.depthWall;

            event.object.position.x= event.object.userData.offsetZ;
            event.object.position.z= event.object.userData.offsetX;
        }
    } else if (event.object.userData.wall==2) {
        event.object.position.x = event.object.userData.offsetZ;
        
        state.dragOffset[event.object.userData.name][0] =  -(event.object.userData.offsetX - event.object.position.z);
        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>1) {
            event.object.userData.wall = 1;
            event.object.userData.wallOffset -= state.length;

            event.object.rotateY(-Math.PI/2);
            
            event.object.userData.offsetX = -state.width/2+offsetLayers;
            event.object.userData.offsetZ = -state.length/2 + event.object.userData.x/2;

            event.object.position.x=-event.object.userData.offsetZ;
            event.object.position.z=event.object.userData.offsetX;
        } else if (state.dragOffset[event.object.userData.name][0] > state.width - event.object.userData.x/2 && state.walls===3) {
            event.object.userData.wall = 3;
            event.object.userData.wallOffset += state.width;

            event.object.rotateY(Math.PI/2);

            event.object.userData.offsetX = state.width/2-offsetLayers;
            event.object.userData.offsetZ = state.length/2 - event.object.userData.x/2;
            
            event.object.position.x=event.object.userData.offsetZ;
            event.object.position.z=event.object.userData.offsetX;
        }
    } else if (event.object.userData.wall==3) {
        event.object.position.z = event.object.userData.offsetX;

        state.dragOffset[event.object.userData.name][0] =  event.object.userData.offsetZ - event.object.position.x;
        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>2) {
            event.object.userData.wall = 2;
            event.object.userData.wallOffset -= state.width;

            event.object.rotateY(-Math.PI/2);
            
            event.object.userData.offsetX = -state.width/2+ event.object.userData.x/2;
            event.object.userData.offsetZ = state.length/2-offsetLayers;

            event.object.position.x = event.object.userData.offsetZ;
            event.object.position.z = -event.object.userData.offsetX;
        } 
    }
}

export default eventDrag;