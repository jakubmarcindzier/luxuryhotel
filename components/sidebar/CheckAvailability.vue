<template>
  <div id="check-availability" class="bg-faded uk-padding">
    <h4 class="fs-l">Check Availability for <span class="highlighted-text">{{props.hotelName}}</span></h4>
    
    <hr>

    <div class="avaibalility-form">
      
      <div class="uk-margin-bottom">
        <p class="color-dark fs-xs fw-medium uk-margin-small-bottom">Check-In</p>
        <ClientOnly>
          <Datepicker v-model="date" :minDate="new Date()" range multiCalendars autoApply :enableTimePicker="false" :format="formatStartPretty" :transitions="false" :clearable="false" @update:modelValue="setDates" />
        </ClientOnly>
      </div>

      <div class="uk-margin-bottom">
        <p class="color-dark fs-xs fw-medium uk-margin-small-bottom">Check-Out</p>
        <ClientOnly>
          <Datepicker v-model="date" range multiCalendars autoApply :enableTimePicker="false" :format="formatEndPretty" :transitions="false" :clearable="false" @update:modelValue="setDates" />
        </ClientOnly>
      </div>

      <div class="avalability-nums uk-flex uk-flex-between">
        <div class="availability-guests uk-margin-bottom">
          <p class="color-dark fs-xs fw-medium uk-margin-small-bottom">Guests</p>
          <div class="plusminus uk-flex uk-flex-row uk-flex-between">
            <span @click="minusGuests" class="fs-m uk-flex uk-flex-middle uk-flex-center uk-border-pill">-</span>
            <input type="number" v-model="guests" class="uk-search-input uk-border-rounded bg-transparent" />
            <span @click="plusGuests" class="fs-m uk-flex uk-flex-middle uk-flex-center uk-border-pill">+</span>
          </div>
        </div>

        <div class="availability-rooms uk-margin-small-bottom">
          <p class="color-dark fs-xs fw-medium uk-margin-small-bottom">Rooms</p>
          <div class="plusminus uk-flex uk-flex-row uk-flex-between">
            <span @click="minusRooms" class="fs-m uk-flex uk-flex-middle uk-flex-center uk-border-pill">-</span>
            <input type="number" v-model="rooms" class="uk-search-input uk-border-rounded bg-transparent" />
            <span @click="plusRooms" class="fs-m uk-flex uk-flex-middle uk-flex-center uk-border-pill">+</span>
          </div>
        </div>
      </div>

      <div class="uk-margin-top">
        <NuxtLink :to="hotelOnBooking(props.hotelID, props.hotelName)" target="_blank" class="availability-action uk-button uk-button-primary uk-width-1-1@s fs-xxs">Check Availability</NuxtLink>
      </div>
      
    </div>

  </div>
</template>

<script setup>

  // Import library
  import Datepicker from '@vuepic/vue-datepicker';
  // import '@vuepic/vue-datepicker/dist/main.css'

  // Set the props
  const props = defineProps(['hotelID', 'hotelName', 'hotelPrice'])

  // Set the Booking AID
  const aid = await bookingAID()

  // Set the emits
  const emits = defineEmits(['updateSearch'])

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
  const rooms = ref('1')
  const children = ref('')
  const checkin = ref(setTheDate(20));
  const checkout = ref(setTheDate(25));

  // Define the dates
  const today = new Date();
  const date = ref();
  const startDate = checkin.value;
  const endDate = checkout.value;
  date.value = [startDate, endDate];

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
  function minusGuests(){
    if(guests.value > 1) {
      guests.value--
    }
  }
  // Plus guests
  function plusGuests() {
    guests.value++
  }

  // Minus rooms
  function minusRooms(){
    if(rooms.value > 1) {
      rooms.value--
    }
  }
  // Plus rooms
  function plusRooms() {
    rooms.value++
  }

  // Generate the hotel link to Booking.com based on id or title
  function hotelOnBooking(booking_id, title) {
    let link = ''
    if( booking_id ) {
      link = 'https://www.booking.com/searchresults.html?dest_type=hotel&dest_id='+booking_id+'&aid='+aid+'&checkin='+checkin.value+'&checkout='+checkout.value+'&no_rooms='+rooms.value+'&group_adults='+guests.value+'&group_children=0'
    } else {
      link = 'https://www.booking.com/searchresults.html?aid='+aid+'&ss='+title+'&checkin='+checkin.value+'&checkout='+checkout.value+'&no_rooms='+guests.value+'&group_adults='+rooms.value+'&group_children=0'
    }

    return link
  }

</script>

<style>
  .plusminus > span {
    width: 30px;
    height: 30px;
    align-items: center;
    background: var(--faded);
    cursor: pointer;
  }
</style>