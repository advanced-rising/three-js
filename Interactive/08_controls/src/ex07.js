import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { KeyController } from './KeyController';

// ----- 주제: PointerLockControls에 키보드 컨트롤 추가

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new PointerLockControls(camera, renderer.domElement);

  controls.domElement.addEventListener('click', () => {
    controls.lock();
  });
  controls.addEventListener('lock', () => {
    console.log('lock!');
  });
  controls.addEventListener('unlock', () => {
    console.log('unlock!');
  });

  // 키보드 컨트롤
  const keyController = new KeyController();

  function walk(target) {
    if (target != null) {
      //카메라 position
      const origpos = new THREE.Vector3().copy(camera.position);
      //타겟 position
      const targetpos = new THREE.Vector3().copy(controls.target);

      //방향 벡터(x2-x1, y2-y1, z2-z1)를 구하고 normalize
      const dir = new THREE.Vector3(
        origpos.x - targetpos.x,
        origpos.y - targetpos.y,
        origpos.z - targetpos.z
      ).normalize();

      if (keyController.keys['KeyA']) {
        const newpos = new THREE.Vector3(
          targetpos.x + -dir.z * CAMERA_SPEED,
          targetpos.y,
          targetpos.z + dir.x * CAMERA_SPEED
        );

        const camnewpos = new THREE.Vector3(
          origpos.x + -dir.z * CAMERA_SPEED,
          origpos.y,
          origpos.z + dir.x * CAMERA_SPEED
        );

        //타겟 지점 변경
        controls.target.set(newpos.x, newpos.y, newpos.z);
        //카메라 위치 변경
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      } else if (keyController.keys['KeyD']) {
        const newpos = new THREE.Vector3(
          targetpos.x + dir.z * guiData.CAMERA_SPEED,
          targetpos.y,
          targetpos.z + -dir.x * guiData.CAMERA_SPEED
        );

        const camnewpos = new THREE.Vector3(
          origpos.x + dir.z * guiData.CAMERA_SPEED,
          origpos.y,
          origpos.z + -dir.x * guiData.CAMERA_SPEED
        );

        controls.target.set(newpos.x, newpos.y, newpos.z);
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      } else if (keyController.keys['KeyW']) {
        const newpos = new THREE.Vector3(
          targetpos.x - dir.x * guiData.CAMERA_SPEED,
          targetpos.y - dir.y * guiData.CAMERA_SPEED,
          targetpos.z - dir.z * guiData.CAMERA_SPEED
        );

        const camnewpos = new THREE.Vector3(
          origpos.x - dir.x * guiData.CAMERA_SPEED,
          origpos.y - dir.y * guiData.CAMERA_SPEED,
          origpos.z - dir.z * guiData.CAMERA_SPEED
        );

        controls.target.set(newpos.x, newpos.y, newpos.z);
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      } else if (keyController.keys['KeyS']) {
        const newpos = new THREE.Vector3(
          targetpos.x + dir.x * guiData.CAMERA_SPEED,
          targetpos.y + dir.y * guiData.CAMERA_SPEED,
          targetpos.z + dir.z * guiData.CAMERA_SPEED
        );

        const camnewpos = new THREE.Vector3(
          origpos.x + dir.x * guiData.CAMERA_SPEED,
          origpos.y + dir.y * guiData.CAMERA_SPEED,
          origpos.z + dir.z * guiData.CAMERA_SPEED
        );

        controls.target.set(newpos.x, newpos.y, newpos.z);
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      } else if (keyController.keys['KeyE']) {
        const newpos = new THREE.Vector3(
          targetpos.x,
          targetpos.y + 1 * guiData.CAMERA_SPEED,
          targetpos.z
        );

        const camnewpos = new THREE.Vector3(
          origpos.x,
          origpos.y + 1 * guiData.CAMERA_SPEED,
          origpos.z
        );

        controls.target.set(newpos.x, newpos.y, newpos.z);
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      } else if (keyController.keys['KeyQ']) {
        const newpos = new THREE.Vector3(
          targetpos.x,
          targetpos.y - 1 * guiData.CAMERA_SPEED,
          targetpos.z
        );

        const camnewpos = new THREE.Vector3(
          origpos.x,
          origpos.y - 1 * guiData.CAMERA_SPEED,
          origpos.z
        );

        controls.target.set(newpos.x, newpos.y, newpos.z);
        camera.position.set(camnewpos.x, camnewpos.y, camnewpos.z);
      }

      //컨트롤 업데이트
      controls.update();
      //카메라 업데이트
      camera.updateProjectionMatrix();
    }
  }

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;
  for (let i = 0; i < 20; i++) {
    const colorOne = 50 + Math.floor(Math.random() * 205);
    const colorTwo = 50 + Math.floor(Math.random() * 205);
    const colorThree = 50 + Math.floor(Math.random() * 205);
    const rgba = 'rgb' + '(' + colorOne + ',' + colorTwo + ',' + colorThree + ')';

    material = new THREE.MeshStandardMaterial({
      color: rgba,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    walk(targetObj);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
