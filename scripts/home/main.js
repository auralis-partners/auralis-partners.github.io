import * as THREE from 'three';
import { OBJLoader } from 'three/addons/objloader';
import { setupAttributes, onWindowResize, render } from './util.js';
import { annotate } from 'rough-notation';

let canvas = document.getElementById('wireframe');

let renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
camera.position.z = 400;
camera.position.y = 140;

let object3d = await new OBJLoader().loadAsync('assets/obj/MountainTerrain.txt');

let geometry = object3d.children[0].geometry;
geometry.deleteAttribute('normal');
geometry.deleteAttribute('uv');

setupAttributes(geometry);

const material = new THREE.MeshBasicMaterial({
    color: 0x262626,
    wireframe: true
});

let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
mesh.scale.set(0.5, 0.5, 0.5);

scene.add(mesh);
scene.background = new THREE.Color(0xf0f0f0);
render(scene, camera, renderer);

window.addEventListener('resize', () => {
    onWindowResize(camera, renderer)
});

function rotate() {
    //get scroll position
    let scroll = window.scrollY;
    camera.position.y = 140 + scroll * 0.05;

    mesh.rotation.y += 0.001;
    render(scene, camera, renderer);
    requestAnimationFrame(rotate);
}

const creatives = document.getElementById('hero-creatives');
const creatives_annotation = annotate(creatives, { type: 'highlight', color: '#a9d3ff5f' });

const innovators = document.getElementById('hero-innovators');
const innovators_annotation = annotate(innovators, { type: 'box', color: '#96C5F7' });

const techies = document.getElementById('hero-techies-text');
const techies_annotation = annotate(techies, { type: 'underline', color: '#086788' });

requestAnimationFrame(() => {
    rotate();
});

setTimeout(() => {
    creatives_annotation.show();
}, 3000);

setTimeout(() => {
    innovators_annotation.show();
}, 2000);

setTimeout(() => {
    techies_annotation.show();
}, 1000);