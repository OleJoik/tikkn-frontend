
import { defineStore } from 'pinia'

import { Geolocation } from '@/utilities/Geolocation'

export const usePosition = defineStore({
  id: 'position',
  state: () => ({
    watcher: Geolocation
  })
})
