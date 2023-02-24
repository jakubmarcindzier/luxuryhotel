<template>
  <section class="page-module uk-container uk-container-large">

    <div v-if="hotels" class="uk-position-relative uk-visible-toggle" tabindex="-1" uk-slider="finite:true">
      <ul :class="'uk-slider-items uk-child-width-1-1 uk-child-width-1-'+(props.columns - 2)+'@s uk-child-width-1-'+(props.columns - 1)+'@m uk-child-width-1-'+props.columns+'@l uk-grid uk-grid-match'">
        <li v-for="(hotel, index) in hotels" :key="index">
          <div class="review-item bg-light uk-border-rounded uk-position-relative">

            <NuxtLink :to="'/hotels/'+hotel.slug+'/'" :prefetch="false" class="review-item-image uk-position-relative uk-display-block">
              <span class="review-badge color-white bg-secondary fs-xs fw-medium uk-border-rounded uk-position-top-right">Featured</span>
              <nuxt-img v-if="hotel.image" class="guides-grid-image uk-border-rounded use-transition" :src="imageLink(hotel.image, 320, 210, 'webp', 85)" :alt="hotel.title" loading="lazy" format="webp" placeholder />
              <nuxt-img v-else class="guides-grid-image uk-border-rounded use-transition" src="/img/placeholder.webp" :alt="guide.title" loading="lazy" format="webp" placeholder />
            </NuxtLink>

            <div class="review-grid-content">
              <NuxtLink :to="'/hotels/'+hotel.slug+'/'" :prefetch="false" class="review-grid-item-link uk-display-block">
                <h3 class="review-item-title fs-m">{{ hotel.title }}</h3>
                <p v-if="hotel.destinations" class="review-item-location color-dark-gray fs-xs uk-margin-remove-top uk-flex uk-flex-middle">
                  <nuxt-img :src="'/img/icons/map_marker.svg'" width="13" height="15" preload :alt="hotel.title+' Review'" />
                  {{ hotel.destinations.title }}
                </p>
              </NuxtLink>
              <div class="review-item-meta uk-flex uk-flex-middle">
                <span class="review-meta-item review-meta-stars color-white bg-primary uk-border-rounded centrify">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.36067 1L10.6351 5.60778L15.7213 6.35121L12.041 9.93586L12.9096 15L8.36067 12.6078L3.81178 15L4.68034 9.93586L1 6.35121L6.08622 5.60778L8.36067 1Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span v-if="hotel.stars" class="review-stars-value fs-xs">{{hotel.stars}}</span>
                </span>
              </div>
            </div>

            <div class="review-grid-bottom uk-flex uk-flex-middle uk-flex-between">
              <div v-if="hotel.price_from" class="review-price uk-flex uk-flex-column">
                <span class="fw-light fs-xs">prices from</span>
                <span class="review-item-price fs-m">
                  <strong class="review-item-currency fs-xs">{{ currencySwitcher(currency, 'USD', hotel.price_from) }}</strong>
                  <span class="fs-xxs fw-light"> /per night</span>
                </span>
              </div>
            </div>
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
  const props = defineProps(['id', 'number', 'columns', 'items'])

  // Get started
  const { getItems } = useDirectusItems();

  // Define the API settings
  const config = useRuntimeConfig()

  // Get the picked locations data
  const hotels = await getItems({
    collection: 'hotels',
    params: {
      filter: {
        reviews_carousel_picked: {
          '_nnull': true
        }
      },
      fields: ['title', 'slug', 'image', 'price_from', 'stars', 'destinations', 'destinations.title', 'reviews_carousel_picked'],
    }
  });

</script>

<style>
/* Hotels grid */
  .review-grid-content {
    padding: 25px;
    border-bottom: 2px solid var(--light-gray);
  }
  .review-grid-bottom {
    padding: 15px 25px;
  }
  .review-grid-content h3 {
    margin-bottom: 6px;
  }
  .review-item-meta {
    gap: 10px;
    margin-top: 20px;
  }
  .review-item-meta .review-meta-item {
    height: 30px;
    padding: 0 10px;
    gap: 6px;
  }
  .review-item-meta .review-price bdi {
    margin-right: 5px;
  }
  .review-stars-value,
  .review-rate-value {
    margin-bottom: -3px;
  }
  .review-actions {
    gap: 10px;
  }
  .review-actions-item {
    border: 1px solid var(--dark-gray);
    width: 35px;
    height: 35px;
  }
  .review-item .review-actions {
    opacity: 0;
    visibility: hidden;
  }
  .review-item:hover .review-actions {
    opacity: 1;
    visibility: visible;
  }
  .review-item .review-badge {
    top: 25px;
    right: 25px;
    padding: 3px 10px;
  }
  .review-item .review-item-image {
    height: 210px;
  }
  .review-item .review-item-image img {
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
  .review-grid-item-link {
    min-height: 60px;
  }
  .review-item-location {
    gap: 8px;
  }
</style>