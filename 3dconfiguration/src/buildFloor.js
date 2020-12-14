import * as THREE from 'three';
import state from './state';

var buildFloor = function(scene) {
    var g = new THREE.BoxBufferGeometry(state.length, 0.01, state.width);

    var m = new THREE.MeshStandardMaterial( { color: 0x424242 } );
    
    var o = new THREE.Mesh(g,m);
    o.position.y = -0.01/2;
    o.position.z = -state.depthWall;
    o.position.x = -state.depthWall;
    scene.add(o);
}

export default buildFloor;