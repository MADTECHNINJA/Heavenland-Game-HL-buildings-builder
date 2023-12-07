import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { REACT_APP_INVENTORY_UI_URI, REACT_APP_LOGIN_PORTAL } from '../config'
import { RELOAD } from '../hooks/reload'
import {
  blocksSelector,
  removeBlock,
  rotateBlock,
  rotationSelector
} from '../store/buildingSlice'
import { accessTokenSelector } from '../store/userSlice'
import { uploadBuilding } from '../util/api'
import { toDeg, toRad } from '../util/rad-to-deg'
import ClearAllButton from './ClearAllButton'

export default function Buttons () {
  const dispatch = useDispatch()
  const blocks = useSelector(blocksSelector)
  const accessToken = useSelector(accessTokenSelector)
  const rotation = useSelector(rotationSelector)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const upload = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await uploadBuilding()
      setSuccess(true)
      setTimeout(navigateToInventory, 3000)
    } catch {
      setError('Unable to upload')
    }
    setIsLoading(false)
  }

  const navigateToInventory = () => {
    // Check if window is closeable by script
    if (window.opener || window.history.length === 1) {
      window.close()
    }

    window.location.assign(REACT_APP_INVENTORY_UI_URI)
  }

  const redirectTo = `${window.location.href}&${RELOAD}=true`
  const url = `${REACT_APP_LOGIN_PORTAL}&${new URLSearchParams({ redirectTo })}`

  return (
    <>
      <div className='p-3'>
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>Uploaded successfully</Alert>}
        {
          !blocks.length || (
            <>
              <label className='text-white w-100 px-1'>
                Rotation: {Math.round(toDeg(rotation))}°
                <input
                  className='form-range'
                  type='range'
                  min={-180}
                  max={180}
                  step={1}
                  onChange={e => dispatch(rotateBlock(toRad(e.target.value)))}
                  value={toDeg(rotation)}
                />
              </label>
              <button
                className='btn btn-gradient-danger w-100 mb-3'
                onClick={() => dispatch(removeBlock())}
              >
                Remove block
              </button>
              <ClearAllButton />
            </>
          )
        }
        {
          accessToken
            ? (
              <button
                className='btn btn-gradient w-100 mt-4'
                onClick={upload}
              >
                {
                  isLoading
                    ? <i className='spinner-border spinner-border-sm' />
                    : 'Save building'
                }
              </button>
              )
            : (
              <a
                className='btn btn-gradient w-100 mt-4'
                href={url}
              >
                Login
              </a>
              )
        }
        {
          accessToken && (
            <button
              className='btn btn-gradient w-100 mt-3'
              onClick={navigateToInventory}
            >
              Back to inventory
            </button>
          )
        }
      </div>
    </>
  )
}
