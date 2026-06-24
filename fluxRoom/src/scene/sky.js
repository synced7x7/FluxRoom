import * as THREE from 'three';

const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;

  void main() {
    float h = normalize(vWorldPosition + offset).y;
    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
  }
`;

export function createSky(scene) {
    const skyGeo = new THREE.SphereGeometry(400, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            topColor: { value: new THREE.Color(0x0d0604) }, // near-black warm, matches dark walls
            bottomColor: { value: new THREE.Color(0x221201) }, // rust sienna, matches window glow
            exponent: { value: 0.6 },
            offset: { value: 25 },
        },
        side: THREE.BackSide,
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
    return sky;
}