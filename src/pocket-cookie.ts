import { get, getWithAutoCast } from './get'
import set from './set'
import clearAll from './clear'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

const api = {
  get,
  set,
  getWithAutoCast,
  clearAll,
  getKeyValuePairs: () => getKeyValuePairsFromCookie(false),
}

export default api
