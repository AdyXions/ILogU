import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'https://ilogu-api.gabsbiler.com',
  async onRequest({ options }) {
    const accessToken = sessionStorage.getItem('access_token')
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
})
