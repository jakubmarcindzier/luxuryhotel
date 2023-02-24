<template>
  <section class="page-module uk-container uk-container-large">

    <div v-if="!pending" class="uk-position-relative uk-visible-toggle" tabindex="-1" uk-slider="finite:true">
      <ul :class="'uk-slider-items uk-child-width-1-1 uk-child-width-1-'+(props.columns - 2)+'@s uk-child-width-1-'+(props.columns - 1)+'@m uk-child-width-1-'+props.columns+'@l uk-grid uk-grid-match'">
        <li v-for="(hotel, index) in hotels.result" :key="index">
          <div class="hotel-item bg-light uk-border-rounded uk-position-relative">
            <WishlistButton v-if="!pending" :id="hotel.hotel_id" :name="hotel.hotel_name" :location="hotel.city_trans+', '+hotel.country_trans" :address="hotel.address" :price="hotel.composite_price_breakdown.gross_amount_per_night.currency+' '+hotel.composite_price_breakdown.gross_amount_per_night.value.toFixed(0)" :stars="hotel.class" :score="hotel.review_score ? hotel.review_score+' '+hotel.review_score_word : ''" :url="hotel.url+'?aid='+aid+''" :image="webpImage(hotel.main_photo_url)" />
            <NuxtLink :to="hotel.url+'?aid='+aid+''" target="_blank" class="hotel-item-image uk-position-relative uk-display-block">
              <span class="hotel-badge color-white bg-secondary fs-xs fw-medium uk-border-rounded uk-position-top-right">{{hotel.review_score_word}}</span>
              <nuxt-img :src="webpImage(hotel.main_photo_url)" :alt="hotel.hotel_name" class="hotel-grid-image" width="320" height="210" loading="lazy" format="webp" />
            </NuxtLink>

            <div class="hotel-grid-content">
              <NuxtLink :to="hotel.url+'?aid='+aid+''" target="_blank" class="hotel-grid-item-link uk-display-block">
                <h3 class="hotel-item-title fs-m">{{trimTitle(hotel.hotel_name)}}</h3>
                <p class="hotel-item-location color-dark-gray fs-xs uk-margin-remove-top uk-flex uk-flex-middle">
                  {{hotel.city_trans}}, {{hotel.country_trans}}
                </p>
              </NuxtLink>
              <div class="hotel-item-meta uk-flex uk-flex-middle">
                <span class="hotel-meta-item hotel-meta-stars color-white bg-primary uk-border-rounded centrify">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.36067 1L10.6351 5.60778L15.7213 6.35121L12.041 9.93586L12.9096 15L8.36067 12.6078L3.81178 15L4.68034 9.93586L1 6.35121L6.08622 5.60778L8.36067 1Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span v-if="hotel.class" class="hotel-stars-value fs-xs">{{hotel.class}}</span>
                </span>

                <span class="hotel-meta-item hotel-meta-rate color-white bg-primary uk-border-rounded centrify">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.49998 14.9999H2.39999C2.02869 14.9999 1.6726 14.8524 1.41005 14.5899C1.1475 14.3273 1 13.9712 1 13.5999V8.69995C1 8.32865 1.1475 7.97256 1.41005 7.71001C1.6726 7.44746 2.02869 7.29996 2.39999 7.29996H4.49998M9.39995 5.89997V3.09999C9.39995 2.54304 9.1787 2.0089 8.78487 1.61507C8.39105 1.22125 7.85691 1 7.29996 1L4.49998 7.29996V14.9999H12.3959C12.7336 15.0037 13.0612 14.8854 13.3185 14.6667C13.5757 14.448 13.7453 14.1437 13.7959 13.8099L14.7619 7.50996C14.7924 7.30931 14.7788 7.10444 14.7223 6.90954C14.6657 6.71464 14.5674 6.53437 14.4342 6.38123C14.301 6.22808 14.1362 6.10572 13.951 6.02262C13.7659 5.93952 13.5649 5.89767 13.3619 5.89997H9.39995Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="hotel-rate-value fs-xs">{{hotel.review_score}}</span>
                </span>

                <span class="hotel-rate-label fs-xs">{{hotel.review_nr}} reviews</span>
              </div>
            </div>

            <ClientOnly>
              <div class="hotel-grid-bottom uk-flex uk-flex-middle uk-flex-between">
                <div v-if="hotel.composite_price_breakdown" class="hotel-price uk-flex uk-flex-column">
                  <span class="fw-light fs-xs">prices from</span>
                  <span class="hotel-item-price fs-m">
                    <strong class="hotel-item-currency fs-xs">{{ currencySwitcher(currency, hotel.composite_price_breakdown.gross_amount_per_night.currency, hotel.composite_price_breakdown.gross_amount_per_night.value) }}</strong>
                    <span class="fs-xxs fw-light"> /per night</span>
                  </span>
                </div>
              </div>
            </ClientOnly>
          </div>
        </li>
      </ul>

      <a class="hotels-carousel-nav hotels-carousel-prev uk-flex uk-flex-center uk-flex-middle uk-position-center-left uk-position-small bg-white uk-border-circle uk-box-shadow-medium" href="#" uk-slidenav-previous uk-slider-item="previous" aria-label="Previous"></a>
      <a class="hotels-carousel-nav hotels-carousel-next uk-flex uk-flex-center uk-flex-middle uk-position-center-right uk-position-small bg-white uk-border-circle uk-box-shadow-medium" href="#" uk-slidenav-next uk-slider-item="next" aria-label="Next"></a>
    </div>
  </section>
