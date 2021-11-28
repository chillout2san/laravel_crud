import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost/public/',
})

export const postMethod = async (
  methodName: string,
  params: URLSearchParams
) => {
  return client.post(methodName, params)
}
