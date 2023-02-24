<template>
  <div class="hb-item-more">
    <content-loader v-if="pending" viewBox="0 0 250 500" :animate="true" :speed="2" primaryColor="#cacdd8" secondaryColor="#ffffff">
      <rect x="0" y="0" rx="0" ry="0" width="280" height="250" />
      <rect x="0" y="250" rx="0" ry="0" width="280" height="250" />
    </content-loader>

    <template v-else>
      <div v-if="hotelImages" class="hb-item-more-image bg-black">
        <img :src="webpImage(hotelImages[1].url_1440)" :alt="props.hotelName+' images'" class="use-transition opacity-50">
      </div>

      <div v-if="hotelImages" class="hb-item-more-image bg-black">
        <a href="javascript:void(0);" class="hb-item-gallery color-white uk-flex uk-position-relative uk-text-center uk-height-1-1" uk-toggle="target: #mh_gallery">
          <span class="uk-position-center uk-flex uk-flex-column uk-position-z-index">
            <span><vue-feather type="image" size="20" stroke-width="1"></vue-feather></span>
            <span class="hb-item-images">{{hotelImages.length}}+ images</span>
          </span>
          <img :src="webpImage(hotelImages[2].url_1440)" :alt="props.hotelName+' images'" class="use-transition opacity-50">
        </a>
      </div>
    </template>
  </div>

  <LazyOffcanvasHotelGallery v-if="hotelImages" :images="hotelImages.slice(0, 20)" :location="props.location" :hotelName="props.hotelName" :hotelLink="props.hotelLink" :hotelStars="props.hotelStars" :hotelDescription="description" />
</template>

<script setup>

  // Import libraries
  import { ContentLoader } from 'vue-content-loader'

  // Set the props
  const props = defineProps([ 'location', 'hotel', 'hotelName', 'hotelLink', 'hotelStars' ])

  // Define the API settings
  const config = useRuntimeConfig()
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Get the hotel images
  const { pending, data: hotelImages, refresh } = await useLazyAsyncData(
    'hotelImages-'+props.hotel+'',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/photos', {
      params: {
        'hotel_id': props.hotel ? props.hotel : '0',
        'locale': 'en-gb'
      },
      headers: {
        'X-RapidAPI-Key': RA_KEY,
        'X-RapidAPI-Host': RA_HOST
      }
    }
  ))

  // Build the modal description
  const description = 'Check all the images, room and price information about the '+props.hotelName+' hotel, so you can easily plan your next trip.'

  // Provide Webp images
  function webpImage(image) {
    return image.replace('jpg', 'webp')
  }

</script>
