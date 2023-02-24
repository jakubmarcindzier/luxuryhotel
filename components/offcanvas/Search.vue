<template>

  <div id="headerSearch" class="fs-xs" uk-modal>
    <div class="uk-modal-dialog">
        <div class="uk-modal-header bg-transparent">
          <div class="header-search-form uk-position-relative">
            <span class="uk-form-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search lh-svg">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input v-model="search" ref="headerSearchField" type="text" class="bg-light fs-m uk-input uk-form-blank uk-input-large" placeholder="Search hotels, destinations or guides..."/>
            <button v-if="clear" @click="clearSearch()" class="header-search-clear color-dark-gray bg-faded border-none fs-xxs fw-normal uk-border-pill uk-position-absolute uk-position-center-right uk-position-small">x clear</button>
          </div>
        </div>

        <div class="header-search-results uk-modal-body">
          <ul v-if="filteredList(locations).length" class="search-results-list search-results-destinations uk-list">
            <li class="search-results-title uk-position-relative">Destinations</li>
            <li v-for="(location, index) in filteredList(locations)" :key="index" class="uk-position-relative">
              <NuxtLink :to="navigateToDestination(location.id, location.slug, location.parent)" class="color-dark fw-medium use-transition" uk-toggle="target: #headerSearch" :prefetch="false">{{location.title}}</NuxtLink>
            </li>
          </ul>

          <ul v-if="filteredList(guides).length" class="search-results-list search-results-guides uk-list">
            <li class="search-results-title uk-position-relative">Guides</li>
            <li v-for="(guide, index) in filteredList(guides)" :key="index" class="uk-position-relative">
              <NuxtLink :to="'/guides/'+guide.slug" class="color-dark fw-medium use-transition" uk-toggle="target: #headerSearch" :prefetch="false">{{guide.title}}</NuxtLink>
            </li>
          </ul>

          <ul v-if="filteredList(hotels).length" class="search-results-list search-results-hotels uk-list">
            <li class="search-results-title uk-position-relative">Hotel Reviews</li>
            <li v-for="(hotel, index) in filteredList(hotels)" :key="index" class="uk-position-relative">
              <NuxtLink :to="'/hotels/'+hotel.slug" class="color-dark fw-medium use-transition" uk-toggle="target: #headerSearch" :prefetch="false">{{hotel.title}}</NuxtLink>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script setup>

  // Import UIkit
  import UIkit from 'uikit';

  // Get started
  const config = useRuntimeConfig()
  const { getItems } = useDirectusItems()

  // Define the search
  const search = ref('')
  const clear = ref('')
  const headerSearchField = ref()

  // Get the guides
  const guides = await getItems({
    collection: 'guides',
    params: {
      filter: {
        'status': 'published'
      },
      fields: ['title', 'slug'],
      limit: -1,
    }
  });

  // Get the locations
  const locations = await getItems({
    collection: 'location',
    params: {
      filter: {
        'status': 'published',
        'hotels': {
          '_nnull': true
        }
      },
      fields: ['id', 'title', 'slug', 'type', 'parent.id', 'parent.title', 'parent.slug'],
      sort: 'date_created',
      limit: -1,
    }
  });

  // Get the reviews
  const hotels = await getItems({
    collection: 'hotels',
    params: {
      filter: {
        'status': 'published'
      },
      fields: ['title', 'slug'],
      limit: -1,
    }
  });

  // Filter locations based on the search
  function filteredList(type) {

    // Set the output
    let output = []
    
    // Check for search strings
    if( search.value.length > 2 ) {
      output = type.filter(post => {
        return post.title.toLowerCase().includes(search.value.toLowerCase())
      })
    } else {
      if(type) {
        output = type.slice(0,3)
      }
    }

    // Return the output
    return output
  }
  
  // Navigate to the location
  function navigateToDestination(id, slug, parent) {

    let parentSlug = ''

    if( parent && parent.id !== id ) {
      parentSlug = parent.slug+'/'
    } else {
      parentSlug = ''
    }

    // Navigate to the link
    return '/in/' + parentSlug + slug + '/'
  }

  // Focus the search on modal open
  onMounted(() => {
    UIkit.util.on('#headerSearch', 'shown', () => {
      setTimeout(() => {
        headerSearchField.value.focus()
      }, 100)
    });
  })

  // Update clear button on search
  watch(search, (newSearch) => {
    if(newSearch.length > 2){
      clear.value = true
    } else {
      clear.value = false
    }
  })

  // Clear the search
  function clearSearch() {
    search.value = ''
  }
</script>

<style>
  #headerSearch .uk-modal-dialog {
    border-radius: 20px;
  }
  #headerSearch .uk-modal-header {
    padding: 15px 15px 10px;
  }
  #headerSearch input {
    border-radius: 25px;
    background: var(--light);
  }
  .header-search-results ul:last-child {
    margin-bottom: 0;
  }
  ul.search-results-list li {
    padding-left: 36px;
    min-height: 26px;
  }
  ul.search-results-list li:before {
    position: absolute;
    left: 0;
    top: -1px;
    width: 26px;
    height: 26px;
    line-height: 33px;
    background: var(--placeholders);
    border-radius: 100%;
    text-align: center;
    transition: all .3s ease;
  }
  ul.search-results-list li:not(.search-results-title):hover:before {
    background: var(--primary);
  }
  ul.search-results-list li.search-results-title:before {
    content: '';
    height: 1px;
    top: 10px;
  }
  ul.search-results-guides li:not(.search-results-title):before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'%3E%3C/path%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'%3E%3C/path%3E%3C/svg%3E");
  }
  ul.search-results-destinations li:not(.search-results-title):before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E");
  }
  ul.search-results-hotels li:not(.search-results-title):before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'%3E%3C/polygon%3E%3C/svg%3E");
  }
  ul.search-results-list li.search-results-title {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  ul.search-results-list:first-child li.search-results-title {
    margin-top: 0;
  }
  .header-search-clear {
    padding: 6px 12px;
  }
</style>