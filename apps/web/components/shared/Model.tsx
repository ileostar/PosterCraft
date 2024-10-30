import { addLights, animateDefault, createMesh, createParticles } from "@/utils/model";
import React, { useCallback, useEffect, useState } from "react";
import * as THREE from "three";

function Model(props: { boxWidth: number; boxHeight: number }) {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [inside, setInside] = useState<THREE.Object3D | null>(null);
  const [outside, setOutside] = useState<THREE.Object3D | null>(null);
  const [particle, setParticle] = useState<THREE.Object3D | null>(null);
  const [initialized, setInitialized] = useState(false);

  const animate = useCallback(() => {
    if (initialized && renderer && scene && camera && particle && inside && outside) {
      requestAnimationFrame(animate);

      animateDefault(particle, inside, outside);

      renderer.clear();
      renderer.render(scene, camera);
    }
  }, [initialized, renderer, scene, camera, particle, inside, outside]);

  useEffect(() => {
    if (initialized && renderer && scene && camera) {
      animate();
    }
  }, [initialized, renderer, scene, camera, animate]);

  const onload = useCallback(
    (node: HTMLDivElement) => {
      try {
        const newRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        newRenderer.setSize(props.boxWidth, props.boxHeight);
        node.appendChild(newRenderer.domElement);
        setRenderer(newRenderer);

        const newScene = new THREE.Scene();
        setScene(newScene);

        const newCamera = new THREE.PerspectiveCamera(
          100,
          props.boxWidth / props.boxHeight,
          1,
          1000,
        );
        newCamera.position.z = 500;
        newScene.add(newCamera);
        setCamera(newCamera);

        const geom = new THREE.IcosahedronGeometry(7, 1);
        const geom2 = new THREE.IcosahedronGeometry(15, 1);
        const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
        const mat2 = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          wireframe: true,
          side: THREE.DoubleSide,
        });

        const newInside = new THREE.Object3D();
        newInside.add(createMesh(geom, mat, 26));
        newScene.add(newInside);
        setInside(newInside);

        const newOutside = new THREE.Object3D();
        newOutside.add(createMesh(geom2, mat2, 20));
        newScene.add(newOutside);
        setOutside(newOutside);

        addLights(newScene);

        const newParticle = new THREE.Object3D();
        newScene.add(newParticle);
        setParticle(newParticle);

        createParticles(newParticle);

        setInitialized(true);
      } catch (error) {
        console.error("Error initializing three.js:", error);
      }
    },
    [props.boxWidth, props.boxHeight],
  );

  const threeDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && !initialized) {
        onload(node);
      }
    },
    [initialized, onload],
  );

  return (
    <div
      className="w-full h-full overflow-visible"
      ref={threeDivRef}
    />
  );
}

export default Model;
