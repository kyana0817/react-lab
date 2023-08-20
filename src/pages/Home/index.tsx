import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as Three from 'three'
import { FontLoader, } from 'three/addons/loaders/FontLoader.js'
import myFont from '@/fonts/NotoSansJP_Regular.json'

const loader = new FontLoader()

const HelloWorld = () => {
  const ref = useRef<Three.Mesh>(null!)

  const font =loader.parse(myFont)

  useFrame(() => {
    if (ref.current.position.z > 5) {
      ref.current.position.z = -200
    }
    ref.current.position.z += 2
  })

  return (
    <>
      <mesh
        ref={ref}
        name='text'
        position={[
          -21, -2, -200
        ]}
      >
        <textGeometry
          args={[
            'Hello World!', { font, 
              size: 5,
              height: 1,
            }
          ]}
        >
        </textGeometry>
        <meshPhysicalMaterial
          attach='material'
          color="white"
        />
      </mesh>
    </>     
  )

}

export const Home = () => {
  return (
    <>
      <Canvas>
        <ambientLight />
        {/* <pointLight
          position={[
            30, 10, 10
          ]}
        /> */}
        <HelloWorld/>
        {/* <Box
          position={[
            -1.2, 0, 0
          ]}
        />
        <Box
          position={[
            1.2, 0, 0
          ]}
        /> */}
      </Canvas>
    </>
  )
}
