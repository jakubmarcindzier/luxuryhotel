// Fetch from Booking API
export default defineEventHandler(async (event) => {

  // Set the url query
  const query = getQuery(event)

  // Get the runtime config
  const config = useRuntimeConfig()

  const bookingData = await $fetch('https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates', {
    params: {
      locale: 'en-gb',
      currency: query.currency
    },
    headers: {
      'X-RapidAPI-Key': config.RAPIDAPI_KEY,
      'X-RapidAPI-Host': config.RAPIDAPI_HOST
    }
  })

  let bookingCurrency = []

  // Get the location
  if( bookingData ) {
    bookingCurrency = bookingData.exchange_rates
  }

  return bookingCurrency
})