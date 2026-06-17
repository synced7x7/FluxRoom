import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function setupScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2b2b2b); 

  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.ShadowMaterial({ opacity: 0.5 })
  );
  shadowCatcher.rotation.x = -Math.PI / 2;
  shadowCatcher.position.y = -2;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  const camera = new THREE.PerspectiveCamera(
    64,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(6, 6, 6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // const pmremGenerator = new THREE.PMREMGenerator(renderer);
  // const environment = new RoomEnvironment();
  // scene.environment = pmremGenerator.fromScene(environment).texture;

  // Light
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSShadowMap;
  

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Main light
  // Overhead sky fill — low intensity so it doesn't fight the window beam
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(4, 9, 6);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  dirLight.shadow.radius = 8;
  dirLight.shadow.blurSamples = 16;
  scene.add(dirLight);
  scene.add(new THREE.PointLightHelper(dirLight, 0.5));

  // Ambient
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Window light
  const windowLight = new THREE.DirectionalLight(0xffe0b2, 1.1);
  windowLight.position.set(-9, 4.5, -1.5);
  windowLight.target.position.set(2, 0, 1);
  scene.add(windowLight.target);
  windowLight.castShadow = true;
  windowLight.shadow.mapSize.set(2048, 2048);
  scene.add(windowLight);
  scene.add(new THREE.DirectionalLightHelper(windowLight, 1));

  // Resize handling
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  return { scene, camera, renderer, controls };
}
