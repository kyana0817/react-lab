import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import myFont from '@/fonts/helvetiker_regular.typeface.json'

const loader = new FontLoader()

const HelloWorld = () => {
  const ref = useRef<Mesh>(null!)
  const font = useMemo(() => loader.parse(myFont), [])

  useFrame(() => {
    if (ref.current.position.z > 5) {
      ref.current.position.z = -200
    }
    ref.current.position.z += 2
  })

  return (
    <mesh
      ref={ref}
      name='text'
      position={[
        -21, -2, -200
      ]}
    >
      <textGeometry
        args={[
          'Hello World!', {
            font,
            size: 5,
            height: 1,
          }
        ]}
      />
      <meshPhysicalMaterial
        attach='material'
        color="white"
      />
    </mesh>
  )
}

export const HelloWorldScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <HelloWorld/>
    </Canvas>
  )
}

export default HelloWorldScene
