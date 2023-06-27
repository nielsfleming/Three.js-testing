import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets up the 3d renderer and chooses where to render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// Sets certain variables for the renderer and places the camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// renders the scene
renderer.render(scene, camera);

// We need a geometry to put into our scene
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
// we set the geometry and mertial and then mesh it together

scene.add(torus);

// Here we add different lighting as the meterial needs to reflect light to be seen
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

// These are helpful objects that show us where the light is and a grid
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(lightHelper, gridHelper);

// Oribit ocntrols allow us ot move around the page with the mouse
const controls = new OrbitControls(camera, renderer.domElement);

// Some math to fill the screen with random stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// This is the texture that will be used for the background of our scene
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Adds a cube to the scene that has a velo one each side of it
const veloTexture = new THREE.TextureLoader().load("velo.png");

const velo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    map: veloTexture,
    // Could use a normal map here too to give the texture more depth
  })
);

scene.add(velo);

// velo.position.z = 30;
// velo.positiion.x = -10;

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   velo.rotation.x += 0.05;
//   velo.rotation.y += 0.075;
//   velo.rotation.z += 0.05;

//   camera.position.x = t * -0.01;
//   camera.position.y = t * -0.002;
//   camera.position.y = t * -0.002;
// }

// document.body.onscroll = moveCamera;

// This is the function that will be called every frame and renders the scene
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
