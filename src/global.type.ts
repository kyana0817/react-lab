import { extend, Object3DNode } from '@react-three/fiber'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

extend({ TextGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
  }
}

export {}
