<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#3aafa9" />
      <NuxtPage />
      <LazyOffcanvasSearch />
      <LazyOffcanvasSettings />
      <LazyOffcanvasMobileMenu />
    </NuxtLayout>
  </div>
</template>

<script setup>

  // Get the runtime config
  const config = useRuntimeConfig();
  const CMS_TOKEN = config.CMS_TOKEN

  // Set Directus
  const { getItems } = useDirectusItems();

  // Get the options
  const options = await getItems({
    collection: 'options',
    params: {
      fields: ['header_logo', 'social_networks'],
    }
  });

  // Set the logo
  const logo = `${config.CMS_URL}/assets/${options.header_logo}`

  // Build the sameAs networks
  const networks = options.social_networks.map(function(item){
    return item.link
  })

  // Create the JSON LD Schema
  useJsonld({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${config.FRONT_URL}/#identity`,
        'name':'LuxuryHotel',
        'url': `${config.FRONT_URL}`,
        'sameAs': networks,
        'logo':{
          '@type':'ImageObject',
          'inLanguage':'en-US',
          '@id': `${config.FRONT_URL}/#/schema/logo/image/`,
          'url': logo,
          'contentUrl': logo,
          'width': 300,
          'height': 66,
          'caption': 'LuxuryHotel'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${config.FRONT_URL}/#website`,
        'url': `${config.FRONT_URL}`,
        'name': 'LuxuryHotel',
        'description': 'The Best Luxury Hotel Reviews & Five Star Hotels',
        'publisher':{
          '@id': `${config.FRONT_URL}/#identity`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            'target':{
              '@type':'EntryPoint',
              'urlTemplate': `${config.FRONT_URL}/in/{search_term_string}`,
            },
            "target": `${config.FRONT_URL}/in/{search_term_string}`,
            'query-input':'required name=search_term_string'
          }
        ],
        'inLanguage': 'en-US'
      }
    ]
  });

</script>