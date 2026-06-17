import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export function createRoom(scene) {
    //textureLoader

    const loader = new THREE.TextureLoader();
    const exrLoader = new EXRLoader();

    const normalMap_floor = exrLoader.load("/src/assets/textures/plank_flooring/plank_flooring_04_nor_gl_1k.exr");
    const roughnessMap_floor = exrLoader.load("/src/assets/textures/plank_flooring/plank_flooring_04_rough_1k.exr");
    const colorMap_floor = loader.load("/src/assets/textures/plank_flooring/plank_flooring_04_diff_1k.jpg");
    const displacementMap_floor = loader.load("/src/assets/textures/plank_flooring/plank_flooring_04_disp_1k.png");

    // const colorMap_wall = loader.load("/src/assets/textures/plastered_wall/wooden_gate_diff_1k.jpg");
    // const normalMap_wall = exrLoader.load("/src/assets/textures/plastered_wall/wooden_gate_nor_gl_1k.exr");
    // const roughnessMap_wall = exrLoader.load("/src/assets/textures/plastered_wall/wooden_gate_rough_1k.exr");
    // const displacementMap_wall = loader.load("/src/assets/textures/plastered_wall/raw_plan_disp_1k.png");



    colorMap_floor.colorSpace = THREE.SRGBColorSpace;

    const floor_material = new THREE.MeshStandardMaterial({
        map: colorMap_floor,
        displacementMap: displacementMap_floor,
        displacementScale: 0.05, // tweak this
        normalMap: normalMap_floor,
        normalScale: new THREE.Vector2(2, 2),
        roughnessMap: roughnessMap_floor,
    });
    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 100, 100),
        floor_material,
    );

    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        map: colorMap_floor,
        displacementMap: displacementMap_floor,
        displacementScale: 0.05, // tweak this
        normalMap: normalMap_floor,
        normalScale: new THREE.Vector2(2, 2),
        roughnessMap: roughnessMap_floor,
    });

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 0.2),
        wallMaterial,
    );
    backWall.position.set(0, 2.5, -5);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 5, 10),
        wallMaterial,
    );
    leftWall.position.set(-5, 2.5, 0);
    scene.add(leftWall);
}
