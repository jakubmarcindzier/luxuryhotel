<template>
  <div>

    <Head>
      <Title>Your Wishlist on LuxuryHotel.com</Title>
      <Meta name="description" content="LuxuryHotel.com - five-stars luxorious hotels wishlist."/>
    </Head>

    <HeaderMain background="white" color="dark" mode="sticky"/>

    <section class="hero-bgr uk-position-relative">

      <div class="uk-container uk-container-small uk-text-center uk-position-relative uk-position-z-index">
        <div class="location-hero-text uk-text-center">
          <Breadcrumbs current="Wishlist"/>
          <h1>Luxury Hotels <span class="highlighted-text">Wishlist</span></h1>
          <h2 class="fs-l fw-regular color-dark uk-margin-medium-top">
            Search around our website, find the best staying options and add them to your list. So you will never forget about a great hotel or destination that got your eye.
          </h2>
        </div>
      </div>

      <nuxt-img class="hero-background uk-position-absolute uk-position-center" src="/img/hero-bgr.svg" sizes="sm:90vw md:90vw lg:100vw" preload />

    </section>

    <main id="content-main" class="uk-container uk-container-large uk-margin-bottom">

      <div class="page-with-sidebar" uk-grid>
        <div class="uk-width-3-4@m">

          <div id="hotels-block" class="wishlist-hotels uk-margin-top uk-margin-bottom">
            
            <ClientOnly>
              <template v-if="wishlist.length">
                <div v-for="(hotel, index) in wishlist" :key="index" class="hb-item hb-item-small bg-light uk-position-relative uk-margin-medium-bottom">
                  <div class="uk-grid-collapse" uk-grid>
                    <div class="hb-item-image uk-width-auto@m">
                      <div class="hb-item-more-image uk-position-relative">
                        <button type="button" @click="deleteItem(hotel.id)" class="hb-item-wishlist bg-secondary color-white centrify uk-border-circle uk-position-small uk-position-top-left use-transition" uk-tooltip="Remove from your list">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart lh-svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                        <nuxt-img :src="hotel.image" :alt="hotel.name" width="250" height="285" loading="lazy" format="webp" placeholder />
                      </div>
                    </div>

                    <div class="hb-item-info uk-width-expand@m">
                      
                      <NuxtLink :to="hotel.url" target="_blank" class="link-with-arrow">
                        <h3 class="hb-item-title fs-l uk-margin-remove">{{hotel.name}}</h3>
                      </NuxtLink>
                      <p class="wishlist-item-location uk-margin-small-top uk-flex uk-flex-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin lh-svg">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {{hotel.location}}
                      </p>

                      <div class="hb-item-description">
                        <p class="uk-margin-remove-bottom">
                          {{hotelDescription(hotel.stars, hotel.location, hotel.address, hotel.score)}}
                        </p>
                      </div>

                      <div class="hb-item-bottom uk-flex uk-flex-between uk-margin-top">
                        <ul class="hb-meta-horizontal uk-flex uk-flex-middle uk-margin-remove-bottom color-dark fs-xs">
                          <li v-if="hotel.stars" class="uk-flex uk-flex-middle" uk-tooltip="Stars">
                            <span class="sb-hotel-meta-icon color-dark-gray">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star lh-svg">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </span>
                            <strong>{{hotel.stars}} Stars</strong>
                          </li>
                          <li v-if="hotel.score" class="uk-flex uk-flex-middle" uk-tooltip="Rating">
                            <span class="sb-hotel-meta-icon color-dark-gray">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up lh-svg">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                              </svg>
                            </span>
                            <strong>{{hotel.score}}</strong>
                          </li>
                          <li v-if="hotel.price" class="uk-flex uk-flex-middle" uk-tooltip="Price from">
                            <span class="sb-hotel-meta-icon color-dark-gray">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag lh-svg">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
                              </svg>
                            </span>
                            <span class="hb-meta-value">
                              <strong>{{hotel.price}}</strong>
                              <span class="fs-xs fw-light"> /per night</span>
                            </span>
                          </li>
                        </ul>
      
                        <NuxtLink :to="hotel.url" target="_blank" class="uk-button uk-button-primary button-small">See available rooms</NuxtLink>
                      </div>

                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="bg-faded uk-padding-large">
                <h3>No hotels added to the wishlist.</h3>
                <NuxtLink to="/destinations/" class="with-arrow uk-button uk-button-primary">Check Destinations</NuxtLink>
              </div>
            </ClientOnly>

          </div>
        </div>
        
        <div class="uk-width-1-4@m">

          <aside class="page-sidebar use-transition uk-position-sticky">
            <h5 class="uk-margin-bottom">Latest Guides</h5>
            <SidebarLatestGuides number="3" />
          </aside>

        </div>
      </div>

    </main>

    <FooterMain/>

  </div>
</template>

<script setup>

  // Import the storage
  import { useStorage  } from '@vueuse/core'

  // Import UIkit
  import UIkit from 'uikit'

  // Get the store data
  const wishlist = useStorage('lh_wishlist', [])

  function deleteItem(itemID) {

    // Get the existing hotel ids
    const hotel_ids = wishlist.value.map(a => a.id);

    // Check for the item
    if (hotel_ids.includes(itemID)) {
        
      // Get the index of the item
      const indexOfObject = wishlist.value.findIndex(object => {
        return object.id === itemID;
      });

      // Splice the item from array
      wishlist.value.splice(indexOfObject, 1);
      
      // Show notification
      UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Removed from your list!', pos: 'top-right'})
    }
  }

  // Set the hotel descriptions
  function hotelDescription(stars, location, address, reviews) {
    let output = 'This '
    if(stars) {
      output += stars+' star '
    }
    output += 'hotel is located in '+location+''
    if(address) {
      output += ' at'+address
    }
    if(reviews) {
      output += ' and it is rated as '+reviews
    }
    output += '.'

    return output
  }

</script>

<style>
  .hero-bgr {
    padding: 60px 0;
    background: linear-gradient(180deg,rgba(233,237,240,.85) 60%,hsla(0,0%,100%,.5));
  }
  .hero-background {
    object-fit: cover;
    width: 80%;
    height: 100%;
    z-index: 0;
  }
  .wishlist-hotels .hb-item-small .hb-item-description {
    min-height: 78px;
  }
  .wishlist-item-location {
    gap: 6px;
  }
  .wishlist-item-location i {
    margin-top: -3px;
  }
  @media only screen and (max-width: 600px) {
    .wishlist-hotels .hb-item-small .hb-item-description {
      min-height: unset;
    }
  }
</style>