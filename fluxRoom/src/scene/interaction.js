import * as THREE from 'three';
import {models} from './modelLoader.js';
import {toggleDayNight} from './utilitites.js';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let hoveredLamp = false;

export function initLampInteraction(dirLight, windowLight, scene, stars, sky) {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) *2 -1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('click', () => {
    if (hoveredLamp) {
      toggleDayNight(dirLight, windowLight, scene, stars, sky);
    }
  });
}

export function checkLampHover(camera) {
  const { lamp } = models;
  if (!lamp) return;

  raycaster.setFromCamera(mouse, camera);
  const meshes = [];
  lamp.traverse(c => { if (c.isMesh) meshes.push(c); });

  const hits = raycaster.intersectObjects(meshes);

  if (hits.length > 0) {
    if (!hoveredLamp) {
      hoveredLamp = true;
      document.body.style.cursor = 'pointer';
      lamp.traverse(c => {
        if (c.isMesh) {
          c.material.emissive = new THREE.Color(0x44aacc);
          c.material.emissiveIntensity = 0.1;
        }
      });
    }
  } else {
    if (hoveredLamp) {
      hoveredLamp = false;
      document.body.style.cursor = 'default';
      lamp.traverse(c => {
        if (c.isMesh) {
          c.material.emissiveIntensity = 0;
        }
      });
    }
  }
}

