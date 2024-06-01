import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'https://ilogu-api.gabsbiler.com',
  async onRequest({ options }) {
    const accessToken = 'AV1z9ac7ZVZrQYPofC0ml8yEh6ikpRML'
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
})
