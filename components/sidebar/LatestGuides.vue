<template>
  <div v-if="guides" class="sidebar-guides">
    <div v-for="(guide, index) in guides" :key="index" class="guides-grid-item uk-margin-medium-bottom">
      <NuxtLink :to="'/guides/'+guide.slug+'/'" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded">
        <div class="guides-grid-content uk-position-small uk-position-bottom-left uk-position-z-index">
          <p v-if="guide.content && countHotels(guide.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
            <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(guide.content.blocks)}}</span>
            <span class="guides-hotels-label fs-s">hotel ideas</span>
          </p>
        </div>
        <img v-if="guide.image" :src="imageLink(guide.image, 380, 250, 'webp', 85)" alt="{{ guide.title }}" width="380" height="250" class="guides-grid-image uk-border-rounded use-transition" />
      </NuxtLink>

      <h4 class="fs-m uk-text-center uk-margin-small-bottom uk-margin-top">{{guide.title}}</h4>
    </div>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['number'])

  // Get started
  const { getItems } = useDirectusItems();

  // Get the guides to this location
  const guides = await getItems({
    collection: 'guides',
    params: {
      filter: {
        'status': 'published',
      },
      limit: props.number ? props.number : 3
    }
  });

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