// import { Text3D } from '@react-three/drei'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as Three from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader, } from 'three/addons/loaders/FontLoader.js'
import myFont from '@/fonts/NotoSansJP_Regular.json'

const loader = new FontLoader()


function Box(props: ThreeElements['mesh']) {
  const ref = useRef<Three.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((_state, delta) => (ref.current.rotation.x += delta * 5))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <meshBasicMaterial
        color={'0x00ffaa'}
      />
      <boxGeometry
        args={[
          1, 1, 1
        ]}
      />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

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
