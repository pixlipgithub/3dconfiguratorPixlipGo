import * as THREE from 'three';
import state from './state';

var eventDragStart = function(event) {
    state.controls.enableRotate=false;
    event.object.material.opacity = 0.4;
}

export default eventDragStart;