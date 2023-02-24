<template>
  <div class="header-brand">
    <NuxtLink href="/"> 
      <nuxt-img :src="logo" class="logo" width="208" height="46" alt="LuxuryHotel - 5 Star Hotel Reviews" preload />
    </NuxtLink>
  </div>
</template>

<script setup>

  // Set Directus
  const { getItems } = useDirectusItems();

  // Get the runtime config
  const config = useRuntimeConfig()

  // Get the options
  const options = await getItems({
    collection: 'options',
    params: {
      fields: ['header_logo', 'social_networks']
    }
  });

  // Set the logo
  const logo = options.header_logo ? `${config.CMS_URL}/assets/${options.header_logo}` : '/img/logo.svg'

</script>

<style>
  @media only screen and (max-width: 600px) {
    #header .header-brand .logo {
      height: 40px;
      width: auto;
    }
  }
</style>