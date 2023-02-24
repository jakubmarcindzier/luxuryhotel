<template>

  <div>
    <HeaderMain background="white" color="dark" mode="sticky"/>

    <section class="location-hero uk-position-relative">
      <div class="uk-container uk-container-small uk-text-center uk-position-relative uk-position-z-index">
        <div class="location-hero-text uk-text-center">
          <Breadcrumbs :current="location.title" :parentName="parentName ? parentName : ''" :parentLink="parentSlug ? parentSlug : ''" />
          <h1>{{locationTitle}} {{mergingWord}} <span class="highlighted-text">{{location.title}}</span></h1>
          <p id="lastUpdated"><DateUpdated :date="location.date_updated" text="Last updated on" /></p>
          <h2 v-if="fromBooking.total_count_with_filters > 0" class="fs-l fw-regular color-dark uk-margin-medium-top">
            We have found <strong>{{fromBooking.total_count_with_filters}}</strong> {{locationSubtitle}} {{mergingWord}} <strong>{{location.title}}</strong>. 
            Below are the most elegant and luxurious stays {{mergingWord}} <strong>{{location.title}}</strong>. Enter your dates to find the best luxury hotel for your stay.
          </h2>
          <h2 v-else class="fs-l fw-regular color-dark uk-margin-medium-top">
            Unfortunately we haven't been able to find exactly what you are looking for <strong>{{location.title}}</strong>. 
            You can try with different dates to check for other luxury staying options at this destination.
          </h2>
        </div>

        <BlockSearchHotels use_location="no" @update-search="findHotels" ref="calendar" />
      </div>

      <nuxt-img class="hero-background uk-position-absolute uk-position-center" src="/img/hero-bgr.svg" loading="lazy" height="500" preload placeholder />
    </section>

    <main id="content-main" class="location-content uk-container uk-container-large uk-margin-bottom">

      <div class="page-with-sidebar" uk-grid>
        <div class="uk-width-3-4@m">

          <div v-if="location.content && locType != 'specific'" class="location-custom-content bg-light uk-position-relative uk-padding uk-padding-remove-bottom uk-margin-large-bottom">
            <EditorContent :content="location.content.blocks" />
            <LazyScrollDownArrow :intro="'Find Luxury Hotels in '+location.title"/>
          </div>
          
          <div id="hgb" class="uk-flex uk-flex-middle uk-flex-between">
            <div class="hgb-layout hgb-action uk-flex-inline uk-flex-middle">
              <!--<a href="#" data-layout="grid" class="color-dark-gray centrify use-transition" uk-tooltip="Grid"><vue-feather type="grid" stroke-width="1.5" size="20"></vue-feather></a>-->
              <a href="#hgb" data-layout="list" class="active color-dark-gray centrify use-transition" uk-tooltip="List" aria-label="Display as List">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list lh-svg">
                  <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </a>
            </div>

            <div class="hgb-sort hgb-action uk-flex-inline uk-flex-middle">
              <span class="hgb-sort-label fs-xxs fw-medium uk-text-uppercase">Sort by</span>
              <a href="#hgb" @click="sortBy('class_descending')" :class="bookingOrderby == 'class_descending' ? 'active' : ''" class="color-dark-gray centrify use-transition" uk-tooltip="Stars" aria-label="Sort by Stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star lh-svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </a>
              <a href="#hgb" @click="sortBy('popularity')" :class="bookingOrderby == 'popularity' ? 'active' : ''" class="color-dark-gray centrify use-transition" uk-tooltip="Popularity" aria-label="Sort by Popularity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile lh-svg">
                  <circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </a>
              <a href="#hgb" @click="sortBy('review_score')" :class="bookingOrderby == 'review_score' ? 'active' : ''" class="color-dark-gray centrify use-transition" uk-tooltip="Reviews" aria-label="Sort by Reviews">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up lh-svg">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </a>
              <a href="#hgb" @click="sortBy('price')" :class="bookingOrderby == 'price' ? 'active' : ''" class="color-dark-gray centrify use-transition" uk-tooltip="Price" aria-label="Sort by Price">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag lh-svg">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </a>
            </div>
          </div>

          <div id="hotels-block" class="uk-margin-top uk-margin-bottom">
            
            <template v-if="fromBooking && fromBooking.result.length > 0">
              <template v-if="pending">
                <div v-for="(hotel, index) in fromBooking.result" :key="index" class="uk-margin-medium-bottom bg-light">
                  <LoaderHotelCompact />
                </div>
              </template>
              
              <template v-else>
                <div v-for="(hotel, index) in fromBooking.result" :key="index" :id="'hb-item-'+hotel.hotel_id" ref="hotelItems" class="hb-item hb-item-small bg-light uk-position-relative uk-margin-medium-bottom">
                
                  <div class="uk-grid-collapse" uk-grid>
                    <div class="hb-item-image uk-width-auto@s">
                      <div class="hb-item-more-image uk-position-relative">
                        <LazyWishlistButton v-if="!pending" :id="hotel.hotel_id" :name="hotel.hotel_name" :location="hotel.city ? hotel.city_trans+', '+hotel.country_trans : location.title" :address="hotel.address" :price="hotel.composite_price_breakdown.gross_amount_per_night.currency+' '+hotel.composite_price_breakdown.gross_amount_per_night.value.toFixed(0)" :stars="hotel.class" :score="hotel.review_score ? hotel.review_score+' '+hotel.review_score_word : ''" :url="hotel.url+'?aid='+aid+''" :image="webpImage(hotel.main_photo_url)" />
                        <nuxt-img :src="webpImage(hotel.main_photo_url)" :alt="hotel.hotel_name" width="250" height="285" loading="lazy" format="webp" placeholder />
                      </div>

                      <LazyHotelMoreImages v-if="hotel_id == hotel.hotel_id" :location="location.title" :hotel="hotel.hotel_id" :hotelName="hotel.hotel_name" :hotelLink="hotel.url+'?aid='+aid+''" :hotelStars="hotel.class"/>
                    </div>

                    <div class="hb-item-info uk-width-expand@s">
                      
                      <NuxtLink :to="hotel.url+'?aid='+aid+''" target="_blank" class="link-with-arrow">
                        <h3 class="hb-item-title fs-l">{{hotel.hotel_name}}</h3>
                      </NuxtLink>

                      <div class="hb-item-description">
                        <p class="uk-margin-remove-bottom">
                          <LazyHotelShortInfo v-if="!pending" :index="index" :hotel="hotel.hotel_name" :stars="hotel.class" :address="hotel.address" :distances="hotel.distances" :review_word="hotel.review_score_word" :review_score="hotel.review_score" :review_nr="hotel.review_nr" />
                        </p>
                        <NuxtLink :href="'#hb-item-'+hotel.hotel_id" @click="showMore(hotel.hotel_id), updateExpanded(index)" class="hb-more-open color-black fw-medium uk-margin-right uk-flex-inline uk-flex-middle uk-margin-small-top" :uk-toggle="'target: #hb-item-'+hotel.hotel_id+', '+lastOpened+'; cls: expanded'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down lh-svg">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                          Show more details
                        </NuxtLink>

                        <a href="#searchHotels" @click="openCalendar()" class="hb-set-dates color-black fw-medium uk-flex-inline uk-flex-middle uk-margin-small-top">
                          <svg viewBox="0 0 24 24" width="18" height="16" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down lh-svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Set dates
                        </a>
                      </div>

                      <div class="hb-item-bottom uk-flex uk-flex-between uk-margin-top">
                        <template v-if="setDatesAction == true">
                          <LazyHotelTotalStay :unit="hotel.unit_configuration_label" :hotel_link="hotel.url" :checkin="searchCheckin" :checkout="searchCheckout" :guests="searchGuests" :old_price="hotel.composite_price_breakdown ? hotel.composite_price_breakdown.strikethrough_amount : ''" :total_price="hotel.composite_price_breakdown ? hotel.composite_price_breakdown.gross_amount : ''" />
                        </template>
                        <template v-else>
                          <LazyHotelMeta :is_beach_front="hotel.is_beach_front" :is_city_center="hotel.is_city_center" :stars="hotel.class" :review_score="hotel.review_score" :review_word="hotel.review_score_word" :price="hotel.composite_price_breakdown" />
                          <NuxtLink :to="hotel.url+'?aid='+aid+''" target="_blank" class="uk-button uk-button-primary button-small" title="Check Available rooms">Available rooms</NuxtLink>
                        </template>
                      </div>

                      <ClientOnly v-if="hotel_id == hotel.hotel_id">
                        <div class="hb-item-more uk-margin-top">
                          <LazyHotelMoreInfo :hotel="hotel.hotel_id" :cancellable="hotel.is_free_cancellable" />
                          <LazyHotelMoreMeta :hotel_id="hotel.hotel_id" />

                          <div class="hb-more-action uk-text-center uk-margin-medium-top">
                            <NuxtLink :to="hotel.url+'?aid='+aid+''" target="_blank" class="arrowed-btn uk-button uk-button-primary use-transition">
                              See available rooms and details
                            </NuxtLink>
                          </div>
                
                          <button @click="resetExpanded()" type="button" class="hb-more-close color-dark-gray centrify bg-light uk-position-absolute" :uk-toggle="'target: #hb-item-'+hotel.hotel_id+'; cls: expanded'" uk-tooltip="Show less">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up lh-svg">
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </ClientOnly>
                      
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <template v-else>
              <p class="uk-padding-small bg-faded fw-medium">
                However, please check out these similar hotels.
              </p>
              <LazyBlockHotelsCarousel :locations="location.id" columns="3" />
            </template>

          </div>

          <div v-if="fromBooking" class="hb-pagination uk-center">
            <pagination v-model="pageNumber" :records="fromBooking.total_count_with_filters" :per-page="20" :options="paginationOptions" @paginate="usePagination()" />
          </div>
          
        </div>
        
        <div class="uk-width-1-4@m">
          <aside class="page-sidebar use-transition uk-position-sticky">
            <SidebarAuthor :author="location.author" :date="location.date_updated" starter="List by"/>
            <SidebarAffiliateDisclosure />
            <SidebarRelatedLocations :location="location.title" :location_id="location.id" :location_parent="parentID" :parent_name="parentName" />
            <SidebarRelatedTypes :location="location.title" :location_slug="location.slug" />
            <SidebarRelatedGuides :location="location.title" :location_id="location.id" />
          </aside>
        </div>
      </div>

    </main>

    <LazyOffcanvasHotelGallery />
    <LazyFooterMain />
  </div>

