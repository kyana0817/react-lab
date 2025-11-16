import { linearToSrgb, srgbToLinear } from '@typegpu/color'
import { useEffect, useRef, useState } from 'react'
import tgpu from 'typegpu'
import * as d from 'typegpu/data'
import {
  add,
  discard,
  div,
  max,
  min,
  mul,
  normalize,
  pow,
  sub,
} from 'typegpu/std'
import { mat4 } from 'wgpu-matrix'

// Constants
const X = 7
const Y = 7
const Z = 7

export const TypeGPU = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const uniformsRef = useRef<any>(null)
  const controlsRef = useRef({
    rotationSpeed: 1.2,
    cameraDistance: 16,
    boxSize: 1,
    materialDensity: 2,
  })
  const [controls, setControls] = useState({
    rotationSpeed: 1.2,
    cameraDistance: 16,
    boxSize: 1,
    materialDensity: 2,
  })

  // Update controlsRef when controls change
  useEffect(() => {
    controlsRef.current = controls
  }, [controls])

  // Slider styles
  const sliderStyle = {
    width: '100%',
    display: 'block',
    marginTop: '8px',
    accentColor: '#ec4899', // Pink color matching the page theme
  }

  const labelStyle = {
    color: 'white',
    fontSize: '14px',
    marginBottom: '12px',
  }

  const valueStyle = {
    color: '#ec4899', // Pink color for values
    fontWeight: 'bold',
  }

  // Update uniforms when controls change
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.writePartial({
        boxSize: controls.boxSize,
        materialDensity: controls.materialDensity,
      })
    }
  }, [controls.boxSize, controls.materialDensity])

  useEffect(() => {
    if (!canvasRef.current) return

    let disposed = false
    let animationFrameId: number | null = null

    const initWebGPU = async () => {
      const canvas = canvasRef.current!
      const context = canvas.getContext('webgpu') as GPUCanvasContext
      
      if (!context) {
        console.error('WebGPU not supported')
        return
      }

      const presentationFormat = navigator.gpu.getPreferredCanvasFormat()
      const root = await tgpu.init()

      context.configure({
        device: root.device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      })

      // Calculated values
      const cubeSize = d.vec3f(X, Y, Z)
      const cameraAnchor = mul(0.5, sub(cubeSize, d.vec3f(1)))
      let frame = 0

      // structs
      const Uniforms = d.struct({
        canvasDims: d.vec2f,
        invViewMatrix: d.mat4x4f,
        materialDensity: d.f32,
        boxSize: d.f32,
      })

      const BoxStruct = d.struct({
        isActive: d.u32,
        albedo: d.vec3f,
      })

      const AxisAlignedBounds = d.struct({
        min: d.vec3f,
        max: d.vec3f,
      })

      const Ray = d.struct({
        origin: d.vec3f,
        direction: d.vec3f,
      })

      const IntersectionStruct = d.struct({
        intersects: d.bool,
        tMin: d.f32,
        tMax: d.f32,
      })

      // buffers
      const boxMatrix = root.createReadonly(
        d.arrayOf(d.arrayOf(d.arrayOf(BoxStruct, Z), Y), X),
        Array.from(
          { length: X },
          (_, i) =>
            Array.from(
              { length: Y },
              (_, j) =>
                Array.from({ length: Z }, (_, k) => ({
                  isActive: X - i + j + (Z - k) > 6 ? 1 : 0,
                  albedo: srgbToLinear(
                    d.vec3f(i / X, j / Y, k / Z * 0.8 + 0.1 + (X - i) / X * 0.6),
                  ),
                })),
            ),
        ),
      )

      const uniforms = root.createUniform(Uniforms)
      uniformsRef.current = uniforms

      // Initialize uniforms
      uniforms.writePartial({
        boxSize: controls.boxSize,
        materialDensity: controls.materialDensity,
      })

      // functions
      const getBoxIntersection = tgpu.fn(
        [AxisAlignedBounds, Ray],
        IntersectionStruct,
      ) /* wgsl */`(bounds, ray) {
  var tMin: f32;
  var tMax: f32;
  var tMinY: f32;
  var tMaxY: f32;
  var tMinZ: f32;
  var tMaxZ: f32;

  if (ray.direction.x >= 0) {
    tMin = (bounds.min.x - ray.origin.x) / ray.direction.x;
    tMax = (bounds.max.x - ray.origin.x) / ray.direction.x;
  } else {
    tMin = (bounds.max.x - ray.origin.x) / ray.direction.x;
    tMax = (bounds.min.x - ray.origin.x) / ray.direction.x;
  }

  if (ray.direction.y >= 0) {
    tMinY = (bounds.min.y - ray.origin.y) / ray.direction.y;
    tMaxY = (bounds.max.y - ray.origin.y) / ray.direction.y;
  } else {
    tMinY = (bounds.max.y - ray.origin.y) / ray.direction.y;
    tMaxY = (bounds.min.y - ray.origin.y) / ray.direction.y;
  }

  if (tMin > tMaxY) || (tMinY > tMax) {
    return IntersectionStruct();
  }

  if (tMinY > tMin) {
    tMin = tMinY;
  }

  if (tMaxY < tMax) {
    tMax = tMaxY;
  }

  if (ray.direction.z >= 0) {
    tMinZ = (bounds.min.z - ray.origin.z) / ray.direction.z;
    tMaxZ = (bounds.max.z - ray.origin.z) / ray.direction.z;
  } else {
    tMinZ = (bounds.max.z - ray.origin.z) / ray.direction.z;
    tMaxZ = (bounds.min.z - ray.origin.z) / ray.direction.z;
  }

  if (tMin > tMaxZ) || (tMinZ > tMax) {
    return IntersectionStruct();
  }

  if tMinZ > tMin {
    tMin = tMinZ;
  }

  if tMaxZ < tMax {
    tMax = tMaxZ;
  }

  return IntersectionStruct(tMin > 0 && tMax > 0, tMin, tMax);
}`
        .$uses({ IntersectionStruct })

      const Varying = {
        rayWorldOrigin: d.vec3f,
      }

      const mainVertex = tgpu['~unstable'].vertexFn({
        in: { vertexIndex: d.builtin.vertexIndex },
        out: { pos: d.builtin.position, ...Varying },
      })((input) => {
        const pos = [
          d.vec2f(-1, -1),
          d.vec2f(3, -1),
          d.vec2f(-1, 3),
        ]

        const rayWorldOrigin = mul(uniforms.$.invViewMatrix, d.vec4f(0, 0, 0, 1)).xyz

        return { pos: d.vec4f(pos[input.vertexIndex], 0.0, 1.0), rayWorldOrigin }
      })

      const fragmentFunction = tgpu['~unstable'].fragmentFn({
        in: { position: d.builtin.position, ...Varying },
        out: d.vec4f,
      })((input) => {
        const boxSize3 = d.vec3f(d.f32(uniforms.$.boxSize))
        const halfBoxSize3 = mul(0.5, boxSize3)
        const halfCanvasDims = mul(0.5, uniforms.$.canvasDims)

        const minDim = min(uniforms.$.canvasDims.x, uniforms.$.canvasDims.y)
        const viewCoords = div(sub(input.position.xy, halfCanvasDims), minDim)

        const ray = Ray({
          origin: input.rayWorldOrigin,
          direction: mul(
            uniforms.$.invViewMatrix,
            d.vec4f(normalize(d.vec3f(viewCoords, 1)), 0),
          ).xyz,
        })

        const bigBoxIntersection = getBoxIntersection(
          AxisAlignedBounds({
            min: mul(-1, halfBoxSize3),
            max: add(cubeSize, halfBoxSize3),
          }),
          ray,
        )

        if (!bigBoxIntersection.intersects) {
          discard()
          return d.vec4f(0, 0, 0, 0)
        }

        let density = d.f32(0)
        let invColor = d.vec3f(0, 0, 0)
        let intersectionFound = false

        for (let i = 0; i < X; i++) {
          for (let j = 0; j < Y; j++) {
            for (let k = 0; k < Z; k++) {
              if (boxMatrix.$[i][j][k].isActive === 0) {
                continue
              }

              const ijkScaled = d.vec3f(d.f32(i), d.f32(j), d.f32(k))

              const intersection = getBoxIntersection(
                AxisAlignedBounds({
                  min: sub(ijkScaled, halfBoxSize3),
                  max: add(ijkScaled, halfBoxSize3),
                }),
                ray,
              )

              if (intersection.intersects) {
                const boxDensity = max(0, intersection.tMax - intersection.tMin) *
                  pow(uniforms.$.materialDensity, 2)
                density += boxDensity
                invColor = add(
                  invColor,
                  mul(
                    boxDensity,
                    div(d.vec3f(1), boxMatrix.$[i][j][k].albedo),
                  ),
                )
                intersectionFound = true
              }
            }
          }
        }

        const linear = div(d.vec3f(1), invColor)
        const srgb = linearToSrgb(linear)
        const gamma = 2.2
        const corrected = pow(srgb, d.vec3f(1.0 / gamma))

        if (intersectionFound) {
          return mul(
            min(density, 1),
            d.vec4f(min(corrected, d.vec3f(1)), 1),
          )
        }

        discard()
        return d.vec4f()
      })

      // pipeline

      const pipeline = root['~unstable']
        .withVertex(mainVertex, {})
        .withFragment(fragmentFunction, {
          format: presentationFormat,
          blend: {
            color: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
            alpha: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
          },
        })
        .withPrimitive({
          topology: 'triangle-strip',
        })
        .createPipeline()

      // Animation loop
      let lastTime = Date.now()
      const onFrame = () => {
        if (disposed) return

        const now = Date.now()
        const deltaTime = now - lastTime
        lastTime = now

        const width = canvas.width
        const height = canvas.height

        const cameraPosition = d.vec3f(
          Math.cos(frame) * controlsRef.current.cameraDistance + cameraAnchor.x,
          cameraAnchor.y - 5,
          Math.sin(frame) * controlsRef.current.cameraDistance + cameraAnchor.z,
        )

        uniforms.writePartial({
          canvasDims: d.vec2f(width, height),
          invViewMatrix: mat4.aim(
            cameraPosition,
            cameraAnchor,
            d.vec3f(0, 1, 0),
            d.mat4x4f(),
          ),
        })

        frame += (controlsRef.current.rotationSpeed * deltaTime) / 1000

        const textureView = context.getCurrentTexture()
          .createView()
        pipeline
          .withColorAttachment({
            view: textureView,
            clearValue: [
              0, 0, 0, 0,
            ],
            loadOp: 'clear',
            storeOp: 'store',
          })
          .draw(3)

        animationFrameId = requestAnimationFrame(onFrame)
      }

      animationFrameId = requestAnimationFrame(onFrame)
    }

    initWebGPU()

    return () => {
      disposed = true
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, []) // Empty dependency array - run only once

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgb(51, 65, 85)', // slate-700 matching sidebar
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          minWidth: '250px',
          color: 'white',
        }}
      >
        <div style={labelStyle}>
          <label>
            <span>Rotation Speed:</span>
            {' '}
            <span style={valueStyle}>{controls.rotationSpeed.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={controls.rotationSpeed}
              onChange={(e) => setControls({ ...controls, rotationSpeed: parseFloat(e.target.value) })}
              style={sliderStyle}
            />
          </label>
        </div>
        <div style={labelStyle}>
          <label>
            <span>Camera Distance:</span>
            {' '}
            <span style={valueStyle}>{controls.cameraDistance.toFixed(0)}</span>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={controls.cameraDistance}
              onChange={(e) => setControls({ ...controls, cameraDistance: parseFloat(e.target.value) })}
              style={sliderStyle}
            />
          </label>
        </div>
        <div style={labelStyle}>
          <label>
            <span>Box Size:</span>
            {' '}
            <span style={valueStyle}>{controls.boxSize.toFixed(2)}</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={controls.boxSize}
              onChange={(e) => setControls({ ...controls, boxSize: parseFloat(e.target.value) })}
              style={sliderStyle}
            />
          </label>
        </div>
        <div style={labelStyle}>
          <label>
            <span>Material Density:</span>
            {' '}
            <span style={valueStyle}>{controls.materialDensity.toFixed(2)}</span>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={controls.materialDensity}
              onChange={(e) => setControls({ ...controls, materialDensity: parseFloat(e.target.value) })}
              style={sliderStyle}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
