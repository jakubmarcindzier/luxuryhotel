<template>

  <ClientOnly>
    <button v-if="checkIfExist(props.id) == true" @click="deleteItem(props.id)" class="hb-item-wishlist wishlist-remove bg-secondary color-white centrify uk-border-circle uk-position-small uk-position-top-left use-transition" uk-tooltip="Remove from your list" aria-label="Remove from your list">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart lh-svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>

    <button v-else @click="addItem()" class="hb-item-wishlist wishlist-add bg-secondary color-white centrify uk-border-circle uk-position-small uk-position-top-left use-transition" uk-tooltip="Add to your list" aria-label="Add from your list">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart lh-svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  </ClientOnly>

</template>

<script setup>

  // Import the storage
  import { useLocalStorage } from '@vueuse/core'

  // Import UIkit
  import UIkit from 'uikit';

  // Set the props
  const props = defineProps(['id', 'name', 'location', 'image', 'address', 'stars', 'price', 'score', 'url'])

  // Get the store data
  const existing = ref(useLocalStorage('lh_wishlist', []))

  // Add the item
  function checkIfExist(itemID) {

    // Get the existing hotel ids
    const hotelIDs = existing.value.map(a => a.id);

    // Check for the item
    if ( hotelIDs.includes(itemID) ) {
      return true
    }
  }

  // Add the item
  function addItem() {

    // Get the localstorage
    const wishlist = useLocalStorage('lh_wishlist', [])

    // Get the existing hotel ids
    const hotelIDs = wishlist.value.map(a => a.id);

    // Check for the item
    if ( hotelIDs.includes(props.id) ) {
      return true
    }

    // Invokes function in the store
    wishlist.value.push({
      id: props.id,
      name: props.name,
      location: props.location,
      description: props.address,
      stars: props.stars,
      price: props.price,
      score: props.score,
      url: props.url,
      image: props.image,
    })

    // Show notification
    existing.value = wishlist.value

    // Show notification
    UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Added to your list!', pos: 'top-right'})
  }

  // Delete the item
  function deleteItem(itemID) {

    // Check for the item
    if ( checkIfExist(itemID) === true ) {

      // Get the localstorage
      const wishlist = useLocalStorage('lh_wishlist', [])
        
      // Get the index of the item
      const indexOfObject = wishlist.value.findIndex(object => {
        return object.id === itemID;
      });

      // Splice the item from array
      wishlist.value.splice(indexOfObject, 1);

      // Update the existing
      existing.value = wishlist.value
      
      // Show notification
      UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Removed from your list!', pos: 'top-right'})
    }
  }

</script>

<style>
  .hb-item-wishlist {
    width: 35px;
    height: 35px;
    border: none;
    z-index: 1;
  }
  @media only screen and (min-width: 1200px) {
    .hb-item-wishlist {
      opacity: 0;
      visibility: hidden;
    }
    .hb-item:hover .hb-item-wishlist,
    .hotel-item:hover .hb-item-wishlist {
      opacity: 1;
      visibility: visible;
    }
  }
</style>