import * as THREE from "three";

export function setupScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // sky

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

  // Light
  // const light = new THREE.DirectionalLight(0xffffff, 1);
  // light.position.set(5, 10, 5);
  // scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);

  dirLight.castShadow = true;

  // Shadow quality tuning
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 50;

  scene.add(dirLight);

  // Resize handling
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}
