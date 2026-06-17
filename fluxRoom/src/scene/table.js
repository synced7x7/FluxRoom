import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadModel(scene) {
  const loader = new GLTFLoader();

  loader.load(
    "/models/scene.glb",
    (gltf) => {
      const model = gltf.scene;

      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}