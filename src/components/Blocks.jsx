import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { blocksSelector, modelsSelector, structureSelector, updateStructure } from '../store/buildingSlice'

export default function Blocks () {
  const blocks = useSelector(blocksSelector)
  const structure = useSelector(structureSelector)
  const models = useSelector(modelsSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    let _elevation = 0

    /* eslint-disable camelcase */
    const structure = blocks.map(({ building_game_id, elevation, scale, rotation }) => {
      const model = models[building_game_id]
      if (!model) {
        return null
      }

      const block = {
        building_game_id,
        elevation: elevation ?? _elevation,
        scale: scale || model.scale,
        rotation: rotation || model.rotation,
        model: model.model.clone()
      }
      _elevation += model.height + 0.0001
      return block
    })
    /* eslint-enable camelcase */

    dispatch(updateStructure(structure))
  }, [blocks, models, dispatch])

  /* eslint-disable camelcase */
  return structure.map((block, index) => {
    return block && (
      <primitive
        position={[0, block.elevation, 0]}
        rotation={[0, block.rotation, 0]}
        key={index}
        object={block.model}
      />
    )
  })
  /* eslint-enable camelcase */
}
