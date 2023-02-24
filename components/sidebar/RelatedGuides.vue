<template>
  <div v-if="guides" class="sidebar-guides">
    <div v-for="(guide, index) in guides" :key="index" class="guides-grid-item uk-margin-medium-bottom">
      <NuxtLink :to="'/guides/'+guide.slug+'/'" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded" :title="guide.title">
        <div class="guides-grid-content uk-position-small uk-position-bottom-left uk-position-z-index">
          <p v-if="guide.content && countHotels(guide.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
            <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(guide.content.blocks)}}</span>
            <span class="guides-hotels-label fs-s">hotel ideas</span>
          </p>
        </div>
        <nuxt-img v-if="guide.image" :src="imageLink(guide.image, 380, 250, 'webp', 85)" width="380" height="250" loading="lazy" format="webp" alt="{{ guide.title }}" class="guides-grid-image uk-border-rounded use-transition" />
      </NuxtLink>

      <h4 class="fs-m uk-margin-top uk-text-center">{{guide.title}}</h4>
    </div>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['location', 'location_id'])

  // Get started
  const config = useRuntimeConfig()
  const { getItems } = useDirectusItems();

  // Get the guides to this location
  const locationGuides = await getItems({
    collection: 'guides_location',
    params: {
      filter: {
        'location_id': {
          '_eq': props.location_id
        }
      },
      fields: ['guides_id']
    }
  });

  // Start with Guides
  const guides = ref('');

  // Check for locations and get the related guides
  if( locationGuides.length ) {
    guides.value = await getItems({
      collection: 'guides',
      params: {
        filter: {
          'status': 'published',
          'id': {
            '_in': locationGuides.map(a => a.guides_id)
          }
        },
        sort: 'date_created',
        limit: 3,
      }
    });
  }

  // Count the hotel ideas in guide
  function countHotels(content) {
    if( content ) {
      let hotels = content.filter(post => {
        return post.type.includes('hotel')
      })
      return hotels.length
    } else {
      return 0
    }
  }

</script>