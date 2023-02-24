<template>
  <div id="searchHotels" class="uk-margin-bottom">
    <div :class="props.use_location == 'yes' ? 'with-location' : 'without-location'" class="location-hero-search search-box uk-position-relative uk-flex uk-flex-middle uk-flex-between uk-align-center uk-margin-remove-bottom">

      <div v-if="props.use_location == 'yes'" class="search-box-item search-location uk-position-relative use-transition">
        <div @click="focusFilter()" class="search-item-trigger uk-flex uk-flex-middle uk-height-1-1" uk-toggle="target: #searchLocations">
          <div class="search-box-icon bg-faded uk-border-pill uk-flex-inline uk-flex-middle uk-flex-center">
            <nuxt-img src="/img/icons/map_marker.svg" width="17" height="19" loading="lazy" alt="Search hotel location" />
          </div>
          <div class="search-box-label fs-xs uk-flex uk-flex-column uk-text-left">
            <div class="search-box-sublabel fs-xxs opacity-50">Where</div>
            <div v-if="searchLocation.title" class="search-box-value fw-medium">{{searchLocation.title}}</div>
            <div v-else class="search-box-value fw-medium">Pick location</div>
          </div>
        </div>

        <div id="searchLocations" hidden>
          <div class="search-locations-holder search-box-hidden bg-white uk-flex uk-flex-column uk-flex-between uk-margin-small-top uk-box-shadow-large uk-padding-small uk-position-absolute uk-border-rounded uk-position-z-index">
            <input v-model="searchLocationsFilter" ref="inputLocationsFilter" type="text" class="search-location-filter uk-margin-bottom color-gray" placeholder="Search for location..." aria-label="Search hotel lications">
            <ul v-if="filteredLocations()" id="searchLocationsFilter" class="search-locations-list uk-list uk-text-left fs-xs">
              <li v-for="location in filteredLocations()" :key="location.id" @click="setSearchLocation(location.id, location.title, location.slug, location.parent)" uk-toggle="target: #searchLocations;" class="uk-flex uk-flex-column use-transition">
                <div class="search-location-name fw-medium">{{location.title}}</div>
                <div v-if="location.parent" class="search-location-parent fw-light">{{locationParent(location.parent)}}</div>
              </li>
            </ul>
          </div>
          <div class="search-box-hidden-ph uk-position-fixed uk-position-top uk-position-left uk-width-1-1 uk-height-1-1" uk-toggle="target: #searchLocations"></div>
        </div>
      </div>

      <div class="search-box-item search-guests uk-position-relative use-transition">
        <div type="button" class="search-item-trigger uk-flex uk-flex-middle uk-height-1-1" uk-toggle="target: #searchGuests">
          <div class="search-box-icon bg-faded uk-border-pill uk-flex-inline uk-flex-middle uk-flex-center">
            <nuxt-img src="/img/icons/guests.svg" width="20" height="17" loading="lazy" alt="Search hotel guests" />
          </div>             
          <div class="search-box-label fs-xs uk-flex uk-flex-column uk-text-left">
            <div class="search-box-sublabel fs-xxs opacity-50">Who</div>
            <div class="search-box-value fw-medium">{{guests}} guests</div>
          </div>
        </div>

        <div id="searchGuests" hidden>
          <div class="plusminus search-box-hidden bg-white uk-flex uk-flex-row uk-flex-between uk-margin-small-top uk-box-shadow-large uk-padding-small uk-position-absolute uk-border-rounded uk-position-z-index">
            <div @click="minus()" class="fs-m bg-slate uk-flex uk-flex-middle uk-flex-center uk-border-pill">-</div>
            <input type="number" v-model="guests" class="uk-search-input uk-border-rounded" min="1" max="10" aria-label="Search hotel guests"/>
            <div @click="plus()" class="fs-m bg-slate uk-flex uk-flex-middle uk-flex-center uk-border-pill">+</div>
          </div>
          <div class="search-box-hidden-ph uk-position-fixed uk-position-top uk-position-left uk-width-1-1 uk-height-1-1" uk-toggle="target: #searchGuests"></div>
        </div>
      </div>

      <div class="search-box-item search-checkin uk-position-relative use-transition">
        <div class="search-item-trigger uk-flex uk-flex-middle uk-height-1-1">
          <div class="search-box-icon bg-faded uk-border-pill uk-flex-inline uk-flex-middle uk-flex-center">
            <nuxt-img src="/img/icons/calendar.svg" width="15" height="17" loading="lazy" alt="Search hotel check-in" />
          </div>             
          <div class="search-box-label fs-xs uk-flex uk-flex-column uk-text-left">
            <div class="search-box-sublabel fs-xxs opacity-50">Check-In</div>
            <div class="search-box-value">
              <Datepicker v-model="date" ref="datepicker" :minDate="new Date()" range multiCalendars autoApply hideInputIcon :enableTimePicker="false" :format="formatStartPretty" :transitions="false" :clearable="false" @update:modelValue="setDates" />
            </div>
          </div>
        </div>
      </div>

      <div class="search-box-item search-checkout uk-position-relative use-transition">
        <div class="search-item-trigger uk-flex uk-flex-middle uk-height-1-1">
          <div class="search-box-icon bg-faded uk-border-pill uk-flex-inline uk-flex-middle uk-flex-center">
            <nuxt-img src="/img/icons/calendar.svg" width="15" height="17" loading="lazy" alt="Search hotel check-out" />
          </div>             
          <div class="search-box-label fs-xs uk-flex uk-flex-column uk-text-left">
            <div class="search-box-sublabel fs-xxs opacity-50">Check-Out</div>
            <div class="search-box-value">
              <Datepicker v-model="date" range multiCalendars autoApply hideInputIcon :enableTimePicker="false" :format="formatEndPretty" :transitions="false" :clearable="false" @update:modelValue="setDates" />
            </div>
          </div>
        </div>
      </div>

      <NuxtLink v-if="props.use_location == 'yes'" @click="navigateToDestination(searchLocation.id, searchLocation.slug, searchLocation.parent)" :class="searchLocation ? 'location-picked' : 'no-location'" class="search-action centrify bg-primary color-white use-transition">
        Search
        <nuxt-img src="/img/icons/search_light.svg" width="20" height="20" loading="lazy" placeholder alt="Search hotel now" />
      </NuxtLink>

      <NuxtLink v-else to="#hgb" @click="$emit('updateSearch', guests, checkin, checkout)" class="search-action centrify bg-primary color-white use-transition">
        Search
        <nuxt-img src="/img/icons/search_light.svg" width="20" height="20" loading="lazy" placeholder alt="Search hotel now" />
      </NuxtLink>
    </div>
  </div>

