import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
  },
};

gui.add(world.plane, 'width', 1, 10).onChange(generatePlane);
gui.add(world.plane, 'height', 1, 10).onChange(generatePlane);
gui.add(world.plane, 'widthSegments', 1, 10).onChange(generatePlane);
gui.add(world.plane, 'heightSegments', 1, 10).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.widthSegments,
    world.heightSegments
  );

  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const mesh = new THREE.Mesh(boxGeometry, material);

console.log(boxGeometry);
console.log(material);

// scene.add(mesh);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.ShaderMaterial,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const light = new THREE.DirectionalLight(0xffffff, 2);

scene.add(light);
console.log('light', light);

light.position.set(0, 0, 1);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  // planeMesh.rotation.x += 0.01;
}

animate();
