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
function debounce (func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}
function milliSecondsToMinSec (milli: number) {
  const minutes = Math.floor(milli / 60000)
  const seconds = ((milli % 60000) / 1000).toFixed(0)
  return (
    parseInt(seconds) == 60
      ? (minutes + 1) + ':00'
      : minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds
  )
}
export { AppRequest, debounce, milliSecondsToMinSec }
