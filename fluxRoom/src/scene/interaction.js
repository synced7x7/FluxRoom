import * as THREE from 'three';

export function setupInteraction(camera, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      console.log("Clicked:", obj.name);

      if (obj.name === "interactive") {
        scene.background = new THREE.Color(Math.random() * 0xffffff);
      }
    }
  });
}