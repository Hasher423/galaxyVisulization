import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";



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

export default function StarFields() {
    const { ref, inView } = useInView({
        threshold: 0.9,
    })
    return (

        <>
            <StarField count={2000} />

        </>
    );
}
