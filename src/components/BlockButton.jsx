import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoxHelper } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { addModel, addBlock, blocksSelector } from '../store/buildingSlice'
import isDisabled from '../util/block-button-disabled'

import parts from '../data/building-parts.json'

import style from '../scss/modules/BlockButton.module.scss'

const tabs = Object.keys(parts)

const normalizeModel = model => {
  const helper = new BoxHelper(model)
  helper.geometry.computeBoundingBox()
  const { max } = helper.geometry.boundingBox
  const scale = 1 / 2100
  model.scale.multiplyScalar(scale)
  model.children.forEach(child => {
    child.castShadow = true
    child.receiveShadow = true
  })

  return { model, scale, rotation: 0, height: max.y * scale }
}

export default function BlockButton ({ block }) {
  const dispatch = useDispatch()
  const blocks = useSelector(blocksSelector)

  const [isLoading, setIsLoading] = useState(true)

  const loadModel = useCallback(() => {
    const loader = new FBXLoader()
    loader.load(block.path, model => {
      dispatch(addModel({
        building_game_id: block.building_game_id,
        model: normalizeModel(model)
      }))
      setIsLoading(false)
    })
  }, [block, dispatch])

  useEffect(() => {
    loadModel()
  }, [loadModel])

  const add = () => {
    dispatch(addBlock(block))
  }

  return (
    <button
      disabled={isLoading || isDisabled(block.group, blocks)}
      onClick={add}
      className={`${style.blockBtn} position-relative`}
    >
      <img src={block.thumbnail} alt={block.label} />
      {block.label}
      {isLoading && <i className='spinner-border spinner-border-sm position-absolute top-0 end-0 m-1' />}
    </button>
  )
}

BlockButton.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    group: PropTypes.oneOf(tabs),
    thumbnail: PropTypes.string
  }).isRequired
}
