import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '../util/api'

const initialState = {
  accessToken: null
}

export const fetchAccessToken = createAsyncThunk(
  'user/fetchAccessToken',
  async (_, { dispatch }) => {
    try {
      const response = await getAccessToken()
      dispatch(updateAccessToken(response.data.accessToken.value))
    } catch (error) {
      dispatch(updateAccessToken(null))
      throw error
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAccessToken (state, { payload }) {
      state.accessToken = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccessToken.rejected, (_, { error }) => {
      throw error
    })
  }
})

export const { updateAccessToken } = userSlice.actions

export const accessTokenSelector = state => state.user.accessToken

export default userSlice.reducer
