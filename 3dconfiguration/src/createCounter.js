import * as THREE from 'three';
import state from './state';

var createCounter = function(x,z,angel) {
    var g = new THREE.BoxBufferGeometry(state.counterProps.width, state.counterProps.height, state.counterProps.depth);

    var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
    var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
        m2.color = new THREE.Color( state.wallColor1);
    var o = new THREE.Mesh(g,[m1,m1,m1,m1,m2,m2]);

    var box = new THREE.BoxHelper( o, 0x424242 );
    o.add(box);

    o.position.x = x - state.depthWall;
    o.position.y = state.counterProps.height/2;
    o.position.z = z -state.depthWall;
    o.rotateY(angel);
    
    return o;
}

export default createCounter;