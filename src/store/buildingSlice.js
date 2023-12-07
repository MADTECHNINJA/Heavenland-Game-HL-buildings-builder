import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBuilding } from '../util/api'

const initialState = {
  id: Number(new URLSearchParams(window.location.search).get('building')),
  blocks: [],
  structure: [],
  models: {}
}

export const fetchBuilding = createAsyncThunk(
  'building/fetchBuilding',
  async () => {
    const response = await getBuilding()
    return response.data.sort((a, b) => a.floor - b.floor)
  }
)

export const buildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    addBlock (state, { payload }) {
      if (state.blocks.length < HEIGHT_LIMIT) {
        state.blocks.push(payload)
      }
    },
    removeBlock (state) {
      state.blocks.pop()
    },
    clearBlocks (state) {
      state.blocks = []
    },
    rotateBlock (state, { payload }) {
      const block = state.structure[state.structure.length - 1]
      block && (block.rotation = payload)
    },
    updateStructure (state, { payload }) {
      state.structure = payload.map((block, index) => state.structure[index] || block)
    },
    addModel (state, { payload }) {
      state.models[payload.building_game_id] = payload.model
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBuilding.fulfilled, (state, { payload }) => {
      if (payload.length) state.blocks = payload
    })
  }
})

export const {
  addBlock,
  removeBlock,
  clearBlocks,
  updateStructure,
  rotateBlock,
  addModel
} = buildingSlice.actions

export const blocksSelector = state => state.building.blocks
export const structureSelector = state => state.building.structure
export const idSelector = state => state.building.id
export const modelsSelector = state => state.building.models
export const rotationSelector = state => state.building.structure[state.building.structure.length - 1]?.rotation ?? 0

export const HEIGHT_LIMIT = 6

export default buildingSlice.reducer
