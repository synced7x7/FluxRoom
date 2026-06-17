import './style.css';
import { setupScene } from './scene/setup.js';
import { createRoom } from './scene/room.js';
// import { setupInteraction } from './scene/interaction.js';
import * as THREE from 'three';

// Setup
const { scene, camera, renderer } = setupScene();

// Room
createRoom(scene);



// Interaction
//setupInteraction(camera, scene);

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

console.log("Hello, FluxRoom!");