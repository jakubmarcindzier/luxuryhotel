<template>
  <section class="page-module uk-container uk-container-large">

    <div class="destinations-holder" uk-filter="target: .destinations-filter; animation: fade">

      <ul v-if="props.filter" class="destination-filters uk-subnav uk-subnav-pill uk-flex-center uk-margin-medium-bottom">
        <li class="uk-active" uk-filter-control><a href="#" class="uk-border-rounded">All</a></li>
        <li uk-filter-control="[data-type='country']"><a href="#" class="uk-border-rounded">Countries</a></li>
        <li uk-filter-control="[data-type='region']"><a href="#" class="uk-border-rounded">Regions</a></li>
        <li uk-filter-control="[data-type='city']"><a href="#" class="uk-border-rounded">Cities</a></li>
        <li uk-filter-control="[data-type='landmark']"><a href="#" class="uk-border-rounded">Landmarks</a></li>
      </ul>

      <div v-if="props.filter" class="uk-search uk-search-default uk-align-center uk-width-1-1 uk-width-1-2@l uk-margin-large-bottom">
        <span uk-search-icon></span>
        <input type="text" v-model="search" placeholder="Search destinations.." class="uk-search-input uk-border-rounded" aria-label="Search hotel destinations" />
      </div>

      <ul v-if="filteredList()" class="destinations-filter locations-grid uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-top" uk-grid>

        <li v-for="(location, index) in filteredList()" :key="index" :data-type="location.type" class="location-item-holder">
          <NuxtLink :to="navigateToDestination(location.id, location.slug, location.parent)" :title="location.title" :prefetch="false" class="location-item uk-flex uk-flex-middle uk-text-center uk-text-left@m use-transition">
            <nuxt-img v-if="location.image_url && location.image_url != 'undefined'" :src="webpImage(location.image_url)" :alt="'Five-star hotels in '+location.title" width="100" height="100" loading="lazy" format="webp" />
            <nuxt-img v-else src="/img/placeholder.webp" :alt="location.title" width="100" height="100" loading="lazy" format="webp" />
            <div class="location-item-info">
              <h3 class="uk-margin-remove-bottom">{{location.title}}</h3>
              <p class="fs-xs color-dark-gray uk-margin-remove-top uk-margin-remove-bottom">{{location.hotels}}+ Hotels</p>
            </div>
          </NuxtLink>
        </li>

      </ul>
      
    </div>

  </section>
</template>

<script setup>
  
  // Set the props
  const props = defineProps(['id', 'locations', 'layout', 'columns', 'number', 'filter', 'types'])

  // Get started
  const config = useRuntimeConfig()
  const CMS_TOKEN = config.CMS_TOKEN
  const { getItems, getItemById } = useDirectusItems();

  // Define the picked locations
  const locations = ref()
  const module_locations = ref()
  
  // Check for picked locations
  if( props.locations.length ) {

    // Get the module locations
    module_locations.value = await getItems({
      collection: 'modules_location',
      params: {
        filter: {
          'id': {
            '_in': props.locations
          }
        },
        limit: -1,
      }
    });

    // Get the picked locations
    locations.value = await getItems({
      collection: 'location',
      params: {
        filter: {
          'status': 'published',
          'id': {
            '_in': module_locations.value.map(a => a.location_id)
          }
        },
        fields: ['id', 'title', 'slug', 'image_url', 'parent.id', 'parent.slug', 'hotels', 'type'],
        sort: 'title',
        limit: -1,
      }
    });
  } else {
    locations.value = await getItems({
      collection: 'location',
      params: {
        filter: {
          'status': 'published'
        },
        fields: ['id', 'title', 'slug', 'image_url', 'parent.id', 'parent.slug', 'hotels', 'type'],
        sort: 'title',
        limit: -1,
      }
    });
  }

  // Provide Webp images
  function webpImage(image) {
    return image.replace('jpg', 'webp')
  }

  // Navigate to the location
  function navigateToDestination(id, slug, parent) {

    let parentSlug = ''
    let locationType = ''

    if( props.types != 'default' ) {
      locationType = props.types + '/'
    }

    if( parent && parent.id !== id ) {
      parentSlug = parent.slug+'/'
    } else {
      parentSlug = ''
    }

    // Navigate to the link
    return '/in/' + parentSlug + slug + '/' + locationType
  }

  // Define the search
  const search = ref('')

  // Filter locations based on the search
  function filteredList() {
    // Set the output
    let output = []
    
    // Check for search strings
    if( search.value.length > 2 ) {
      output = locations.value.filter(post => {
        return post.title.toLowerCase().includes(search.value.toLowerCase())
      })
    } else {
      output = locations.value
    }

    // Return the output
    return output
  }
  
</script>

<style>
  .location-item {
    gap: 20px;
    padding-right: 10px;
  }
  .location-item,
  .location-item img {
    border-radius: 8px;
  }
  .location-item:hover {
    background: var(--faded);
  }
  .link-with-arrow,
  .sb-hotel .sb-hotel-title,
  .location-item .location-item-info p {
    display: inline-block;
    position: relative;
  }
  .link-with-arrow:after,
  .sb-hotel .sb-hotel-title:after,
  .location-item .location-item-info p:after {
    content: url("data:image/svg+xml,%3Csvg width='22' height='12' viewBox='0 0 22 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6L21 6' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 1L21 6L16 11' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    position: absolute;
    left: 100%;
    top: 0px;
    opacity: 0;
    visibility: hidden;
    -moz-transition: all .1s linear;
    -webkit-transition: all .1s linear;
    transition: all .1s linear;
    transition-delay: .2s;
  }
  .link-with-arrow:hover:after,
  .sb-hotel .sb-hotel-title:hover:after,
  .location-item:hover .location-item-info p:after {
    opacity: 1;
    visibility: visible;
    left: calc(100% + 10px);
  }
  .location-item .location-item-info h3 {
    font-size: 19px;
  }
  .location-item .location-item-info p:after {
    content: url("data:image/svg+xml,%3Csvg width='20' height='10' viewBox='0 0 22 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6L21 6' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 1L21 6L16 11' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }
  .destinations-holder .destination-filters>li>a {
    padding-top: 8px;
  }
  .destination-map {
    position: absolute;
    top: calc(50% - 40px);
    right: 15px;
    display: inline-block;
    width: 100px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .destination-card:hover {
    background: var(--light);
    border-color: var(--light);
  }
  .destination-card .destination-card-hotels {
    opacity: 0;
    bottom: 1.5em;
    transition-delay: .1s;
  }
  .destination-card:hover .destination-card-subtitle {
    opacity: 0;
  }
  .destination-card:hover .destination-card-hotels {
    opacity: 1;
    bottom: 2.5em;
  }
  .destination-card-title {
    font-size: 20px;
    z-index: 1;
  }
  @media only screen and (max-width: 600px) {
    .location-item {
      flex-flow: column;
    }
    .location-item .location-item-info h3 {
      font-size: 17px;
    }
    .destinations-holder .destination-filters>li {
      padding-left: 0;
    }
  }
</style>