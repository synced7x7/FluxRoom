import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export const models = {}; // store references

function loadGLTFAsync(path) {
  return loader.loadAsync(path);
}

export async function loadModels(scene) {
  const [
    table,
    vintage,
    lamp,
    standingLamp,
    chair,
    moon,
    sun,
  ] = await Promise.all([
    loadGLTFAsync("/models/table/scene.gltf"),
    loadGLTFAsync("/models/vintage_items/scene.gltf"),
    loadGLTFAsync("/models/lamp.glb"),
    loadGLTFAsync("/models/standing_lamp.glb"),
    loadGLTFAsync("/models/antique_chair.glb"),
    loadGLTFAsync("/models/moon.glb"),
    loadGLTFAsync("/models/sun.glb"),
  ]);

  // table.scene.position.set(-3.7, 0, 0);
  // table.scene.scale.set(25, 25, 25);
  // scene.add(table.scene);
  // models.table = table.scene;

  // vintage.scene.position.set(-3.3, 1.59, 0.2);
  // vintage.scene.scale.set(0.015, 0.015, 0.015);
  // scene.add(vintage.scene);
  // models.vintage = vintage.scene;

  // lamp.scene.position.set(-3.3, 1.6, -1);
  // lamp.scene.scale.set(10, 10, 10);
  // scene.add(lamp.scene);
  // models.lamp = lamp.scene;

  // const lampLight = new THREE.PointLight(0x44aacc, 0, 6); // intensity 0 = off initially
  // lampLight.position.set(-3.3, 2.2, -1); // slightly above lamp
  // lampLight.castShadow = true;
  // scene.add(lampLight);
  // models.lampLight = lampLight;

  
  // standingLamp.scene.position.set(-3.3, 0, -3.2);
  // standingLamp.scene.scale.set(0.25, 0.25, 0.25);
  // scene.add(standingLamp.scene);
  // models.standingLamp = standingLamp.scene;

  // const standingLampLight = new THREE.SpotLight(0xff6a00, 0, 8, Math.PI / 2.5, 0.4);
  // standingLampLight.position.set(-1.8, 3.2, -3.2);
  // standingLampLight.target.position.set(-1.8, 0, -3.2);
  // // const spotHelper = new THREE.SpotLightHelper(standingLampLight);
  // // scene.add(spotHelper);
  // scene.add(standingLampLight.target);
  // scene.add(standingLampLight);
  // models.standingLampLight = standingLampLight;


  // chair.scene.position.set(0, 2.5, 0.2);
  // chair.scene.rotation.y = -Math.PI / 2;
  // chair.scene.scale.set(1.8, 1.8, 1.8);
  // scene.add(chair.scene);
  // models.chair = chair.scene;

  // moon.scene.position.set(-19, -5, -1.5);
  // moon.scene.scale.set(0.5, 0.5, 0.5);
  // moon.scene.rotation.y = Math.PI / 2;
  // moon.scene.visible = false;
  // scene.add(moon.scene);
  // models.moon = moon.scene;

  // sun.scene.position.set(-19, 4.5, -1.5);
  // sun.scene.scale.set(1, 1, 1);
  // scene.add(sun.scene);
  // models.sun = sun.scene;

  // sun.scene.traverse((child) => {
  //   if (child.isMesh) {
  //     child.material.emissive = new THREE.Color(0xff4500);
  //     child.material.emissiveMap = child.material.map;
  //     child.material.emissiveIntensity = 1;
  //   }
  // });

  // moon.scene.traverse((child) => {
  //   if (child.isMesh) {
  //     child.material.emissive = new THREE.Color(0x8899ff);
  //     child.material.emissiveIntensity = 1;
  //   }
  // });
}
