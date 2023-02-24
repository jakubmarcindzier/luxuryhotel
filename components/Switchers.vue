<template>
  <div class="lh-switchers">

    <div v-if="currencies" class="switchers-currency">
      <h6 class="fs-xs fw-medium uk-text-uppercase">Currency</h6>
      <ClientOnly>
        <select v-model="currency" @change="updateSwitcher()" label="Select currency" name="currency" class="uk-select">
          <option v-for="currency in currencies" :key="currency.id" :value="{currency: currency.currency, symbol: currency.symbol, rates: currency.rates}" selected>{{currency.name}}</option>
        </select>
      </ClientOnly>
    </div>

    <div class="switchers-language uk-margin-top">
      <h6 class="fs-xs fw-medium uk-text-uppercase">Language</h6>
      <select class="uk-select color-dark">
        <option selected>English</option>
      </select>
    </div>

  </div>
</template>

<script setup>

  // Import the storage
  import { useCurrencyStore } from '~/store/currency'
  import { storeToRefs } from 'pinia'

  const pickedCurrency = useCurrencyStore()
  const { currency } = storeToRefs(pickedCurrency)

  // Get started
  const { getItems } = useDirectusItems();

  // Get the currencies
  const currencies = await getItems({
    collection: 'currencies',
  })

  // Update the switcher
  function updateSwitcher() {
    pickedCurrency.setCurrency(currency.value)
  }

</script>