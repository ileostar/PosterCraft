import React, { useCallback, useState } from 'react';  
import * as THREE from 'three';  
  
function Index(props: any) {   

let renderer:any, scene:any, camera:any, inside:any, outside:any, particle:any;


function onload(node: HTMLDivElement) {
    console.log('three.js loaded');
    console.log(props);
    console.log(props.boxWidth, props.boxHeight)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(650, 450);
    renderer.setSize(props.boxWidth, props.boxHeight);
    node.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, props.boxWidth / props.boxHeight, 1, 1000);
    camera.position.z = 500;

    scene.add(camera);

    var geom = new THREE.IcosahedronGeometry(7, 1);
    var geom2 = new THREE.IcosahedronGeometry(15, 1);

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // color: 0xda524f,
        // shading: THREE.FlatShading
    });
    mat.flatShading = true; // 设置平坦着色
    var mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        side: THREE.DoubleSide
    });

    var planet = new THREE.Mesh(geom, mat);
    planet.scale.x = planet.scale.y = planet.scale.z = 26;
    inside = new THREE.Object3D();
    inside.add(planet);
    scene.add(inside);

    var planet2 = new THREE.Mesh(geom2, mat2);
    planet2.scale.x = planet2.scale.y = planet2.scale.z = 20;
    outside = new THREE.Object3D();
    outside.add(planet2);
    scene.add(outside);

    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    var lights1 = new THREE.DirectionalLight(0xffffff, 5);
    lights1.position.set(1, 0, 0);
    var lights2 = new THREE.DirectionalLight(0x11E8BB, 5);
    lights2.position.set(0.75, 1, 0.5);
    var lights3 = new THREE.DirectionalLight(0x8200C9, 5);
    lights3.position.set(-0.75, -1, 0.5);
    scene.add(lights1);
    scene.add(lights2);
    scene.add(lights3);




    particle = new THREE.Object3D();
    scene.add(particle);
    var geometry = new THREE.TetrahedronGeometry(2, 0);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // shading: THREE.FlatShading
    });
    material.flatShading = true; // 设置平坦着色
    for (var i = 0; i < 1000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2); //旋转

        particle.add(mesh);
    }

}

function animate() {
    requestAnimationFrame(animate);

    particle.rotation.x += 0.0010;
    particle.rotation.y -= 0.0040;
    inside.rotation.x -= 0.0020;
    inside.rotation.y -= 0.0030;
    outside.rotation.x -= 0.0010;
    outside.rotation.y += 0.0020;
    renderer.clear();

    renderer.render(scene, camera)
};

const [initialized, setInitialized] = useState(false);

const threeDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && !initialized) {
        onload(node)
         animate()
        setInitialized(true);
      }
    },
    [initialized]
  );


 
  
  // return <div ref={threeDivRef}   style={{background: 'linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)'}} />;  
  return <div ref={threeDivRef}  />;  
}  
  
export default Index;