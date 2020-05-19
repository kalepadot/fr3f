import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame, extend, useThree, } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { softShadows } from "drei"
import "./App.css";

extend({ OrbitControls });

softShadows({ size: 0.005, frustrum: 2.75 })

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
     </mesh>
  );
}

function F3f() {
  const group = useRef();
  //testing below doesnt seem to change much, rotates faster?
// useFrame(state => {
//     group.current.position.y = ((1 + Math.sin(state.clock.getElapsedTime())) / 2) * 2
//     group.current.rotation.y += 0.01
//   })
  //testing above
  const { nodes } = useLoader(GLTFLoader, "models/f3f1.glb");
  console.log(nodes);
  // useFrame(() => {
  //   group.current.rotation.y += 0.004;
    
  // });     //removing rotation for now
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
          
        />
        
      </mesh>
    </group>
  );
}
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};
const controls = useRef();
useFrame((state) => controls.current.update());

export default function App() {
  return (
    
      <Canvas style={{ background: "white" }}>
      <CameraControls />
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <F3f />
        </Suspense>
      </Canvas>
      );
      }
