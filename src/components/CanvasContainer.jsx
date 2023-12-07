import { Canvas } from '@react-three/fiber'
import { Provider, useStore } from 'react-redux'
import Blocks from './Blocks'
import SceneSetup from './SceneSetup'

export default function CanvasContainer () {
  const store = useStore()

  return (
    <Canvas shadows>
      <Provider store={store}>
        <SceneSetup />
        <Blocks />
      </Provider>
    </Canvas>
  )
}
