export default defineNuxtRouteMiddleware(async (to) => {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Fetch all the links
  const redirects = await $fetch(`${config.CMS_URL}/items/redirects?filter[status][_eq]=published`, {
    headers: {
      Authorization: `Bearer ${config.CMS_TOKEN}`
    },
    params: {
      limit: -1
    }
  })

  // Build the redirect
  const redirect = ref()
  redirects.data.forEach(async (item) => {
    if ( to.path === item.from ) {
      redirect.value = {
        from: item.from,
        to: item.to,
        code: item.code
      }
    }
  });

  // Check for redirects
  if ( redirect.value && redirect.value.from === to.path ) {
    return redirectMeTo(redirect.value.to, redirect.value.code)
  }

});
