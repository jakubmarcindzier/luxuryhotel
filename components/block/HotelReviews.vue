<template>
  <div v-if="!pending" class="hotel-reviews-loop">
    
    <div v-for="hotel in hotels.data" :key="hotel.id" class="hritem uk-margin-medium-bottom uk-border-rounded use-transition">
      <div class="uk-grid-medium uk-child-width-expand@s uk-grid" uk-grid="">
        <div class="hritem-image uk-width-2-5@m uk-first-column">
          <NuxtLink :to="'/hotels/'+hotel.slug+'/'" :title="hotel.title">
            <nuxt-img v-if="hotel.image" :src="imageLink(hotel.image, 550, 340, 'webp', 85)" width="550" height="340" loading="lazy" format="webp" :alt="hotel.title+' Hotel Review'" class="uk-border-rounded uk-width-1-1 uk-width-auto@m" />
            <nuxt-img v-else width="550" height="340" src="/img/placeholder.webp" :alt="hotel.title+' Hotel Review'" class="uk-border-rounded uk-width-1-1 uk-width-auto@m" loading="lazy" format="webp" />
          </NuxtLink>
        </div>

        <div class="hritem-info uk-width-expand@m">
          <p v-if="hotel.address" class="hritem-location fs-xs uk-flex uk-flex-middle uk-margin-small-bottom uk-margin-small-top">
            <span class="uk-margin-small-right uk-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin lh-svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            {{hotel.address}}
          </p>

          <NuxtLink :to="'/hotels/'+hotel.slug+'/'" :title="hotel.title+' Hotel Review'" class="link-with-arrow">
            <h3 class="hritem-title fs-xl fw-semibold color-dark">
              {{hotel.title}} Review
            </h3>
          </NuxtLink>

          <div v-if="hotel.blurb" class="hritem-blurb fs-xs">
            <p>
              {{hotel.blurb}}
              <NuxtLink :to="'/hotels/'+hotel.slug+'/'" :title="hotel.title+' Hotel Review'" class="color-dark uk-flex uk-flex-middle uk-margin-small-top use-transition">
                {{hotel.title}} Hotel Review
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right lh-svg">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </NuxtLink>
            </p>
          </div>

          <div class="hritem-actions uk-margin-medium-top uk-grid-divider uk-grid" uk-grid>
            <div v-if="hotel.stars" class="hritem-meta uk-flex uk-flex-row">
              <span class="uk-margin-small-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star lh-svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              <div class="hritem-meta-stars">
                <p class="hritem-meta-label fs-xxs uk-margin-remove-bottom">Rating</p>
                <strong class="color-dark">{{hotel.stars}} Stars</strong>
              </div>
            </div>

            <div v-if="hotel.price_from" class="hritem-meta uk-flex uk-flex-row">
              <span class="uk-margin-small-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag lh-svg">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </span>
              <div class="hritem-meta-price">
                <p class="hritem-meta-label fs-xxs uk-margin-remove-bottom">Rooms from</p>
                <span class="color-dark">
                  <strong>{{ currencySwitcher(currency, 'GBP', hotel.price_from) }}</strong>
                  <span class="fw-light"> /per night</span>
                </span>
              </div>
            </div>

            <div class="uk-width-expand@m">
              <NuxtLink class="uk-button uk-button-primary uk-width-1-1 uk-width-auto@m" :to="hotelOnBooking(hotel.booking_id, hotel.title)" target="_blank" rel="noopener">Check availability</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>

  <div v-if="props.pagination == 'enabled' && allHotels" class="hb-pagination uk-center">
    <pagination v-model="pageNumber" :records="allHotels.length" :per-page="props.number" @paginate="usePagination()" />
  </div>
</template>

<script setup>

  // Import libraries
  // import { ContentLoader } from 'vue-content-loader'
  // import Pagination from 'v-pagination-3'

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  // Import libraries
  const { ContentLoader } = defineAsyncComponent(() =>
    import('vue-content-loader')
  )
  const Pagination = defineAsyncComponent(() =>
    import('v-pagination-3')
  )

  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency)

  // Set the props
  const props = defineProps(['id', 'number', 'pagination'])

  // Get started
  const { getItems, getItemById } = useDirectusItems()

  // Get the runtime config
  const config = useRuntimeConfig()

  // Set the Affiliate link
  const aid = await bookingAID()
  const token = ref('9fT4CeKhAdfQTD9FcFIuUWU-VXry62PZ')

  // Define the basics
  const pageNumber = ref(1)

  // Get the hotels from Booking's API
  const { pending, data: hotels, refresh } = await useAsyncData(
    ''+props.id+'_hotels',
    () => $fetch(`${config.CMS_URL}/items/hotels?filter[status][_eq]=published`, {
      params: {
        sort: 'date_created',
        limit: props.number ? props.number : 20,
        page: pageNumber.value
      },
      headers: {
        Authorization: 'Bearer '+token.value+''
      }
    }
  ))

  // Get all the hotels
  const allHotels = await getItems({
    collection: 'hotels',
    params: {
      filter: {
        'status': 'published',
      },
      limit: -1,
    }
  });

  // Generate the hotel link to Booking.com based on id or title
  function hotelOnBooking(booking_id, title) {
    let link = ''
    if( booking_id ) {
      link = 'https://www.booking.com/searchresults.html?aid='+aid+'&dest_id='+booking_id+'&dest_type=hotel'
    } else {
      link = 'https://www.booking.com/searchresults.html?aid='+aid+'&ss='+title+''
    }

    return link
  }

  // Definte the pagination function
  function usePagination() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    refresh()
  }
  
</script>

<style>
  .hritem {
    border: 1px solid var(--placeholders);
    padding: 25px;
  }
  .hritem .link-with-arrow:after {
    top: 10px;
  }
  .hritem .hritem-blurb {
    min-height: 130px;
  }
  @media only screen and (max-width: 600px) {
    .hritem {
      padding: 20px;
    }
    .hritem-meta-price,
    .hritem-meta-stars {
      font-size: var(--font-size-s);
    }
    .hritem-title {
      font-size: var(--font-size-l);
    }
  }
</style>