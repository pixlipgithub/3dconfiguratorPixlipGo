import * as THREE from 'three';
import state from './state';

var eventDragEnd = function(event) {
    state.controls.enableRotate=true;
    event.object.material.opacity = 0;
    state.needsUpdate=true;
}

export default eventDragEnd;