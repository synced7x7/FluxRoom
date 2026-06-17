import * as THREE from 'three';

export function createRoom(scene) {
  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 5, 0.2),
    wallMaterial
  );
  backWall.position.set(0, 2.5, -5);
  scene.add(backWall);

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 5, 10),
    wallMaterial
  );
  leftWall.position.set(-5, 2.5, 0);
  scene.add(leftWall);

}