
import { extend, ThreeElement  } from '@react-three/fiber'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

extend({ TextGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: ThreeElement<typeof TextGeometry>
  }
}

export {}
