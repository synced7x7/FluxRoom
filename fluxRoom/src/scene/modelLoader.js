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
    chair
  ] = await Promise.all([
    loadGLTFAsync("/models/table/scene.gltf"),
    loadGLTFAsync("/models/vintage_items/scene.gltf"),
    loadGLTFAsync("/models/lamp.glb"),
    loadGLTFAsync("/models/standing_lamp.glb"),
    loadGLTFAsync("/models/antique_chair.glb"),
  ]);

  table.scene.position.set(-3.7, 0, 0);
  table.scene.scale.set(25, 25, 25);
  scene.add(table.scene);
  models.table = table.scene;

  vintage.scene.position.set(-3.3, 1.59, 0.2);
  vintage.scene.scale.set(0.015, 0.015, 0.015);
  scene.add(vintage.scene);
  models.vintage = vintage.scene;

  lamp.scene.position.set(-3.3, 1.6, -1);
  lamp.scene.scale.set(10, 10, 10);
  scene.add(lamp.scene);
  models.lamp = lamp.scene;

  standingLamp.scene.position.set(-3.3, 0, -3.2);
  standingLamp.scene.scale.set(0.25, 0.25, 0.25);
  scene.add(standingLamp.scene);
  models.standingLamp = standingLamp.scene;

  chair.scene.position.set(0, 2.5, 0.2);
  chair.scene.rotation.y = -Math.PI / 2;
  chair.scene.scale.set(1.8, 1.8, 1.8);
  scene.add(chair.scene);
  models.chair = chair.scene;
}
