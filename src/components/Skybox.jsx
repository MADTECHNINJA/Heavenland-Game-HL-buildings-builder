import { useState, useEffect } from 'react'
import { TextureLoader } from 'three'

const SCALE = 1200
const DISTANCE = 596

const textures = [
  '/assets/textures/front.jpg',
  '/assets/textures/back.jpg',
  '/assets/textures/up.jpg',
  '/assets/textures/right.jpg',
  '/assets/textures/left.jpg'
]

export default function Skybox () {
  const [faces, setFaces] = useState(null)

  useEffect(() => {
    const loader = new TextureLoader()
    const [front, back, up, right, left] = textures.map(texture => loader.load(texture))
    setFaces({ front, back, up, right, left })
  }, [])

  return faces && (
    <>
      <mesh
        position={[0, 0, -DISTANCE]}
        scale={SCALE}
      >
        <planeGeometry />
        <meshBasicMaterial map={faces.front} />
      </mesh>
      <mesh
        position={[0, 0, DISTANCE]}
        rotation={[0, Math.PI, 0]}
        scale={SCALE}
      >
        <planeGeometry />
        <meshBasicMaterial map={faces.back} />
      </mesh>
      <mesh
        position={[DISTANCE, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={SCALE}
      >
        <planeGeometry />
        <meshBasicMaterial map={faces.right} />
      </mesh>
      <mesh
        position={[-DISTANCE, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={SCALE}
      >
        <planeGeometry />
        <meshBasicMaterial map={faces.left} />
      </mesh>
      <mesh
        position={[0, DISTANCE, 0]}
        rotation={[Math.PI / 2, 0, Math.PI * 1.5]}
        scale={SCALE}
      >
        <planeGeometry />
        <meshBasicMaterial map={faces.up} />
      </mesh>
    </>
  )
}
