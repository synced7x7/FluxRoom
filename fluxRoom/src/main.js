import './style.css';
import { setupScene } from './scene/setup.js';
import { createRoom } from './scene/room.js';
import { loadModels } from './scene/modelLoader.js';
import { toggleDayNight, animateDayNight } from './scene/utilitites.js';
import { createStars } from './scene/stars.js';
import { createSky } from './scene/sky.js';
import { initLampInteraction, checkLampHover } from './scene/interaction.js';

//import studio from '@theatre/studio';
//import { getProject, types } from '@theatre/core';

import * as THREE from 'three';
// console.log(studio);
// studio.initialize();
const { scene, camera, renderer, controls, composer, dirLight, windowLight } = setupScene();

createRoom(scene);

const stars = createStars(scene);
const sky = createSky(scene);

// Must await so models exist before interaction setup
await loadModels(scene);

// Now safe to init — models.lamp is populated
initLampInteraction(dirLight, windowLight, scene, stars, sky);

// Theatre


// // const project = getProject('FluxRoom');
// // const sheet = project.sheet('Scene');

// const cameraObj = sheet.object('Camera', {
//   position: types.compound({
//     x: types.number(camera.position.x),
//     y: types.number(camera.position.y),
//     z: types.number(camera.position.z),
//   }),
//   target: types.compound({
//     x: types.number(0),
//     y: types.number(0),
//     z: types.number(0),
//   }),
// });

// cameraObj.onValuesChange(({ position, target }) => {
//   camera.position.set(position.x, position.y, position.z);
//   controls.target.set(target.x, target.y, target.z);
//   controls.update();
// });

// // Call this to trigger the chair flythrough (bind to a UI button or key)
// function flyToChair() {
//   sheet.sequence.play({ range: [0, 2], iterationCount: 1 });
// }

// // Example: press F to fly
// window.addEventListener('keydown', (e) => {
//   if (e.key === 'f') flyToChair();
// });

function animate() {
  requestAnimationFrame(animate);
  checkLampHover(camera); // every frame, needs camera
  composer.render();
  animateDayNight(dirLight, windowLight, scene, stars, sky);
}
animate();