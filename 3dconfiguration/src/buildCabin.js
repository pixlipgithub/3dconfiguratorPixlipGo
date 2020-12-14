import * as THREE from 'three';
import state from './state';
import createАasteners from './createАasteners';
import getNameBox from './getNameBox';

var buildCabin = function(scene) {
    if (state.cabin>0 && state.walls>1 && state.width>1 && state.length>1 && (state.walls<3 || (state.width>2 || state.length>2) ) ) {
        var cabin_width = state.cabinProps.width;
        if (state.length<=3) cabin_width = 0.85;
        var is_one = false;
        if (state.length==2 && state.walls==3) {
            cabin_width = 0.85;
            is_one=true;
        }

        var g = new THREE.BoxBufferGeometry(cabin_width-0.01, state.height, state.depthWall);

        var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
        var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
            m2.color = new THREE.Color( state.wallColor1);

        var obj = new THREE.Mesh(g,[m1,m1,m1,m1,m2,m2]);
        var box = new THREE.BoxHelper( obj, 0x424242 );
        obj.add(box);
        
        obj.position.y = state.height/2;
        obj.position.x = -state.length/2 + cabin_width/2 ; 
        obj.position.z = -state.width/2 + state.cabinProps.depth + state.depthWall/2; 

        if (cabin_width>=2) createАasteners(obj, 0, state.height);
        createАasteners(obj, cabin_width/2-0.2, state.height);
        createАasteners(obj, -cabin_width/2+0.2, state.height);
        
        obj.userData = getNameBox(cabin_width,state.height, cabin_width==0.85? 1 : 1.5);
        obj.name = obj.userData.name;
        obj.isLightBox = true;
        scene.add(obj);
        if (is_one===true) {
            //если широкий
            var g = new THREE.BoxBufferGeometry(cabin_width-0.01, state.height, state.depthWall);

            var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
            var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
                m2.color = new THREE.Color( state.wallColor1);
    
            var obj = new THREE.Mesh(g,[m1,m1,m1,m1,m2,m2]);
            var box = new THREE.BoxHelper( obj, 0x424242 );
            obj.add(box);
    
            obj.position.y = state.height/2;
            obj.position.x = -state.length/2 + cabin_width/2*3; 
            obj.position.z = -state.width/2 + state.cabinProps.depth + state.depthWall/2; 

            obj.userData = getNameBox(cabin_width,state.height,0);
            obj.name = obj.userData.name;
            obj.isLightBox = true;
            scene.add(obj);
        } else {
            var g2 = new THREE.BoxGeometry(state.cabinProps.depth-0.01, state.height, state.depthWall);
            var obj2 = new THREE.Mesh(g2,[m1,m1,m1,m1,m2,m2]);
            var box2 = new THREE.BoxHelper( obj2, 0x424242 );
            obj2.add(box2);
    
            obj2.position.y = state.height/2;
            obj2.position.x = -state.length/2 + cabin_width + state.depthWall/2; 
            obj2.position.z = -state.width/2 + state.cabinProps.depth/2 ; 
            obj2.rotateY(Math.PI/2);
            
            obj2.userData = getNameBox(state.cabinProps.depth,state.height,0);
            obj2.name = obj2.userData.name;
            obj2.isLightBox = true;
            scene.add(obj2);
        }
    }
}

export default buildCabin;