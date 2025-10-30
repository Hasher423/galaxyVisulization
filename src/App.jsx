import React, { useState, useEffect } from 'react'
import StarFields from './Components/StarFields'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import GalaxyNode from './Components/GalaxyNode';
import SolarSystem from './Components/SolarSystem';

const CameraUpdater = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);

  return null;
};

const App = () => {
  const [SelectedGalaxy, setSelectedGalaxy] = useState(null)

  const [galaxiesVisible, setGalaxiesVisible] = useState(true);

  const handleGalaxyClick = (index) => {
    setGalaxiesVisible(false);
    setTimeout(() => setSelectedGalaxy(index), 700);
  };



  const solarData = [{
    sun: "Personal Growth & Inner Conflicts",
    planets: [
      "Self-Awareness & Mindfulness",
      "Ego, Identity, and Detachment",
      "Guilt, Shame & Forgiveness",
      "Fear, Doubt & Faith",
      "Purpose and Meaning",
      "Healing from Trauma",
    ],
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'],
  },
  {
    sun: "Understanding spirituality through how we relate to others.",
    planets: [
      "Love & Compassion",
      "Boundaries & Energy Exchange",
      "Family & Generational Patterns",
      "Friendship, Community & Loneliness",
      "Romantic Relationships & Soul Connections"
    ],
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'],
  },
  {
    sun: "How spirituality helps us navigate major changes.",
    planets: [
      "Birth, Death & Grief",
      "Loss, Failure & Renewal",
      "Career, Success & Spiritual Purpose",
      "Health Crises & Recovery",
      "Midlife Awakening / Dark Night of the Soul"
    ],
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'],
  }

  ]
  return (
    <div className="w-screen h-screen">
      <Canvas className="w-full h-full bg-black" camera={{ position: [0, 20, 35], fov: 50 }}>
        <CameraUpdater />
        <StarFields />
        {galaxiesVisible && (<>
          <GalaxyNode
            onClick={() => {
              handleGalaxyClick(0)
            }}
            label=' Personal Growth & Inner Conflicts'
            visible={galaxiesVisible}
            count={5000} radius={10} arms={16} position={[-20, 0, 0]} />
          <GalaxyNode
            label='Relationships & Connection'
            onClick={() => handleGalaxyClick(1)}
            visible={galaxiesVisible}
            count={5000} radius={10} arms={16} position={[0, 0, 0]} />
          <GalaxyNode
            label=' Life Events & Transitions'
            onClick={() => handleGalaxyClick(2)}
            visible={galaxiesVisible}
            count={5000} radius={10} arms={16} position={[20, 0, 0]} />
        </>)}

        {SelectedGalaxy !== null && (
          <SolarSystem
            data={solarData[SelectedGalaxy]}
          />
        )}



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