</template>

<script setup>

  // Import UIkit
  // import UIkit from 'uikit'

  // Import modules
  import { ContentLoader } from 'vue-content-loader'
  import Pagination from 'v-pagination-3'

  // Define the API settings
  const config = useRuntimeConfig()
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Set the Booking AID
  const aid = await bookingAID()

  // Get started
  const { getItems } = useDirectusItems();
  const route = useRoute().params;
  const routeQuery = useRoute().query;
  const slugLength = route.slug.length - 1;
  const slugLast = ref()
  const typeSlugs = ['sustainable', 'private-pools', 'family-friendly', 'multi-bedroom', '5-star']
  const paginationOptions = { chunk: 8 }

  // Set the slug
  const theSlug = ref('')
  const locType = ref('location')

  if(route.slug[slugLength].length < 1) {
    slugLast.value = slugLength - 1
  } else {
    slugLast.value = slugLength
  }

  // Check if the slug includes type
  if( typeSlugs.includes(route.slug[slugLast.value]) ) {
    locType.value = 'specific'
    theSlug.value = route.slug[slugLast.value - 1]
  } else {
    theSlug.value = route.slug[slugLast.value]
  }

  // Define the basics
  const layout = 'compact'
  const pageNumber = ref(1)

  // Get the data
  const theLocation = await getItems({
    collection: 'location',
    params: {
      filter: {
        'status': 'published',
        'slug': {
          '_eq': theSlug.value
        }
      },
      fields: ['id', 'slug', 'date_created', 'date_updated', 'title', 'type', 'booking_id', 'image_url', 'parent.id', 'parent.title', 'parent.slug', 'content', 'author.first_name', 'author.last_name', 'author.avatar', 'author.description' ],
    }
  });

  // Set the location
  const location = theLocation[0];

  // Check for the page
  if (!location) {
    await navigateTo('/destinations/', { redirectCode: 301 })
  }

  // Check if have a parent location
  const parentID = ref('')
  const parentName = ref('')
  const parentSlug = ref('')
  if( location.parent ) {
    parentID.value = location.parent.id
    parentName.value = location.parent.title
    parentSlug.value = '/in/'+location.parent.slug

    // Handle the wrong navitaion slug
    if( route.slug[0] !== location.parent.slug ) {
      await navigateTo('/in/'+location.parent.slug+'/'+location.slug+'/')
    }
  }

  // Set the Booking details
  const bookingID = ref('')
  const bookingOrderby = ref('class_descending')
  const locationType = ref('')
  const defLanguage = ref('en-gb')
  const defCurrency = ref('USD')

  // Set the location params
  if ( location ) {
    bookingID.value = location.booking_id
    locationType.value = location.type
  }

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
  const headTitle = ref('Luxury Hotels - 5 Star Hotels')
  const headDescription = ref('Discover the best 5 star luxury hotels. LuxuryHotel.com has searched for the most luxurious hotels.')
  const locationTitle = ref('Luxury Hotels')
  const locationSubtitle = ref('best hotel deals')
  const reqID = ref('fromBooking-'+bookingID.value+'')
  const filter_ids = ref('class::4,class::5,property_type::204,property_type::206,property_type::213')
  const searchGuests = ref('2')
  const searchCheckin = ref(setTheDate(60))
  const searchCheckout = ref(setTheDate(65))
  const urlSearch = routeQuery.search ? routeQuery.search : false
  const urlCheckin = routeQuery.checkin ? routeQuery.checkin : ''
  const urlCheckout = routeQuery.checkout ? routeQuery.checkout : ''
  const urlGuests = routeQuery.guests ? routeQuery.guests : ''

  // Search hotels function
  function findHotels(guests, checkin, checkout) {
    searchGuests.value = guests
    searchCheckin.value = checkin
    searchCheckout.value = checkout
    setDatesAction.value = true

    refresh()
  }

  // Set dates action
  const setDatesAction = ref('')
  if( urlSearch == 'true' ) {
    setDatesAction.value = true
    // onMounted(() => {
    //   setTimeout(() => {
    //     document.getElementById('hgb').scrollIntoView()
    //   }, 300)
    // })
  }

  // Build category filters
  if( location ) {
    headTitle.value = location.title + ' Luxury Hotels - 5 Star Hotels'
    headDescription.value = 'Discover the best '+location.title+' 5 star luxury hotels. LuxuryHotel.com has searched for the most luxurious hotels in '+location.title+'.'
  }
  if( route.slug[slugLast.value] == 'sustainable' ) {
    headTitle.value = location.title + ' Sustainable Hotels'
    locationTitle.value = 'Sustainable Hotels'
    locationSubtitle.value = 'best sustainable hotels'
    reqID.value += '-sustainable'
    filter_ids.value += ',facility::182'
  }
  if( route.slug[slugLast.value] == 'private-pools' ) {
    headTitle.value = location.title + ' Luxury Hotels with Private Pools'
    locationTitle.value = 'Hotels with Private Pools'
    locationSubtitle.value = 'best hotels with private pools'
    reqID.value += '-private-pools'
    filter_ids.value += ',room_facility::93'
  }
  if( route.slug[slugLast.value] == 'family-friendly' ) {
    headTitle.value = location.title + ' Family Friendly Luxury Hotels'
    locationTitle.value = 'Family Friendly Hotels'
    locationSubtitle.value = 'family friendly hotel ideas'
    reqID.value += '-family-friendly'
    filter_ids.value += ',facility::28'
  }
  if( route.slug[slugLast.value] == 'multi-bedroom' ) {
    headTitle.value = location.title + ' Multi-Bedroom Luxury Hotels'
    locationTitle.value = 'Multi-Bedroom Hotels'
    locationSubtitle.value = 'multi-bedroom hotel deals'
    reqID.value += '-multi-bedroom'
    filter_ids.value = 'class::4,class::5,property_type::201,property_type::206'
  }
  if( route.slug[slugLast.value] == '5-star' ) {
    headTitle.value = location.title + ' Five-star Luxury Hotels'
    locationTitle.value = 'Five-star Hotels'
    locationSubtitle.value = 'five-star hotel deals'
    reqID.value += '-five-star'
    filter_ids.value = 'class::5'
  }

  // Get the hotels from Booking's API
  const { pending, data: fromBooking, refresh } = await useAsyncData(
    ''+reqID.value+'',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/search', {
      params: {
        checkin_date: urlCheckin ? urlCheckin : searchCheckin.value,
        checkout_date: urlCheckout ? urlCheckout : searchCheckout.value,
        adults_number: urlGuests ? urlGuests : searchGuests.value,
        children_number: '1',
        children_ages: '0',
        room_number: '1',
        dest_id: bookingID.value,
        dest_type: locationType.value,
        locale: defLanguage.value,
        filter_by_currency: defCurrency.value,
        order_by: bookingOrderby.value,
        categories_filter_ids: filter_ids.value,
        include_adjacency: 'true',
        units: 'metric',
        page_number: pageNumber.value ? pageNumber.value - 1 : 0,
      },
      headers: {
        'X-RapidAPI-Key': RA_KEY,
        'X-RapidAPI-Host': RA_HOST
      }
    }
  ))

  // Definte the pagination function
  function usePagination() {
    document.getElementById('hgb').scrollIntoView()
    refresh()
  }

  // Define the location type word
  const mergingWord = ref('in')
  if( location && location.type == 'landmark' ) {
    mergingWord.value = 'near'
  }

  // Toggle the expanded class
  const hotelItems = ref([])
  const lastOpened = ref('#q1w2e3r4t5y')
  function updateExpanded(index) {
    setTimeout(() => {
      lastOpened.value = '#'+hotelItems.value[index].id
    }, 600)
  }

  // Clear the last opened when close
  function resetExpanded() {
    lastOpened.value = '#q1w2e3r4t5y'
  }

  // Show the detailed information for the hotel
  const hotel_id = ref('hotel_id')
  function showMore( hotel ) {
    hotel_id.value = hotel
  }

  // Define the hotels sorting by the API
  function sortBy(sorter) {
    bookingOrderby.value = sorter
    console.log(bookingOrderby.value)
    refresh()
  }

  // Check the number of pages
  function paginationPages(pages) {
    let range = [];
    let min = 1
    let max = Math.ceil(pages / 20)
    for (let i = min; i <= max; i++) {
      range.push(i);
    }

    return range;
  }

  // Provide Webp images
  function webpImage(image) {
    let finalImage = image.replace('square60', 'square300')
    return finalImage.replace('jpg', 'webp')
  }

  // Set the date buttons
  const calendar = ref();
  function openCalendar() {
    let datepicker = calendar.value.$refs.datepicker
    datepicker.openMenu()
  }

  // Set the hotels number
  const hotelsNum = fromBooking.value.total_count_with_filters ? fromBooking.value.total_count_with_filters : '100+'
  const seoTitle = hotelsNum+' '+headTitle.value+' '+mergingWord.value+' '+location.title

  // Set the SEO meta
  useHead({
    title: seoTitle,
    link: [
      { rel: 'canonical', href: config.FRONT_URL + useRoute().fullPath, },
    ],
    meta: [
      { name: 'description', content: headDescription.value },
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: headDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: config.FRONT_URL + useRoute().fullPath },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'LuxuryHotel' },
      { property: 'og:image', content: location.image_url ? location.image_url : '/img/lh_facebook.jpg' },
      { property: 'og:image:alt', content: seoTitle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@luxuryhotelcom' },
      { name: 'twitter:title', content: seoTitle },
      { name: 'twitter:description', content: headDescription.value },
      { name: 'twitter:image', content: location.image_url ? location.image_url : '/img/lh_twitter.jpg' },
      { name: 'twitter:image:alt', content: seoTitle },
      { name: 'twitter:creator', content: '@luxuryhotelcom' },
    ]
  });

  // Create the JSON LD Schema
  useJsonld({
    '@id': `${config.FRONT_URL}#webpage`,
    '@type': 'WebPage',
    'description': headDescription.value,
    'name': seoTitle,
    'url': config.FRONT_URL + route.fullPath,
    'datePublished': location.date_created,
    'dateModified': location.date_updated,
    'inLanguage': 'en-US',
    'about': {
      '@id': `${config.FRONT_URL}/#identity`
    },
    'isPartOf': {
      '@id': `${config.FRONT_URL}/#website`
    },
    'breadcrumb': {
      '@id': `${config.FRONT_URL}/#breadcrumbs`
    },
    'potentialAction': [
      {
        '@type': 'ReadAction',
        'target': [ config.FRONT_URL + route.fullPath ]
      }
    ],
  });

