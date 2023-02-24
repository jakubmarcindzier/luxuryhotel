export async function bookingAID() {

  // Get started
  const { getItems } = useDirectusItems();

  // Get the Booking AID
  const options = await getItems({
    collection: 'options',
    params: {
      fields: ['booking_aid']
    }
  })

  // Output the Booking AID
  if( options.booking_aid ) {
    return options.booking_aid
  }

}