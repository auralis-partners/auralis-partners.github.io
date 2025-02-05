import * as THREE from 'three';

function setupAttributes(geometry) {
    const vectors = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1)
    ];

    const position = geometry.attributes.position;
    const centers = new Float32Array(position.count * 3);

    for (let i = 0, l = position.count; i < l; i++) {
        vectors[i % 3].toArray(centers, i * 3);
    }

    geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight + window.innerHeight * 0.01);
}

function render(scene, camera, renderer) {
    renderer.render(scene, camera);
}

export { setupAttributes, onWindowResize, render };