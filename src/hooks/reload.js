import { useEffect } from 'react'

export const RELOAD = 'reload'

const { search, origin, pathname } = window.location
const params = new URLSearchParams(search)
const reload = params.get(RELOAD)

export default function useReload () {
  useEffect(() => {
    if (reload) {
      // Workaround for Firefox
      params.delete(RELOAD)
      let url = origin + pathname
      if ([...params].length) {
        url += `?${params}`
      }
      window.location.assign(url)
    }
  }, [])

  return reload
}
