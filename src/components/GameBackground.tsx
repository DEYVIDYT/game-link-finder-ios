
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating cubes component
const CubeField = () => {
  const group = useRef<THREE.Group>(null);
  
  // Create an array of cube positions
  const cubes = Array.from({ length: 20 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20, 
      (Math.random() - 0.5) * 20, 
      (Math.random() - 0.5) * 10 - 5
    ],
    rotation: [Math.random(), Math.random(), Math.random()],
    scale: Math.random() * 0.5 + 0.3,
    speed: Math.random() * 0.01 + 0.003
  }));

  // Animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.001;
      
      // Update each cube's position and rotation
      group.current.children.forEach((cube, i) => {
        const speed = cubes[i].speed;
        cube.rotation.x += speed;
        cube.rotation.y += speed * 0.7;
        cube.position.y = Math.sin(state.clock.elapsedTime * speed * 2 + i) * 2;
      });
    }
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position as [number, number, number]} rotation={cube.rotation as [number, number, number]} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(i * 0.05 % 1, 0.7, 0.5)}
            transparent={true}
            opacity={0.6}
            emissive={new THREE.Color().setHSL(i * 0.05 % 1, 0.7, 0.5)}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const GameBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 10, 5]} intensity={1} color="#8B5CF6" />
        <directionalLight position={[0, -10, 0]} intensity={0.5} color="#0EA5E9" />
        <CubeField />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default GameBackground;
