import fetch from 'cross-fetch'

const { CLOUDFLARE_KV_URL } = process.env

export const exists = async link => {
  const { status } = await fetch(`${CLOUDFLARE_KV_URL}?q=${link}`)
  return status === 200
}

export const put = async link => {
  await fetch(`${CLOUDFLARE_KV_URL}?q=${link}`, { method: 'PUT' })
}
