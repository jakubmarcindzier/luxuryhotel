import VueGtag from 'vue-gtag'

export default defineNuxtPlugin(async (nuxtApp) => {

  // Get started
  const { getItems } = useDirectusItems();

  // Get the Google Tag Manager
  const options = await getItems({
    collection: 'options',
    params: {
      fields: ['google_tag_manager']
    }
  })

  // Run the Vue App
  if( options.google_tag_manager ) {
    nuxtApp.vueApp.use(VueGtag, {
      compatibility: true,
      config: { 
        id: options.google_tag_manager,
        params: {
          anonymize_ip: true
        }
      }
    })
  }
  
})