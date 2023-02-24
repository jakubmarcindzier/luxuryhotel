<template>
  <div class="menu-actions fs-xs uk-flex uk-flex-middle uk-position-relative">
    <NuxtLink to="#" class="menu-action menu-action-switchers fw-light bg-white color-dark-gray uk-flex-inline uk-flex-middle uk-flex-center use-transition uk-visible@m" uk-toggle="target: #offcanvas-settings" aria-label="Website Settings" role="button">
      <span id="switcher-currency">{{currency.symbol}}</span>
      <span class="uk-margin-small-left uk-margin-small-right">|</span>
      <span id="switcher-language">EN</span>
    </NuxtLink>

    <NuxtLink to="#" class="menu-action menu-action-search bg-white color-dark-gray uk-flex-inline uk-flex-middle uk-flex-center use-transition" uk-toggle="target: #headerSearch" aria-label="Search for hotels" role="button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search lh-icon">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </NuxtLink>

    <NuxtLink to="/wishlist/" class="menu-action menu-action-favorites bg-white color-dark-gray uk-flex-inline uk-flex-middle uk-flex-center use-transition" aria-label="Your Wishlist">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart lh-icon">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </NuxtLink>

    <NuxtLink to="#" class="menu-action menu-action-menu bg-white color-dark-gray uk-flex-inline uk-flex-middle uk-flex-center use-transition uk-hidden@m" uk-toggle="target: #offcanvas-mobile-menu" aria-label="Mobile Menu" role="button">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup>

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency, '$')

</script>