</template>

<script setup>

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency)

  // Set the props
  const props = defineProps(['id', 'columns', 'locations'])

  // Get started
  const { getItems } = useDirectusItems();
  const randomLocation = ref('')

  // Define the API settings
  const config = useRuntimeConfig()
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Check for locations
  if(props.locations) {
    randomLocation.value = Array.isArray(props.locations) ? props.locations[Math.floor(Math.random() * props.locations.length)] : props.locations;
  }

  // Get the picked locations data
  const location = await getItems({
    collection: 'location',
    params: {
      filter: {
        id: {
          '_eq': randomLocation.value
        }
      },
    }
  });

  // Get today and set the date + value
  function setTheDate( days ) {
    let d = new Date();
    d.setDate( d.getDate() + days );

    // Return the date
    return new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      )
    ).toISOString().slice(0, 10);
  }

  // Search defaults
  const defLanguage = ref('en-gb')
  const defCurrency = ref('USD')
  const searchCheckin = ref(setTheDate(20))
  const searchCheckout = ref(setTheDate(25))
  const locationType = ref('country')
  const locationID = ref('')

  // Set the Booking AID
  const aid = await bookingAID()

  // Update the location attributes
  if(location) {
    locationID.value = location[0].booking_id;
    locationType.value = location[0].type;
  }

  // Get the hotels from Booking's API
  const { pending, data: hotels, refresh } = await useAsyncData(
    'hotelsCarousel-'+props.id+'',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/search', {
      params: {
        checkin_date: searchCheckin.value,
        checkout_date: searchCheckout.value,
        dest_id: locationID.value,
        dest_type: locationType.value,
        locale: defLanguage.value,
        filter_by_currency: defCurrency.value,
        order_by: 'popularity',
        adults_number: '2',
        children_number: '1',
        children_ages: '0',
        room_number: '1',
        categories_filter_ids: 'class::5',
        include_adjacency: 'true',
        units: 'metric',
        page_number: 0,
      },
      headers: {
        'X-RapidAPI-Key': RA_KEY,
        'X-RapidAPI-Host': RA_HOST
      }
    }
  ))

  // Provide Webp images
  function webpImage(image) {
    let finalImage = image.replace('square60', 'square360')
    return finalImage.replace('jpg', 'webp')
  }

  // Trim the title
  function trimTitle(title) {
    let output = title
    if( title.length > 40 ) {
      output = title.slice(0,40)+'...'
    }

    return output;
  }

</script>

<style>
/* Hotels grid */
  .hotel-grid-content {
    padding: 25px;
    border-bottom: 2px solid var(--light-gray);
  }
  .hotel-grid-bottom {
    padding: 15px 25px;
  }
  .hotel-grid-content h3 {
    margin-bottom: 6px;
  }
  .hotel-item-meta {
    gap: 10px;
    margin-top: 20px;
  }
  .hotel-item-meta .hotel-meta-item {
    height: 30px;
    padding: 0 10px;
    gap: 6px;
  }
  .hotel-item-meta .hotel-price bdi {
    margin-right: 5px;
  }
  .hotel-stars-value,
  .hotel-rate-value {
    margin-bottom: -3px;
  }
  .hotel-actions {
    gap: 10px;
  }
  .hotel-actions-item {
    border: 1px solid var(--dark-gray);
    width: 35px;
    height: 35px;
  }
  .hotel-item .hotel-actions {
    opacity: 0;
    visibility: hidden;
  }
  .hotel-item:hover .hotel-actions {
    opacity: 1;
    visibility: visible;
  }
  .hotel-item .hotel-badge {
    top: 25px;
    right: 25px;
    padding: 3px 10px;
  }
  .hotel-item .hotel-item-image {
    height: 210px;
  }
  .hotel-item .hotel-item-image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .hotels-carousel-nav {
    top: 105px !important;
    width: 40px;
    height: 40px;
  }
  .hotels-carousel-nav svg {
    width: 16px;
    height: 16px;
  }
  .hotels-carousel-next:after,
  .hotels-carousel-prev:after {
    font-size: 14px;
    color: var(--dark);
  }
  .hotel-grid-item-link {
    min-height: 72px;
  }
</style>