import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export const models = {}; // store references

function loadGLTF(path, onLoad) {
  loader.load(
    path,
    (gltf) => onLoad(gltf.scene),
    undefined,
    (error) => console.error("Model error:", error)
  );
}

export function loadModels(scene) {
  loadGLTF("/models/table/scene.gltf", (model) => {
    model.position.set(-3.7, 0, 0);
    model.scale.set(25, 25, 25);

    scene.add(model);
    models.table = model;
  });

  loadGLTF("/models/vintage_items/scene.gltf", (model) => {
    model.position.set(-3.3, 1.59, 0.2);
    model.scale.set(0.015, 0.015, 0.015);

    scene.add(model);
    models.vintage = model;
  });

  loadGLTF("/models/lamp.glb", (model) => {
    model.position.set(-3.3, 1.6, -1); 
    model.scale.set(10, 10, 10);

    scene.add(model);
    models.lamp = model;
  });

  loadGLTF("/models/standing_lamp.glb", (model) => {
    model.position.set(-3.3, 0, -3.2); 
    model.scale.set(.25, 0.25, 0.25);

    scene.add(model);
    models.lamp = model;
  });

  loadGLTF("/models/antique_chair.glb", (model) => {
    model.position.set(0, 2.5, 0.2); 
    model.rotation.y = -Math.PI / 2;
    model.scale.set(1.8, 1.8, 1.8);

    scene.add(model);
    models.chair = model;
  });

}
