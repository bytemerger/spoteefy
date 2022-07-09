async function AppRequest (url: string, token: string, method = 'GET', body?: Record<string, unknown>) {
  const request = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  if (request.ok) {
    return (await request.json())
  }
  // if there is an auth error
  if (request.status.toString().startsWith('40')) {
    return await Promise.reject('Auth Error')
  }
}
export { AppRequest }
