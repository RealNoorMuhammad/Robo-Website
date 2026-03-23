/**
 * Loads platform.twitter.com/widgets.js once. Use twttr.widgets.createTweet()
 * so React does not destroy Twitter’s iframe DOM on re-render.
 */
let loadPromise = null

export function ensureTwitterWidgets() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('no window'))
  }

  if (window.twttr?.widgets?.createTweet) {
    return Promise.resolve(window.twttr)
  }

  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const resolveWhenReady = () => {
      if (!window.twttr?.ready) {
        reject(new Error('Twitter twttr.ready missing'))
        return
      }
      window.twttr.ready(() => {
        if (window.twttr?.widgets?.createTweet) {
          resolve(window.twttr)
        } else {
          reject(new Error('Twitter widgets.createTweet missing'))
        }
      })
    }

    if (document.getElementById('twitter-wjs')) {
      resolveWhenReady()
      return
    }

    const script = document.createElement('script')
    script.id = 'twitter-wjs'
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    script.onload = resolveWhenReady
    script.onerror = () => reject(new Error('Twitter widgets script blocked or failed'))
    document.body.appendChild(script)
  })

  return loadPromise
}
