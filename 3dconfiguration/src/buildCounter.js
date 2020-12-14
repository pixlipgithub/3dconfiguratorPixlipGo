import * as THREE from 'three';
import state from './state';
import createCounter from './createCounter';

var buildCounter = function(scene) {
    if (state.length>1) {
        if (state.walls == 1)  {
            if (state.counter>0) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2,Math.PI/2)); 

            if (state.counter==2) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, state.width/2 - state.counterProps.width/2,Math.PI/2)); 
        } else if (state.walls == 2) {
            if (state.counter==1) {
                scene.add(createCounter(state.length/2 - state.counterProps.width/2,state.width/2 - state.counterProps.width/2,Math.PI/4)); 
            } else if (state.counter==2) {
                if (state.cabin>0) {
                    if (state.width > 1 && state.length > 1) {
                        var offsetX = 1;
                        var offsetZ = 0.65;
                        if (state.length == 2 ) scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
                        else scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall+0.01 - offsetX, state.width/2 - state.counterProps.depth/2, 0)); 
                        
                        if (state.width == 2 ) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2 + state.depthWall+0.01, Math.PI/2)); 
                        else scene.add(createCounter(state.length/2 - state.counterProps.depth/2, state.width/2 - state.counterProps.width/2 - state.depthWall-0.01-offsetZ, Math.PI/2)); 
                    }
                } else {
                    scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2 + state.depthWall+0.01, Math.PI/2)); 
                    scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
                }
            }
        } else if (state.walls == 3) {
            if (state.cabin>0) {
                if (state.counter>0) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01, state.width/2 - state.counterProps.depth/2, 0)); 
                if (state.counter==2) {
                    if (state.length==3 && state.width>3) scene.add(createCounter(state.length/2 - state.counterProps.depth/2 - state.depthWall-0.01 - state.counterProps.width, state.width/2 - state.counterProps.width/2 - state.counterProps.depth, Math.PI/2)); 
                    else if (state.length>3) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01 - state.counterProps.width, state.width/2 - state.counterProps.depth/2, 0)); 
                }
            } else {
                if (state.counter>0) scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
                if (state.counter==2) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01, state.width/2 - state.counterProps.depth/2, 0)); 
            }
        }
    }
}

export default buildCounter;