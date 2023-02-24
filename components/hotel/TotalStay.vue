<template>
  <NuxtLink :to="hotel_link+'?aid='+aid+'&checkin='+checkin+'&checkout='+checkout+'&group_adults='+guests+'&no_rooms=1&group_children=0'" target="_blank" class="hotel-total-stay-link color-dark-gray uk-block uk-width-1-1 use-transition">
    <div class="hotel-total-stay fs-xs bg-faded uk-border-rounded uk-position-relative">
      <div class="hotel-total-item hotel-total-unit" v-if="unit">
        <span v-html="unit"></span>
      </div>
      <div class="hotel-total-item hotel-total-price uk-flex">
        <span class="hotel-total-sale-price" v-if="total_price">
          <strong>
            {{ currencySwitcher(currency, total_price.currency, total_price.value) }}
          </strong>
        </span>
        <span class="hotel-total-old-price opacity-75" v-if="old_price">
          {{ currencySwitcher(currency, old_price.currency, old_price.value) }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  // Set the currency
  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency)

  // Set the props
  const props = defineProps(['unit', 'total_price', 'old_price', 'hotel_link', 'guests', 'checkin', 'checkout'])

  // Set the Booking AID
  const aid = await bookingAID()

</script>

<style>
  .hotel-total-stay {
    padding: 10px 15px;
  }
  .hotel-total-stay-link:hover {
    color: var(--dark);
  }
  .hotel-total-unit {
    margin-bottom: 4px;
  }
  .hotel-total-price {
    gap: 12px;
  }
  .hotel-total-old-price {
    text-decoration: line-through;
  }
  .hotel-total-item {
    position: relative;
    padding-left: 25px;
  }
  .hotel-total-item:before {
    position: absolute;
    top: 3px;
    left: 0;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='15' height='15' stroke='currentColor' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  }
  .hotel-total-stay:after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cline x1='7' y1='17' x2='17' y2='7'%3E%3C/line%3E%3Cpolyline points='7 7 17 7 17 17'%3E%3C/polyline%3E%3C/svg%3E");
    position: absolute;
    top: calc(50% - 10px);
    right: 0px;
    opacity: 0;
    transition: all .2s ease;
  }
  .hotel-total-stay:hover:after {
    opacity: 1;
    right: 20px;
  }
  @media only screen and (max-width: 1024px) {
    .hotel-total-stay:after {
      opacity: 1;
      right: 15px;
    }
    .hotel-total-stay {
      padding-right: 50px;
    }
  }
</style>