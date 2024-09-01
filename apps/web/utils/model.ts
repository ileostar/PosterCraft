import * as THREE from "three";

export const createMesh = (geom: THREE.BufferGeometry, mat: THREE.Material, scale: number) => {
  const mesh = new THREE.Mesh(geom, mat);
  mesh.scale.set(scale, scale, scale);
  return mesh;
};

export const addLights = (scene: THREE.Scene) => {
  const lights = [
    { color: 0xffffff, position: [1, 0, 0] },
    { color: 0x11e8bb, position: [0.75, 1, 0.5] },
    { color: 0x8200c9, position: [-0.75, -1, 0.5] },
  ];
  lights.forEach((light) => {
    const l = new THREE.DirectionalLight(light.color, 5);
    l.position.set(...(light.position as [number, number, number]));
    scene.add(l);
  });
};

export const createParticles = (particle: THREE.Object3D) => {
  const geometry = new THREE.TetrahedronGeometry(2, 0);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + Math.random() * 700);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }
};

export const animateDefault = (
  particle: THREE.Object3D,
  inside: THREE.Object3D,
  outside: THREE.Object3D,
) => {
  particle.rotation.x += 0.001;
  particle.rotation.y -= 0.004;
  inside.rotation.x -= 0.002;
  inside.rotation.y -= 0.003;
  outside.rotation.x -= 0.001;
  outside.rotation.y += 0.002;
};

export const animateInteractive = (
  particle: THREE.Object3D,
  inside: THREE.Object3D,
  outside: THREE.Object3D,
  mouse: { x: number; y: number },
) => {
  particle.rotation.x = mouse.y * 0.5;
  particle.rotation.y = mouse.x * 0.5;
  inside.rotation.x = -mouse.y * 0.2;
  inside.rotation.y = -mouse.x * 0.2;
  outside.rotation.x = -mouse.x * 0.1;
  outside.rotation.y = mouse.y * 0.1;
};
