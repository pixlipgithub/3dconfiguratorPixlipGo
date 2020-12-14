import * as THREE from 'three';

var threeLight = function(scene) {
    var spotLight_big = new THREE.SpotLight( 0xffffe3, 0.2 );
    spotLight_big.position.set( -200, 50, 200 );

    spotLight_big.angle=Math.PI;
    spotLight_big.penumbra=true;
    
    // var helper = new THREE.CameraHelper( spotLight_big.shadow.camera );
    // scene.add( helper );
    //var spotLightHelper_big = new THREE.SpotLightHelper( spotLight_big );
    // scene.add( spotLightHelper_big );
    scene.add(spotLight_big);

    var spotLight_back = new THREE.SpotLight( 0xffffff, 0.2 );
        spotLight_back.position.set( 200, 50, -200 );
        spotLight_back.angle=Math.PI;
        spotLight_back.penumbra=true;
     //   scene.add(spotLight_back);

    //var spotLightHelper_back = new THREE.SpotLightHelper( spotLight_back );
    //     scene.add( spotLightHelper_back );


    var spotLight_front = new THREE.SpotLight( 0xffffff, 0.5 );
    spotLight_front.position.set( 200, 50, 200 );
    spotLight_front.angle=Math.PI;
    spotLight_front.penumbra=true;
        scene.add(spotLight_front);

    //var spotLightHelper_front = new THREE.SpotLightHelper( spotLight_front );
    //     scene.add( spotLightHelper_front );

    var spotLight_top = new THREE.SpotLight( 0xffffff, 0.4 );
    spotLight_top.position.set( -30, 300, 100 );
    spotLight_top.penumbra=true;
    spotLight_top.angle=Math.PI/4;
        scene.add(spotLight_top);

    var ambient=new THREE.AmbientLight(0xb9cdff,0.4);
    ambient.position.set(5000,5000,5000);
    scene.add(ambient);
}

export default threeLight;