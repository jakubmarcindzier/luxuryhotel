import { useNuxtApp } from '#app'
import { sendRedirect } from 'h3'

/**
 * Performs an better redirect in a Nuxt3 route middleware. Once this Nuxt3
 * feature is improved, this function can be removed in favor of navigateTo:
 *
 * @param url - An external url to redirect to
 * @param code - An HTTP status code, 301 by default.
 * @returns
 */
export default function redirectMeTo(
  url: string,
  code = 301
): never | Promise<void> {
  if (process.server) {
    const nuxtApp = useNuxtApp()
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      return nuxtApp.callHook('app:redirected').then(() => {
        if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
          return sendRedirect(nuxtApp.ssrContext.event, url, code)
        }
      })
    }
  } else {
    window.location.href = url
  }
  throw new Error('Cannot redirect to invalid URL.')
}