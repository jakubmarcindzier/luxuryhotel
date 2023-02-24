// Fetch from Booking API
export default defineEventHandler(async (event) => {

  // Set the url query
  const query = getQuery(event)

  // Get the runtime config
  const config = useRuntimeConfig()

  const bookingData = await $fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
    params: {
      locale: 'en-gb',
      name: query.location
    },
    headers: {
      'X-RapidAPI-Key': config.RAPIDAPI_KEY,
      'X-RapidAPI-Host': config.RAPIDAPI_HOST
    }
  })

  let bookingLocation = []

  // Get the location
  let location = ''
  if( bookingData ) {
    bookingLocation = [bookingData]
    location = bookingLocation[0].filter(items => items.dest_type == query.type)[0]
  }

  return location
})