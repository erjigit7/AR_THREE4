import * as THREE from 'three';
import * as THREEx from '../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

function main() {
    const canvas = document.getElementById('canvas1');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    renderer.setSize(window.innerWidth, window.innerHeight);

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    // Create a box mesh
    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
    const box = new THREE.Mesh(geom, mtl);

    // Position camera initially
    camera.position.set(0, 0, 500);

    // Create the device orientation tracker
    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

    // Add box at a specific location (e.g., close to your location)
    arjs.add(box, 42.862155, 74.602202); 

    arjs.startGps();

    // Render loop
    requestAnimationFrame(render);

    function render() {
        // Update canvas size
        if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth / canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }

        // Update the scene using the latest sensor readings
        deviceOrientationControls.update();

        // Update webcam feed
        cam.update();

        // Render the scene
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}

main();
