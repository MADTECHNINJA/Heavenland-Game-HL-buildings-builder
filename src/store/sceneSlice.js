import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  distance: 3
}

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    updateDistance (state, { payload }) {
      state.distance = payload
    }
  }
})

export const { updateDistance } = sceneSlice.actions

export const distanceSelector = state => state.scene.distance

export const MIN_DISTANCE = 1
export const MAX_DISTANCE = 10

export default sceneSlice.reducer
