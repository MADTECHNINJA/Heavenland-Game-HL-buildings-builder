import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from './components/Sidebar'
import CanvasContainer from './components/CanvasContainer'
import Controls from './components/Controls'
import { fetchAccessToken } from './store/userSlice'
import { fetchBuilding, idSelector } from './store/buildingSlice'
import useReload from './hooks/reload'

import style from './scss/modules/App.module.scss'

function App () {
  const dispatch = useDispatch()
  const buildingId = useSelector(idSelector)

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchAccessToken())
        await dispatch(fetchBuilding())
      } catch {
        // Safe to ignore
      }
    }

    init()
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchAccessToken()), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  useReload()

  return buildingId
    ? (
      <div className='vh-100 d-flex'>
        <Sidebar />
        <main className={style.main}>
          <CanvasContainer />
          <Controls />
        </main>
      </div>
      )
    : (
      <div className='container my-5'>
        <div className='alert alert-danger'>Building ID is required!</div>
      </div>
      )
}

export default App
