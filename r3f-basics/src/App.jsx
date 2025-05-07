
import './App.css'
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshWobbleMaterial, useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

// video tutorial: https://www.youtube.com/watch?v=vTfMjI4rVSI&ab_channel=rithmic

const Cube = ({position, size, color}) => {

    const ref = useRef();

    useFrame((state, delta) => {
      ref.current.rotation.x += delta
      ref.current.rotation.y += delta * 2.0

      ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    })

    return (
      <mesh position={position} ref={ref}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Sphere = ({position, size, color}) => {

  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);

    useFrame((state, delta) => {
      const speed = isHovered ? 2 : 0.2;
     // ref.current.rotation.x += delta;
      ref.current.rotation.x += delta * speed;

      // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    })

  return (
    <mesh position={position} ref={ref} onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))} onPointerLeave={(event) => (event.stopPropagation(), setIsHovered(false))}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? 'orange' : 'lightblue'} wireframe />
    </mesh>
  )
}

const Torus = ({position, size, color}) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({position, size, color}) => {
  return (
    <mesh position={position}>
      <torusKnotGeometry args={size} />
      <MeshWobbleMaterial color={color} speed={10}/>
      <OrbitControls />
    </mesh>
  )
}

const Scene = () => {


  const directionalLightRef = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper)

  return (
    <>
    <directionalLight position={[0, 0, 2]} intensity={0.5} ref={directionalLightRef}/>
    <ambientLight intensity={0.1}/>

    {/* <group position={[0, -1, 0]}> 
      <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]}/>
      <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]}/>
      <Cube position={[-1, 2, 0]} color={"blue"} size={[1, 1, 1]}/>
      <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1, 1]}/>
    </group> */}
    {/* <Cube position={[0, 0, 0]} color={"orange"} size={[1, 1, 1]}/> */}
    {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"green"} /> */}
    {/* <Torus position={[2, 0, 0]} size={[0.5, 0.1, 30, 30]} color={"orange"}/> */}
    <TorusKnot position={[2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"pink"}/>
    </>
  )
}

const App = () => {

  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}

export default App
