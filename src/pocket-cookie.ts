import { get, getWithAutoCast } from './get'
import { getKeyValuePairsFromCookie } from './utility'
import set from './set'
import clearAll from './clear'

const api = {
  get,
  set,
  getWithAutoCast,
  clearAll,
  getKeyValuePairs: () => getKeyValuePairsFromCookie(false),
}

export default api