</template>

<script setup>

  // Import libraries
  const Datepicker = defineAsyncComponent(() =>
    import('@vuepic/vue-datepicker')
  )
  // import Datepicker from '@vuepic/vue-datepicker';

  // Set the props
  const props = defineProps(['use_location'])

  // Set the emits
  const emits = defineEmits(['updateSearch'])

  // Get started
  const { getItems, getItemById } = useDirectusItems();
  const routeQuery = useRoute().query;

  // Get today and set the date + value
  function setTheDate( days ) {

    // Start by getting today
    let d = new Date();

    // Add more days
    d.setDate( d.getDate() + days );

    return new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      )
    ).toISOString().slice(0, 10);
  }
  
  // Define the variables
  const guests = ref('2')
  const checkin = ref(setTheDate(60))
  const checkout = ref(setTheDate(65))
  const searchLocation = ref('')

  // Get the url parameters
  const urlCheckin = routeQuery.checkin ? routeQuery.checkin : ''
  const urlCheckout = routeQuery.checkout ? routeQuery.checkout : ''
  const urlGuests = routeQuery.guests ? routeQuery.guests : ''

  // Update search models from the URL
  if( urlGuests ) {
    guests.value = urlGuests
  }
  if( urlCheckin ) {
    checkin.value = urlCheckin
  }
  if( urlCheckout ) {
    checkout.value = urlCheckout
  }

  // Define the dates
  const today = new Date();
  const date = ref();
  const startDate = checkin.value;
  const endDate = checkout.value;
  date.value = [checkin.value, checkout.value];

  // Format dates to match the API calls
  const formatStart = ([startDate, endDate]) => {
    return new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    ).toISOString().slice(0, 10);
  }
  const formatEnd = ([startDate, endDate]) => {
    return new Date(
      Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      )
    ).toISOString().slice(0, 10);
  }

  // Format dates to show only date and month
  const formatEndPretty = ([startDate, endDate]) => {
    let day = endDate.toLocaleString('default', { day: 'numeric' })
    let month = endDate.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }
  const formatStartPretty = ([startDate, endDate]) => {
    let day = startDate.toLocaleString('default', { day: 'numeric' })
    let month = startDate.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  const setDates = ( date)  => {
    checkin.value = formatStart(date)
    checkout.value = formatEnd(date)
  }

  // Minus guests
  function minus() {
    if(guests.value > 1) {
      guests.value--
    }
  }

  // Plus guests
  function plus() {
    guests.value++
  }

  // Get all the locations
  const allLocations = await getItems({
    collection: 'location',
    params: {
      filter: {
        'status': 'published'
      },
      fields: ['id', 'title', 'slug', 'parent'],
      sort: 'title',
      limit: -1,
    }
  });

  // Define the locations filter
  const searchLocationsFilter = ref('')
  const locations = ref('')
  const datepicker = ref(null)

  // Check for locations on the API
  if( allLocations ) {
    locations.value = allLocations
  } else {
    locations.value = 'No found locations'
  }

  // Filter locations based on the search
  function filteredLocations() {

    // Check for search strings
    let output = []
    if( searchLocationsFilter.value.length > 2 ) {
      output = locations.value.filter(item => {
        return item.title.toLowerCase().includes(searchLocationsFilter.value.toLowerCase())
      })
    } else {
      output = []
    }
    return output
  }

  // Get the location by id (for parents)
  function locationParent(parent) {
    let output = locations.value.filter(item => {
      return item.id == parent
    })

    if( output[0] ) {
      return output[0].title
    }
  }

  function groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
  }

  // Update the search location
  function setSearchLocation(id, name, slug, parent) {
    searchLocation.value = {
      id: id ? id : '',
      title: name ? name : '',
      slug: slug ? slug : '',
      parent: parent ? parent : '',
    }
  }

  // Navigate to the location
  async function navigateToDestination(id, slug, parent) {

    let parentLocation = ''
    let parentSlug = ''

    if( parent && id !== parent ) {
      parentLocation = await getItemById({
        id: parent,
        collection: 'location',
        params: {
          filter: {
            'status': 'published'
          },
        }
      })

      parentSlug = parentLocation.slug+'/'
    } else {
      parentLocation = ''
    }

    // Navigate to the link
    return navigateTo({
      path: '/in/'+ parentSlug + slug + '/',
      query: {
        search: true,
        guests: guests.value,
        checkin: checkin.value,
        checkout: checkout.value
      }
    })
  }

  // Focus the locations search on click
  const inputLocationsFilter = ref('')
  function focusFilter() {
    setTimeout(() => {
      inputLocationsFilter.value.focus()
    }, 100)
  }

