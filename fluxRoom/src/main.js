import './style.css';
import { setupScene } from './scene/setup.js';
import { createRoom } from './scene/room.js';
import { loadModels } from './scene/modelLoader.js';
import { toggleDayNight, animateDayNight } from './scene/utilitites.js';
// import { setupInteraction } from './scene/interaction.js';
import * as THREE from 'three';

// Setup
const { scene, camera, renderer, controls, composer, dirLight, windowLight } = setupScene();

// Room
createRoom(scene);
// Model
loadModels(scene);


// Interaction
//setupInteraction(camera, scene);

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  composer.render();
  animateDayNight(dirLight, windowLight);
}
animate();

//Events
window.addEventListener('click', () => toggleDayNight(dirLight, windowLight));

console.log("Hello, FluxRoom!");