import React from 'react'
import StarFields from './Components/StarFields'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import GalaxyNode from './Components/GalaxyNode';

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas className="w-full h-full bg-black" camera={{ position: [0, 20, 25], fov: 50 }}>
        {/* <StarFields /> */}=
        <GalaxyNode count={5000} radius={10} arms={16} position={[-20, 0, 0]} />
        <GalaxyNode count={5000} radius={10} arms={16} position={[0, 0, 0]} />
        <GalaxyNode count={5000} radius={10} arms={16} position={[20, 0, 0]} />




        {/* Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            kernelSize={10}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        {/* Controls */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>

  )
}

export default App