</script>

<style>
  .search-box {
    height: 70px;
    background-color: var(--white);
    border-radius: 60px;
    padding-left: 10px;
    padding-right: 70px;
    gap: 10px;
  }
  .location-hero-search.with-location {
    max-width: 100%;
    margin-top: 70px;
    margin-bottom: 70px;
  }
  .search-box-item {
    height: 50px;
    width: 100%;
    line-height: 1;
    border-radius: 50px;
    cursor: pointer;
    padding: 0 5px;
    border: 1px solid var(--light-slate);
  }
  .search-box .search-action {
    position: absolute;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    font-size: 0px;
  }
  .search-item-trigger {
    gap: 10px;
  }
  .search-box-icon {
    min-width: 40px;
    height: 40px;
  }
  .search-box-item.search-location {
    min-width: 200px;
  }
  .search-box-item:not(.search-action):hover {
    background: var(--faded);
  }
  .search-box-label {
    margin-top: 3px;
  }
  .search-box-item.search-action {
    border: none;
    letter-spacing: 1px;
  }
  .search-box .search-box-hidden {
    width: calc(100% - 30px);
    top: calc(100% - 9px);
    left: 0;
  }
  .search-box .search-box-value {
    height: 18px;
    line-height: 18px;
  }
  .search-box .search-action:hover {
    background-color: #349c97;
  }
  .plusminus {
    gap: 10px;
  }
  .plusminus div {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .plusminus input {
    width: calc(100% - 80px);
    text-align: center;
  }
  .plusminus input::-webkit-outer-spin-button,
  .plusminus input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .plusminus input[type=number] {
    appearance: textfield;
  }
  .avalability-nums {
    gap: 30px;
  }
  .avalability-nums .plusminus {
    gap: 6px;
  }
  .avalability-nums .plusminus div {
    width: 26px;
    height: 26px;
    background: var(--placeholders);
  }
  .location-hero-search.without-location {
    max-width: 700px;
  }
  .search-locations-holder .search-locations-list {
    max-height: 300px;
    overflow-y: auto;
    margin: 0;
    line-height: 1.4;
  }
  .search-locations-list li:hover {
    color: var(--primary);
  }
  .search-locations-list li {
    position: relative;
    padding-left: 22px;
  }
  .search-locations-list li:before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='%23606B72' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E");
    position: absolute;
    left: 0;
    top: 3px;
    opacity: .9
  }
  .search-box .search-location-filter {
    height: 35px;
    border: none;
    border-bottom: 1px solid #e6e8ec;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' stroke='%23b0bec6' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: left;
    padding-left: 25px;
  }
  .search-box .search-location-filter:focus {
    outline: none;
  }
  .search-box .search-action.no-location {
    pointer-events: none;
  }

  /* Search Calendar */
  body .dp__menu {
    margin-top: 10px;
  }
  body .dp__input{
    font-family: 'Wotfard', 'Arial', sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    color: var(--dark-gray);
    border-color: var(--placeholders);
    background: none;
  }
  body .dp__active_date,
  body .dp__range_end,
  body .dp__range_start {
    background: var(--primary);
    border-radius: 100%;
  }
  body .dp__range_between {
    background: var(--faded);
    border-radius: 100%;
  }
  body .dp__calendar_wrap {
    font-family: 'Wotfard', 'Arial', sans-serif;
  }
  body .dp__calendar_item {
    color: var(--dark-gray);
    font-size: 13px;
    font-weight: 500;
  }
  body .dp__calendar_header {
    font-size: 13px;
    font-weight: 600;
  }
  body .dp__month_year_select {
    border-radius: 0;
    font-size: 14px;
  }
  body .dp__inner_nav svg {
    height: 15px;
  }
  body .dp__date_hover:hover,
  body .dp__date_hover_end:hover,
  body .dp__date_hover_start:hover {
    color: var(--white);
    background: var(--primary);
    border-radius: 100%;
  }
  .search-box .dp__input {
    border: none;
    padding: 0;
  }
  .avaibalility-form .dp__input {
    font-size: var(--font-size-xs);
    padding-top: 10px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 600px) {
    .search-box {
      flex-flow: column;
      height: auto;
      border-radius: 10px;
      padding: 20px;
      margin: 40px auto;
    }
    .search-box .search-action {
      position: relative;
      right: auto;
      width: 100%;
      border-radius: 30px;
      gap: 10px;
      font-size: inherit;
    }
    .location-hero-search.with-location {
      margin: 50px auto;
    }
  }
</style>