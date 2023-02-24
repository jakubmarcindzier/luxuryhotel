<template>
  <div v-if="locations.length > 0" class="sidebar-box">
    <h6>More luxury hotels in <span class="underlined-text">{{parentName}}</span></h6>
    <ul class="sidebar-navigation uk-list uk-list-divider">
      <li v-for="location in locations" :key="location.id">
        <NuxtLink :to="locationLink(location.slug, location.parent.slug)" activeClass="activeLink" class="color-dark-gray uk-position-relative use-transition">Luxury hotels in {{location.title}}</NuxtLink>
      </li>

      <li v-if="childLocations.length > 5">
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
  const props = defineProps(['location', 'location_id', 'location_parent', 'parent_name'])

  // Get started
  const { getItems } = useDirectusItems();

  // Set the parent name
  const parentName = props.parent_name ? props.parent_name : props.location

  // Get the data
  const childLocations = await getItems({
    collection: 'location',
    params: {
      filter: {
        'status': 'published',
        '_and': [
          {
            'parent': {
              '_eq': props.location_parent ? props.location_parent : props.location_id
            },
          },
          {
            'id': {
              '_neq': props.location_id
            },
          }
        ]
      },
      fields: ['title', 'slug', 'parent.slug'],
      sort: 'title',
    }
  });

  // Set the first 5 locations
  const locations = ref(childLocations.slice(0,5))

  // Show more on click
  function showMore(event) {
    let parent = event.target.closest('a')
    parent.classList.toggle('active')
    if(parent.classList.contains('active')) {
      locations.value = childLocations
    } else {
      locations.value = childLocations.slice(0,5)
    }
  }

</script>

<style>
  ul.sidebar-navigation .sidebar-list-expand .sidebar-list-less,
  ul.sidebar-navigation .sidebar-list-expand.active .sidebar-list-more {
    display: none;
  }
  ul.sidebar-navigation .sidebar-list-expand.active .sidebar-list-less {
    display: flex;
  }
  ul.sidebar-navigation .sidebar-list-expand span {
    gap: 5px;
  }
  ul.sidebar-navigation {
    font-size: 15px;
  }
</style>