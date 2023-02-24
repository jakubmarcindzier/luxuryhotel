<template>

  <ul v-if="breadcrumbs" id="breadcrumbs" class="uk-breadcrumb uk-margin-small-top">
    <li v-for="(item, key) in breadcrumb" :key="key">
      <NuxtLink v-if="item.item" :to="item.item" :prefetch="false">{{item.name}}</NuxtLink>
      <span v-else>{{item.name}}</span>
    </li>
  </ul>

</template>

<script setup>

  // Set the props
  const props = defineProps(['current', 'parentName', 'parentLink'])
  const route = useRoute();

  // Get started
  const config = useRuntimeConfig();

  // Set the variables
  const parent = ref('')
  const current = ref('')
  const home = {
    '@type': 'ListItem',
    'item': config.FRONT_URL,
    'name': 'Home',
    'position': 1
  }

  if( props.parentLink && props.parentName !== props.current ) {
    parent.value = {
      '@type': 'ListItem',
      'item': config.FRONT_URL + props.parentLink + '/',
      'name': props.parentName,
      'position': 2
    }
    current.value = {
      '@type': 'ListItem',
      'item': config.FRONT_URL + route.fullPath,
      'name': props.current,
      'position': 3
    }
  } else {
    current.value = {
      '@type': 'ListItem',
      'item': config.FRONT_URL + route.fullPath,
      'name': props.current,
      'position': 2
    }
  }

  // Build the breadcrumbs
  const breadcrumbs = [ home, parent.value, current.value ]
  const breadcrumb = breadcrumbs.filter(function(item) {
    return item ? true : false;
  }).map(function(item) {
    return item
  });

  // Set the Google Schema
  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${config.FRONT_URL}/#breadcrumbs`,
    "itemListElement": breadcrumb
  });

</script>