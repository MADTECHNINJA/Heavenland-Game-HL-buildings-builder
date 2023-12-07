import axios from 'axios'
import { REACT_APP_API_URI, REACT_APP_AUTH_URI } from '../../config'

import { store } from '../../store'
import { accessTokenSelector } from '../../store/userSlice'

export const authClient = axios.create({
  baseURL: REACT_APP_AUTH_URI,
  withCredentials: true
})

export const apiClient = axios.create({
  baseURL: REACT_APP_API_URI
})

apiClient.interceptors.request.use(
  config => {
    const token = accessTokenSelector(store.getState())

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)
