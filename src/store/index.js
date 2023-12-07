import { configureStore } from '@reduxjs/toolkit'

import buildingReducer from './buildingSlice'
import sceneSlice from './sceneSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    building: buildingReducer,
    scene: sceneSlice,
    user: userSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})
