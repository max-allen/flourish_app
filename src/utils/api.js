import axios from 'axios'

export const ENDPOINTS = {
  podcasts: 'api/podcasts'
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
  url = '/',
  method = 'get',
  body = {}
}) => {
  try {
    const resp = await httpClient({ method, url, data: body })
    return resp
  } catch (error) {
    return Promise.reject(error)
  }
}
