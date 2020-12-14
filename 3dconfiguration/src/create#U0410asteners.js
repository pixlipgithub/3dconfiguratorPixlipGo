import * as THREE from 'three';
import state from './state';

var createАasteners = function(o,offset,height) {
    var z_m = new THREE.MeshStandardMaterial( { color: 0xcccccc } );
    var z_g = new THREE.BoxBufferGeometry(0.16, 0.01, 0.16);
    var z_o = new THREE.Mesh(z_g,z_m);
    z_o.position.y=-height/2 ;
    z_o.position.z=state.depthWall;
    z_o.position.x=offset;
    o.add(z_o);
}

export default createАasteners;