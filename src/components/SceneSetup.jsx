import { extend, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { distanceSelector, MAX_DISTANCE, MIN_DISTANCE, updateDistance } from '../store/sceneSlice'
import Ground from './Ground'
import Skybox from './Skybox'

extend({ OrbitControls })

export default function SceneSetup () {
  const dispatch = useDispatch()
  const distance = useSelector(distanceSelector)

  const { camera, scene, gl } = useThree()

  const light = useRef()
  const controls = useRef()

  useEffect(() => {
    const current = light.current
    camera.position.set(-1, 1, 2)
    controls.current.update()
    current.target.position.set(30, -10, -10)
    scene.add(current.target)

    return () => scene.remove(current.target)
  }, [camera, scene])

  useEffect(() => {
    scene.background = new Color('#218dc6')
  }, [scene])

  useEffect(() => {
    const { current } = controls
    const onChange = () => dispatch(updateDistance(current.getDistance()))

    current.addEventListener('change', onChange)

    return () => current.removeEventListener('change', onChange)
  }, [dispatch])

  useEffect(() => {
    const delta = distance - controls.current.getDistance()
    camera.translateZ(delta)
  }, [camera, distance])

  return (
    <>
      <Ground />
      <Skybox />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, 5, 0]}
        castShadow
        ref={light}
      />
      <orbitControls
        enablePan={false}
        maxPolarAngle={1.55}
        maxDistance={MAX_DISTANCE}
        minDistance={MIN_DISTANCE}
        target={[0, 1, 0]}
        args={[camera, gl.domElement]}
        ref={controls}
      />
    </>
  )
}
