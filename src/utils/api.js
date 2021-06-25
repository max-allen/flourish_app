import axios from 'axios'

export const ENDPOINTS = {
  auth: 'auth',
  podcasts: 'api/podcasts',
  playlists: 'api/playlists'
}

const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'http://localhost:5000'
})

httpClient.interceptors.response.use(res => res, err => Promise.reject(err))

export const callApi = async ({
  endpoint,
  method = 'get',
  body = {}
}) => {
  try {
    const resp = await httpClient({ method, url: endpoint, data: body })
    return resp
  } catch (error) {
    return Promise.reject(error)
  }
}
