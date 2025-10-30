import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { a, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei'

export default function GalaxyNode({ count = 5000, size = 0.03, radius = 7, arms = 6, position, onClick, visible = true,
  label = "text" }) {
  const points = useRef()
  const { scale, opacity } = useSpring({
    scale: visible ? 1 : 0,
    opacity: visible ? 1 : 0,
    from: { scale: 0.5, opacity: 0 },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const galaxy = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('white')
    const colorOutside = new THREE.Color('black')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * radius
      const branch = i % arms
      const angle = (r * 2.5) + (branch / arms) * Math.PI * 2

      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = (Math.random() - 0.01) * 0.3
      positions[i3 + 2] = Math.sin(angle) * r

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, r / radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [count, radius, arms])

  useFrame(() => {
    points.current.rotation.y += 0.008
  })

  return (
    <>
      <a.points
        scale={scale}
        onPointerDown={onClick}
        ref={points} position={position}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxy.positions.length / 3}
            array={galaxy.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={galaxy.colors.length / 3}
            array={galaxy.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          vertexColors
          depthWrite={false}
          transparent
        />
      </a.points>


      {
        label && (
          <Text
          maxWidth={12}
            position={[position[0], position[1] + radius/2 + 2, position[2]]} // above galaxy
            fontSize={1.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="black"
          >
            {label}
          </Text>
        )
      }
    </>
  )
}
