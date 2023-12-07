import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { clearBlocks } from '../store/buildingSlice'

import style from '../scss/modules/ClearAllButton.module.scss'

export default function ClearAllButton () {
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (!clicked) {
      setTimeout(setClicked, 3000, false)
      return setClicked(true)
    }

    setClicked(false)

    dispatch(clearBlocks())
  }

  return (
    <button
      className='btn btn-gradient-danger w-100 position-relative'
      onClick={handleClick}
    >
      {clicked ? 'Click again to confirm' : 'Clear all'}
      {clicked && <div className={style.progress} />}
    </button>
  )
}
