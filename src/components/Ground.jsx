import { useEffect, useState } from 'react'
import { RepeatWrapping, TextureLoader, DoubleSide } from 'three'

export default function Ground () {
  const [colorMap, setColorMap] = useState(null)

  useEffect(() => {
    const loader = new TextureLoader()
    const colorMap = loader.load('/assets/textures/grass.jpg')
    colorMap.repeat.set(1000, 1000)
    colorMap.wrapS = RepeatWrapping
    colorMap.wrapT = RepeatWrapping
    setColorMap(colorMap)
  }, [])

  return colorMap && (
    <>
      <mesh
        receiveShadow
        rotation={[-(Math.PI / 2), 0, 0]}
        position={[0, -0.001, 0]}
        scale={1000}
      >
        <planeGeometry />
        <meshStandardMaterial
          map={colorMap}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.4}
      >
        <planeGeometry />
        <meshStandardMaterial color='#bbb' />
      </mesh>
      <mesh
        receiveShadow
        position={[0, 0.001, 0]}
        scale={1.1}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  )
}
