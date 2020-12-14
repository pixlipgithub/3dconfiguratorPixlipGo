import * as THREE from 'three';

import state from './state';
import build from './build';

import threeLight from './threeLight';

import eventDragStart from './eventDragStart';
import eventDragEnd from './eventDragEnd';
import eventDrag from './eventDrag';

import submit from './submit';

var camera,scene,renderer,controls;

function init() {
    var container = document.getElementById('canvas-standgenerator');
	renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    camera = new THREE.PerspectiveCamera(55, container.clientWidth/container.clientHeight, 0.1, 2000);
    state.camera = camera;
	camera.position.y = state.height*0.7;
	camera.position.z = state.length*0.9;
	camera.position.x = state.width*0.9;

    scene = new THREE.Scene();
    state.scene = scene;

	window.addEventListener('resize',onWindowResize,false);

	function onWindowResize() {
		camera.aspect = container.clientWidth/container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth,container.clientHeight);
    };
    
    container.appendChild(renderer.domElement);

    threeLight(scene);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.screenSpacePanning=true;

   // controls.target = new THREE.Vector3(0, 3, 0);
    controls.enableDamping=true;
    controls.dampingFactor=0.08;
    controls.enableZoom=true;
    controls.minPolarAngle=Math.PI/4;
    controls.maxPolarAngle=Math.PI/2;
    controls.minDistance = 6;
    controls.maxDistance = 12;
    controls.enablePan = false;
    controls.rotateSpeed=1.5;

    state.controls = controls;

    var dragGroup=new THREE.Group();
    state.dragGroup = dragGroup;
    
    state.dragControls = new THREE.DragControls( [state.dragGroup], camera, renderer.domElement );
    state.dragControls.transformGroup=false;

    state.dragControls.addEventListener( 'dragstart', eventDragStart);
    state.dragControls.addEventListener( 'dragend', eventDragEnd);
    state.dragControls.addEventListener ( 'drag', eventDrag);

    scene.add(dragGroup);
    
    animate();
};

function animate() {
   // if (state.needsUpdateCanvas!==false) updateCanvas();
    if (state.needsUpdate===true) {
        build(function() {
            render();    
        });

    } else {
        render();
    }
};

function render() {
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

export {init,state,submit};