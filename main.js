import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function init() {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const lights = createLight();
    const controls = orbitControls(camera, renderer);

    scene.add(lights);

    const cubes = createCubes(scene);

    animate(scene, camera, renderer, controls, cubes);
    handleResize(renderer, camera);
}

// Create Scene
function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

// Create Camera
function createCamera() {
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;
    return camera;
}

// Create Renderer
function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 4; // Exposure Value
    return renderer;
}

// Create Lights
function createLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(3, 7, 7);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light

    // const pointLight = new THREE.PointLight(0xff0000, 1, 50);
    // pointLight.position.set(10, 10, 10);

    const lights = new THREE.Group();
    lights.add(directionalLight);
    lights.add(ambientLight);
    // lights.add(pointLight);

    return lights;
}

// Orbit Controls Functionalities
function orbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom= false; 
    return controls;
}

// Create Cubes
function createCubes(scene) {
    const colors = [
        0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 0x4285F4, 
    ];

    const cubes = [];

    function createCube(size, color) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({ color: color, metalness: 0.9, roughness: 0.2 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        return cube;
    }

    colors.forEach(color => {
        cubes.push(createCube(2, color));
    });

    return cubes;
}

// Animate the Cubes
function animate(scene, camera, renderer, controls, cubes) {
    function render() {
        requestAnimationFrame(render);
        cubes.forEach((cube, index) => {
            const speed = 0.006 - (index * 0.0005);
            cube.rotation.x += speed;
            cube.rotation.y -= speed;
        });
        controls.update();
        renderer.render(scene, camera);
    }
    render();
}

// Resize Event
function handleResize(renderer, camera) {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

init();

