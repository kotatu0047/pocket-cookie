// const set = (name: string, value: string): void => {}

import get from './get'
import clearAll from './clear'
import { getKeyValuePairsFromCookie } from './utility'

const api = {
  get,
  clearAll,
  getKeyValuePairs: getKeyValuePairsFromCookie,
}

export default api