</script>

<style>
  .location-content {
    min-height: 400px;
  }
  .location-hero {
    min-height: 380px;
    padding: 60px 0;
    background: linear-gradient(180deg,rgba(233,237,240,.85) 60%,hsla(0,0%,100%,.5));
  }
  .hero-background {
    object-fit: cover;
    width: 80%;
    height: 100%;
    z-index: 0;
  }
  .location-content {
    padding-top: 30px;
  }
  #content-main .page-sidebar.uk-position-sticky,
  #content-main .hotel-review-amenities {
    top: 0px;
  }
  header.uk-sticky-fixed ~ #content-main .page-sidebar.uk-position-sticky,
  header.uk-sticky-fixed ~ #content-main .hotel-review-amenities {
    top: 90px !important;
  }
  .page-sidebar > *:not(:last-child) {
    margin-bottom: 40px;
  }
  .page-content:not(.content-with-sidebar) {
    margin: 60px auto !important;
  }
  ul.sidebar-navigation li a.activeLink {
    color: var(--primary);
  }
  ul.sidebar-navigation li a:not(.sidebar-list-expand) {
    position: relative;
    display: inline-block;
  }
  ul.sidebar-navigation:not(.sidebar-types) li a:not(.sidebar-list-expand):after {
    content: url("data:image/svg+xml,%3Csvg width='17' height='11' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6H16.7143' stroke='%233AAFA9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.8066 1L16.8066 6L11.8066 11' stroke='%233AAFA9' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    position: absolute;
    left: 100%;
    top: 0px;
    opacity: 0;
    visibility: hidden;
    -moz-transition: all .1s linear;
    -webkit-transition: all .1s linear;
    transition: all .1s linear;
    transition-delay: .2s;
  }
  ul.sidebar-navigation li a:not(.sidebar-list-expand):hover:after {
    opacity: 1;
    visibility: visible;
    left: calc(100% + 8px);
  }
  .page-sidebar .sidebar-guides .guides-grid-item .guides-item-link {
    height: 150px;
  }
  .location-custom-content {
    margin-top: 80px;
  }
  .location-custom-content:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 60px;
    background: var(--light);
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  }
  /* Hotel block - horizontal */
  .hb-item .hb-item-more,
  .hb-item.expanded .hb-more-open {
    display: none;
  }
  .hb-item.expanded .hb-item-more {
    display: block;
  }
  .hb-item-info .hb-item-more {
    min-height: 300px;
  }
  .hb-meta-horizontal {
    gap: 16px;
    border-top: 1px solid var(--light-gray);
    border-bottom: 1px solid transparent;
    padding-top: 20px;
    padding-bottom: 0px;
    padding-left: 0;
  }
  .hb-item-image {
    width: 250px;
  }
  .hb-item-small .hb-item-info {
    padding: 30px;
  }
  .hb-item-more-image {
    height: 100%;
    width: 100%;
  }
  .hb-item.expanded .hb-item-more-image {
    height: 285px;
  }
  .hb-item-more .hb-item-more-image {
    height: 250px;
  }
  .hb-item-more-image img {
    object-fit: cover;
    height: 100%;
  }
  .hb-item.expanded .hb-meta-horizontal {
    width: 100%;
    border-bottom: 1px solid var(--light-gray);
    padding-bottom: 20px;
  }
  .hb-item.expanded .button-small {
    display: none;
  }
  .hb-meta-horizontal .sb-hotel-meta-icon {
    margin-right: 8px;
    line-height: 1;
  }
  .hb-item-small .hb-item-description {
    min-height: 110px;
  }
  .hb-item.expanded .hb-set-dates {
    display: none;
  }
  .hb-item-small.expanded .hb-item-description {
    min-height: unset;
  }
  /* Hotels */
  .hgb-action > a {
    border: 1px solid var(--light-gray);
    width: 40px;
    height: 40px;
  }
  .hgb-action > *:not(:last-child) {
    margin-right: 10px;
  }
  .hgb-action > a.active,
  .hgb-action > a:hover {
    color: var(--dark);
    background: var(--faded);
  }
  .hb-item-gallery {
    overflow: hidden;
  }
  .hb-item-gallery:hover img {
    transform: scale(1.05);
  }
  ul.hb-meta li:not(:last-child) {
    margin-bottom: 20px;
  }
  ul.hb-meta li strong {
    color: var(--dark);
    margin-left: 5px;
  }
  .hb-more-close {
    top: calc(100% - 20px);
    right: 20px;
    width: 40px;
    height: 40px;
    border: 1px solid var(--light-gray);
    z-index: 1;
  }
  .hb-more-open,
  .hb-set-dates {
    gap: 6px;
  }
  .hb-pagination-slider {
    max-width: 400px;
    margin: 0 auto;
  }
  .hb-pagination li a,
  .hb-pagination li button {
    width: 26px;
    background: none;
    border: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 500;
    color: var(--dark);
  }
  .hb-pagination li .active {
    width: 34px;
    height: 34px;
    background: var(--dark);
    border-radius: 100%;
    color: var(--white);
  }
  .hb-pagination ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .hb-pagination ul li {
    margin: 0 5px;
  }
  .hb-pagination .VuePagination__count {
    text-align: center;
    font-size: 13px;
    font-weight: 300;
  }
  .hb-pagination .VuePagination__pagination-item-prev-page button,
  .hb-pagination .VuePagination__pagination-item-next-page button {
    font-size: 0;
    width: 34px;
    height: 34px;
  }
  .hb-pagination .VuePagination__pagination-item-next-page button {
    background: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline fill='none' stroke='%23000' stroke-width='1.2' points='1 1 6 6 1 11'%3E%3C/polyline%3E%3C/svg%3E") no-repeat center;
  }
  .hb-pagination .VuePagination__pagination-item-prev-page button {
    background: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline fill='none' stroke='%23000' stroke-width='1.2' points='6 1 1 6 6 11'%3E%3C/polyline%3E%3C/svg%3E") no-repeat center;
  }
  .hb-pagination .VuePagination__pagination-item-prev-page.disabled button {
    opacity: .25;
  }
  .hb-pagination .VuePagination__pagination-item-next-chunk,
  .hb-pagination .VuePagination__pagination-item-prev-chunk {
    display: none;
  }
  #offcanvasSearch {
    z-index: 99;
  }
  #offcanvasSearch .search-box {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 1200px) {
    .hb-item-title {
      font-size: 20px;
    }
    .hb-item-bottom {
      flex-flow: column;
      gap: 20px;
    }
    .location-content {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  @media only screen and (max-width: 1080px) {
    .hb-item-more-image {
      height: 250px;
      width: 100%;
    }
  }
  @media only screen and (max-width: 1080px) and (min-width: 600px) {
    .hb-item-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: 30px;
    }
    .hb-item.hb-item-small {
      padding-bottom: 160px;
    }
    .hb-item.hb-item-small.expanded {
      padding-bottom: 100px;
    }
    .hb-item-bottom > ul {
      padding-left: 30px;
      padding-right: 30px;
    }
    .hb-item-bottom > a {
      margin-left: 30px;
      margin-right: 30px;
    }
    .hb-item.expanded .hb-meta-horizontal {
      width: auto;
      border-bottom: none;
      padding-bottom: 0;
    }
    .hotel-total-stay-link {
      max-width: calc(100% - 60px);
    }
  }
  @media only screen and (max-width: 600px) {
    .shaped-bgr {
      padding: 40px 0 20px;
    }
    .location-custom-content {
      margin-top: 0px;
    }
    .hb-item-image,
    .hb-item-more-image img {
      width: 100%;
    }
    .hb-more-action > a {
      padding: 0;
      width: 100%;
      margin-bottom: 20px;
    }
    .hb-meta-horizontal {
      flex-flow: column;
      align-items: flex-start;
    }
    .hb-item-small .hb-item-info {
      font-size: 14px;
      padding: 22px;
    }
  }
</style>