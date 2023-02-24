// Fetch from Booking API
export default defineEventHandler(async (event) => {

  // Set the url query
  const query = getQuery(event)

  // Get the runtime config
  const config = useRuntimeConfig()

  // Get today and set the date + value
  function setTheDate( days: number ) {
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
  const searchCheckin = setTheDate(60)
  const searchCheckout = setTheDate(65)

  // Search the Booking API for hotels
  const bookingData = await $fetch('https://booking-com.p.rapidapi.com/v1/hotels/search', {
    params: {
      checkin_date: searchCheckin,
      checkout_date: searchCheckout,
      units: 'metric',
      dest_id: query.location,
      dest_type: query.type,
      locale: 'en-gb',
      adults_number: '2',
      order_by: 'popularity',
      filter_by_currency: 'USD',
      room_number: '1',
      children_number: '1',
      page_number: '0',
      children_ages: '0',
      categories_filter_ids: 'class::4,class::5',
      include_adjacency: 'true'
    },
    headers: {
      'X-RapidAPI-Key': config.RAPIDAPI_KEY,
      'X-RapidAPI-Host': config.RAPIDAPI_HOST
    }
  })

  // Return the hotels
  if( bookingData ) {
    return bookingData.total_count_with_filters
  } else {
    return 0
  }
})