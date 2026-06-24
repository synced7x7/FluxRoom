import { models } from './modelLoader.js';
import * as THREE from 'three';

let isDay = true;
let sunTargetY = 4.5;
let moonTargetY = -7;

// light targets
let dirTargetColor = new THREE.Color(0xffffff);
let dirTargetIntensity = 0.6;
let windowTargetColor = new THREE.Color(0xffe0b2);
let windowTargetIntensity = 1.1;

//lamplight
let lampTargetIntensity = 0;
let standingLampTargetIntensity = 0;

// background 
let starsTargetOpacity = 0;

// day sky targets
let topColorTarget = new THREE.Color(0x87ceeb);
let bottomColorTarget = new THREE.Color(0xb0e0ff);


export function toggleDayNight(dirLight, windowLight, scene, stars, sky) {
    isDay = !isDay;

    if (isDay) {
        sunTargetY = 4.5;
        moonTargetY = -7;
        dirTargetColor.set(0xffffff);
        dirTargetIntensity = 0.6;
        windowTargetColor.set(0xffe0b2);
        windowTargetIntensity = 1.1;
        lampTargetIntensity = 0;
        standingLampTargetIntensity = 0;
        starsTargetOpacity = 0;
        topColorTarget.set(0x0d0604);    // dark wall tone
        bottomColorTarget.set(0x221201); // rust/burnt sienna from window
        scene.fog = new THREE.Fog(0x87ceeb, 20, 60);
    } else {
        moonTargetY = 4.5;
        sunTargetY = -7;
        dirTargetColor.set(0x334466);
        dirTargetIntensity = 0.15;
        windowTargetColor.set(0x8899ff);
        windowTargetIntensity = 0.3;
        lampTargetIntensity = 5;
        standingLampTargetIntensity = 16;
        starsTargetOpacity = 1;
        topColorTarget.set(0x020408);
        bottomColorTarget.set(0x0a1535);
        scene.fog = new THREE.Fog(0x0a0a1a, 20, 60);
    }
}

export function animateDayNight(dirLight, windowLight, scene, stars, sky) {
    if (!models.sun || !models.moon || !models.lampLight || !models.standingLampLight) return;

    // positions
    models.sun.position.y += (sunTargetY - models.sun.position.y) * 0.04;
    models.moon.position.y += (moonTargetY - models.moon.position.y) * 0.04;

    // visibility
    models.sun.visible = models.sun.position.y > -6;
    models.moon.visible = models.moon.position.y > -6;

    // light color lerp
    dirLight.color.lerp(dirTargetColor, 0.04);
    windowLight.color.lerp(windowTargetColor, 0.04);

    // light intensity lerp
    dirLight.intensity += (dirTargetIntensity - dirLight.intensity) * 0.04;
    windowLight.intensity += (windowTargetIntensity - windowLight.intensity) * 0.04;

    // lamp light intensity lerp
    models.lampLight.intensity += (lampTargetIntensity - models.lampLight.intensity) * 0.04;
    models.standingLampLight.intensity += (standingLampTargetIntensity - models.standingLampLight.intensity) * 0.04;

    // background color lerp

    sky.material.uniforms.topColor.value.lerp(topColorTarget, 0.04);
    sky.material.uniforms.bottomColor.value.lerp(bottomColorTarget, 0.04);
    // stars opacity lerp
    stars.material.opacity += (starsTargetOpacity - stars.material.opacity) * 0.04;
}

