import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";

/* 🌍 Earth Sphere */
const EarthSphere = () => {
    const meshOfEarth = useRef();
    const { viewport } = useThree();

    const earthTexture = useTexture("data:image/jpeg;base64,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");


    return (
        <mesh ref={meshOfEarth} scale={Math.min(viewport.width / 15, 1)}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={earthTexture} />
        </mesh>
    );
};

/* ⭐ Optimized Star Field using Points */
const StarField = ({ count = 2000 }) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const spread = 300;
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 300;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 300;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 300;
        }
        return arr;
    }, [count]);


    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="white"
                sizeAttenuation
                transparent
                depthWrite={false}
            />
        </points>
    );
};

/* 🚀 Combined Scene */
export default function StarFields() {
    const { ref, inView } = useInView({
        threshold: 0.9,
    })
    return (
        <div ref={ref} className="w-full h-screen bg-black">
            {inView && <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>

                <StarField count={2000} />

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
            </Canvas>}
        </div>
    );
}
