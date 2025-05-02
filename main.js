// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import GUI from 'lil-gui'; // 👈 lil-gui import

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100
// );

// const geometry = new THREE.BoxGeometry(1, 2, 7);
// const material = new THREE.MeshPhysicalMaterial({ color: "red" });
// const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);

// const light = new THREE.DirectionalLight("white",3);
// light.position.set(4,5,0);
// scene.add(light);

// const amb = new THREE.AmbientLight("white",0.1);
// scene.add(amb);


// camera.position.z = 7;


// const canvas = document.querySelector("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const controls = new OrbitControls(camera, renderer.domElement);



// // const mouse = { 
// //     x: 0,
// //     y: 0 
// // };

// // window.addEventListener("mousemove", function (e) {
// //     mouse.x = e.clientX / this.innerWidth;
// //     mouse.y = e.clientY / this.innerHeight;
// // });

// window.addEventListener("resize", function () {
//     camera.aspect = this.window.innerWidth / this.window.innerHeight;
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.updateProjectionMatrix();
// }); 

// // 🛠 GUI Setup
// const gui = new GUI();
// const cubeFolder = gui.addFolder('Cube'); //Cube naam ka folder Gui ke andar

// // Size controls(cubefolder me hum width,height,depth ko change karne wale hain...range hai 0.1 se 5)
// cubeFolder.add(cube.scale, 'x', 0.1, 5).name('Width');
// cubeFolder.add(cube.scale, 'y', 0.1, 5).name('Height');
// cubeFolder.add(cube.scale, 'z', 0.1, 5).name('Depth');

// // Color control/picker
// const colorParams = { color: '#ff0000' };
// cubeFolder.addColor(colorParams, 'color').onChange(() => {
//     cube.material.color.set(colorParams.color);
// });

// cubeFolder.open(); // Folder ko open dikhane ke liye

// function animate() {
//     renderer.render(scene, camera);
//     controls.update();
//     // cube.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 2));
//     window.requestAnimationFrame(animate);
// }
// animate(); 


/*
Raycaster ka use hota hai pointer ko use karne ke liye jaise ki mouseevent jitne bhi types se hotey hain ...mouseenter, mouseleave
*/



import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, -10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// HDRI Environment
new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/golden_gate_hills_4k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });

// Load 3D Model
const loader = new GLTFLoader();
loader.load('/georgian_t-55am.glb', function(gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.set(0,-5,0);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) { 
        console.error('An error occurred loading the model:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();


