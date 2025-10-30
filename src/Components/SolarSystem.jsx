import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';

export default function SolarSystem({ data }) {
    const groupRef = useRef();
    const { scale, opacity } = useSpring({
        scale: 1,
        opacity: 1,
        from: { scale: 0.3, opacity: 0 }, 
        config: { mass: 1, tension: 170, friction: 26 },
    });


    useFrame(({ clock }) => {
        const t = -clock.getElapsedTime() * 0.5;
        if (groupRef.current) {
            groupRef.current.rotation.y = t;
        }
    });

    return (
        <a.group scale={scale} ref={groupRef} >

            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial
                    color="#ffcc00"
                    emissive="#ffaa00"
                    emissiveIntensity={4}
                />
            </mesh>

            <Text
                maxWidth={10}
                position={[0, 4, 0]}
                fontSize={.9}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="black"
            >
                {data.sun}
            </Text>

            {/* 4 PLANETS with TEXT */}
            {data.planets.map((text, i) => {
                const angle = (i / data.planets.length) * Math.PI * 2; // spread evenly around circle
                const dist = 12;

                return (
                    <group key={i} position={[Math.cos(angle) * dist, 0, Math.sin(angle) * dist]}>
                        {/* Planet */}
                        <mesh>
                            <sphereGeometry args={[1.8, 32, 32]} />
                            <meshStandardMaterial
                                color={data.colors[i % data.colors.length]} // cycle colors if fewer than planets
                                emissive={data.colors[i % data.colors.length]}
                                emissiveIntensity={1.7}
                            />
                        </mesh>

                        {/* Planet Label */}
                        <Text
                            position={[0, 3.5, 0]}
                            fontSize={0.9}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={8}
                            lineHeight={1}
                            textAlign="center"
                            outlineWidth={0.04}
                            outlineColor="black"
                        >
                            {text}
                        </Text>
                    </group>
                );
            })}

        </a.group>
    );
}