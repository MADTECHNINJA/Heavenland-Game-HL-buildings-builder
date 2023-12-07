import { store } from '../../store'
import { idSelector, structureSelector } from '../../store/buildingSlice'
import { authClient, apiClient } from './client'

export function getAccessToken () {
  return authClient({
    url: '/auth/access-token',
    method: 'post'
  })
}

export function uploadBuilding () {
  const buildingId = idSelector(store.getState())
  const structure = structureSelector(store.getState())

  /* eslint-disable camelcase */
  const data = structure.map(({ building_game_id, elevation, rotation, scale }, floor) => ({
    elevation,
    rotation,
    scale,
    floor,
    building_game_id
  }))
  /* eslint-enable camelcase */

  return apiClient({
    url: `/${buildingId}/blocks`,
    data,
    method: 'put'
  })
}

export function getBuilding () {
  const buildingId = idSelector(store.getState())

  return apiClient({
    url: `/${buildingId}/blocks`
  })
}
