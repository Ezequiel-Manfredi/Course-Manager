import { API_URL, UNAUTHORIZED } from '../utils/constants'

export const createApi = async (endpoit, method = 'GET', body = {}, login = {}) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${login.type} ${login.token}`
    },
    method,
    body: JSON.stringify(body)
  }
  const response = await fetch(API_URL + endpoit, options)
  if (response.status === UNAUTHORIZED) return { status: UNAUTHORIZED }
  return { status: response.status, body: await response.json() }
}
