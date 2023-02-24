<template>
  <div class="sidebar-box">
    <h6>Other cool accommodation lists for <span class="underlined-text">{{props.location}}</span></h6>
    <ul class="sidebar-types sidebar-navigation uk-list uk-list-divider">
      <li v-for="(type, index) in types" :key="index">
        <NuxtLink :to="baseURL+type.slug" activeClass="activeLink" class="color-dark-gray uk-position-relative use-transition">{{props.location}} {{type.title}}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['location', 'location_slug'])

  // Get current URL
  const baseURL = ref('')
  const currentURL = useRoute().path
  const allSlugs = useRoute().params.slug
  const currentSlug = allSlugs.length - 2
  const currentType = allSlugs[currentSlug] + '/'

  // Build the types
  const types = [
    {
      slug: 'private-pools/',
      title: 'Private Pools Hotels'
    },
    {
      slug: 'family-friendly/',
      title: 'Family Friendly Hotels'
    },
    {
      slug: 'multi-bedroom/',
      title: 'Multi-Bedroom Hotels'
    },
    {
      slug: '5-star/',
      title: '5 Star Hotels'
    },
    {
      slug: 'sustainable/',
      title: 'Sustainable Hotels'
    }
  ]

  // Map the type slugs to check below
  const typeSlugs = types.map(a => a.slug)

  // Set the base URL
  if( typeSlugs.includes(currentType) ) {
    baseURL.value = currentURL.replace(currentType, '')
  } else {
    baseURL.value = currentURL
  }

</script>