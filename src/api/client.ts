
export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json() as Promise<T>
}


// Use ONE source for both flows (can override with env if needed)
const MOCK_URL =
  import.meta.env.VITE_API_URL ??
  '/api/payload.json'


export const endpoints = {
  flowA: import.meta.env.VITE_FLOW_A_URL ?? MOCK_URL,
  flowB: import.meta.env.VITE_FLOW_B_URL ?? MOCK_URL
}
