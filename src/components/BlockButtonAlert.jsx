import PropTypes from 'prop-types'

import isDisabled from '../util/block-button-disabled'

import parts from '../data/building-parts.json'
import { useSelector } from 'react-redux'
import { blocksSelector, HEIGHT_LIMIT } from '../store/buildingSlice'
import { Alert } from 'react-bootstrap'

const tabs = Object.keys(parts)

const getAlert = (type, blocks) => {
  if (isDisabled(type, blocks)) {
    if (blocks.length === HEIGHT_LIMIT) {
      return `Building height limit is ${HEIGHT_LIMIT} blocks`
    }

    switch (type) {
      case 'bases':
        return 'Base blocks can only be placed as the first block'
      case 'floors':
      case 'roofs':
        return 'These blocks can only be placed after a base block, but not after a roof block'
      default:
        return 'Unable to place these blocks'
    }
  }
}

export default function BlockButtonAlert ({ type }) {
  const blocks = useSelector(blocksSelector)

  const message = getAlert(type, blocks)

  return (
    message && (
      <Alert variant='warning' className='mx-1'>{message}</Alert>
    )
  )
}

BlockButtonAlert.propTypes = {
  type: PropTypes.oneOf(tabs).isRequired
}
