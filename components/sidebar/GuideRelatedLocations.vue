<template>
  <div v-if="locations" class="sidebar-box">
    <h6>Related Destinations</h6>
    <ul class="sidebar-navigation uk-list uk-list-divider">
      <li v-for="location in locations" :key="location.id">
        <NuxtLink :to="location.parent ? locationLink(location.slug, location.parent.slug) : locationLink(location.slug, '')" class="color-dark-gray uk-position-relative use-transition">
          Luxury hotels in {{location.title}}
        </NuxtLink>
      </li>

      <li v-if="all_locations.length > 5">
        <a @click="showMore($event)" href="javascript:void(0)" class="sidebar-list-expand color-dark-gray use-transition">
          <span class="sidebar-list-more uk-flex uk-flex-middle">
            More Destinations
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down lh-svg">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
          <span class="sidebar-list-less uk-flex uk-flex-middle">
            Less Destinations
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up lh-svg">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['guide'])

  // Get started
  const { getItems } = useDirectusItems();

  // Get the guides to this location
  const guideLocations = await getItems({
    collection: 'guides_location',
    params: {
      filter: {
        'guides_id': {
          '_eq': props.guide
        }
      },
    }
  });

  // Start with Guides
  const all_locations = ref('');

  // Check for locations and get the related guides
  if( guideLocations.length ) {
    all_locations.value = await getItems({
      collection: 'location',
      params: {
        filter: {
          'status': 'published',
          'id': {
            '_in': guideLocations.map(a => a.location_id)
          }
        },
        sort: 'title',
        limit: -1,
        fields: ['slug', 'title', 'parent.slug'],
      }
    });
  }

  // Set the locations with limit of 5
  const locations = ref(all_locations.value.slice(0,5))

  // Show more on click
  function showMore(event) {
    let parent = event.target.closest('a')
    parent.classList.toggle('active')
    if(parent.classList.contains('active')) {
      locations.value = all_locations.value
    } else {
      locations.value = all_locations.value.slice(0,5)
    }
  }

</script>

<style scoped>
  ul.sidebar-navigation {
    font-size: 15px;
  }
</style>