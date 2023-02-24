<template>
  <ul class="hb-meta-horizontal uk-flex uk-flex-middle uk-margin-remove-bottom color-dark fs-xs">
    <li v-if="is_beach_front" class="uk-flex uk-flex-middle" uk-tooltip="Location">
      <span class="sb-hotel-meta-icon color-dark-gray">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun lh-svg">
          <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </span>
      <strong>Beachfront</strong>
    </li>
    <li v-if="is_city_center && !is_beach_front" class="uk-flex uk-flex-middle" uk-tooltip="Location">
      <span class="sb-hotel-meta-icon color-dark-gray">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-target lh-svg">
          <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
        </svg>
      </span>
      <strong>City Center</strong>
    </li>
    <li v-if="stars" class="uk-flex uk-flex-middle" uk-tooltip="Stars">
      <span class="sb-hotel-meta-icon color-dark-gray">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star lh-svg">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </span>
      <strong>{{stars}} Stars</strong>
    </li>
    <li v-if="review_score" class="uk-flex uk-flex-middle" uk-tooltip="Rating">
      <span class="sb-hotel-meta-icon color-dark-gray">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up lh-svg">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      </span>
      <strong>{{review_score}} {{review_word}}</strong>
    </li>
    <li v-if="price" class="uk-flex uk-flex-middle" uk-tooltip="Price from">
      <ClientOnly>
        <span class="sb-hotel-meta-icon color-dark-gray">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag lh-svg">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </span>
        <span class="hb-meta-value">
          <strong>
            {{ currencySwitcher(currency, price.gross_amount_per_night.currency, price.gross_amount_per_night.value) }}
          </strong>
          <span class="fs-xs fw-light"> /per night</span>
        </span>
      </ClientOnly>
    </li>
  </ul>
</template>

<script setup>

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  // Set the currency
  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency)

  // Set the props
  const props = defineProps(['is_beach_front', 'is_city_center', 'stars', 'review_score', 'review_word', 'price'])

</script>