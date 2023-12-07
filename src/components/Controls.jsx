import { useDispatch, useSelector } from 'react-redux'
import { distanceSelector, MAX_DISTANCE, MIN_DISTANCE, updateDistance } from '../store/sceneSlice'

import style from '../scss/modules/Controls.module.scss'

export default function Controls () {
  const dispatch = useDispatch()
  const distance = useSelector(distanceSelector)

  const onChange = ({ target: { value } }) => {
    dispatch(updateDistance(Number(value)))
  }

  return (
    <div
      className={style.controls}
    >
      <span>
        <i className='bi-plus fs-4' />
      </span>
      <input
        className='form-range w-50'
        type='range'
        min={MIN_DISTANCE}
        max={MAX_DISTANCE}
        step={0.001}
        value={distance}
        onChange={onChange}
      />
      <span>
        <i className='bi-dash fs-4' />
      </span>
    </div>
  )
}
