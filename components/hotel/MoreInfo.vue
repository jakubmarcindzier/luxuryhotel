<template>
  <content-loader v-if="pending" viewBox="0 0 730 150" :animate="true" :speed="2" primaryColor="#cacdd8" secondaryColor="#ffffff">
    <rect x="0" y="0" rx="4" ry="4" width="700" height="8" /> 
    <rect x="0" y="25" rx="4" ry="4" width="650" height="8" /> 
    <rect x="0" y="50" rx="4" ry="4" width="560" height="8" />
    <rect x="0" y="75" rx="4" ry="4" width="600" height="8" />
    <rect x="0" y="100" rx="4" ry="4" width="600" height="8" />
    <rect x="0" y="125" rx="4" ry="4" width="500" height="8" />
  </content-loader>

  <template v-else>
    <p v-if="hotelDetails.location_highlights && hotelDetails.location_highlights.popular_landmarks">
      {{ landmarks(hotelDetails.location_highlights.popular_landmarks) }}
    </p>
    <p v-if="hotelDetails.location_highlights && (hotelDetails.location_highlights.has_restaurant || hotelDetails.location_highlights.nearby_stations)">
      {{ restaurants(hotelDetails.location_highlights.has_restaurant) }} {{stations(hotelDetails.location_highlights.nearby_stations)}}
    </p>
    <p v-if="props.cancellable">
      This offer is great as you can book it now and cancel it later if you plans changed. Тake advantage of this great price now.
    </p>
  </template>
</template>

<script setup>

  // Import libraries
  import { ContentLoader } from 'vue-content-loader'

  // Set the props
  const props = defineProps(['hotel', 'cancellable'])

  // Define the API settings
  const config = useRuntimeConfig()
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Get the hotels from Booking's API
  const { pending, data: hotelDetails, refresh } = await useLazyAsyncData(
    'hotelInfo-'+props.hotel+'',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/location-highlights', {
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

  // Get the landmarks
  function landmarks(text) {
    if( text ) {
      return 'While staying in this beautiful hotel, you can enjoy some great landmarks like '+text.join(', ')+'.';
    }
  }

  // Get the restaurants
  function restaurants(text) {
    if( text ) {
      return 'Wondering where to have a launch or take a diner? Near your stay can find great restaurants like '+text.map(a => a.name).join(', ')+'.';
    }
  }

  // Get the stations
  function stations(text) {
    if( text ) {
      return 'From the hotel you can easily explore the destination using stations '+text.map(a => a.station_name).join(', ')+'.';
    }
  }

</script>
