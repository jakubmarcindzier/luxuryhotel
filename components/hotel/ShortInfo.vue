<template>
  {{line_1}}.
  {{line_2}}.
</template>

<script setup>

  // Set the props
  const props = defineProps([ 'index', 'hotel', 'stars', 'address', 'distances', 'review_word', 'review_score', 'review_nr' ])

  // Set random strings
  const randoms = [
    'The luxorious '+props.hotel+'',
    'This great stay',
    'The beautiful '+props.hotel+'',
    'Luxorious and elegant, the '+props.hotel+'',
    'Elegant and stylish, the '+props.hotel+'',
    'Providing a great value, the '+props.hotel+'',
    'The elegant '+props.hotel+'',
    'One of my favorites, the '+props.hotel+'',
    'Providing a relaxing stay, the '+props.hotel+'',
    'The gorgeous '+props.hotel+'',
    'Providing one of the best stays, the hotel',
  ];


  let thisIndex = props.index

  if( thisIndex >= randoms.length ) {
    thisIndex = thisIndex - randoms.length
  }

  if( thisIndex >= randoms.length ) {
    thisIndex = thisIndex - randoms.length
  }

  // Set the starter strings
  const starter = randoms[thisIndex];

  let line_1 = starter+' is'
  let line_2 = ''

  // Build line 1 of the text
  if( props.stars ) {
    line_1 += ' a '+props.stars+' star hotel'
  }
  if( props.address ) {
    line_1 += ' located at '+props.address
  }
  if( props.distances ) {
    line_1 += ' in '+locationText(props.distances)
  }

  // Build line 2 of the text
  if( props.review_score ) {
    line_2 += 'The hotel is rated as '+props.review_word+' with score of '+props.review_score
  }
  if( props.review_nr ) {
    line_2 += ', based on '+props.review_nr+' hotel reviews'
  }

  // Build distance texts
  function locationText( text ) {

    let output = ''
    let filtered = text.filter(obj => {
      return obj.icon_name !== 'bui_clean'
    })

    if( filtered.length ) {
      output = filtered.map(a => a.text).join(', ');
    }

    return output
  }

  // Build the cleanliness text
  function getCleanliness( text ) {

    let output = ''
    let filtered = text.filter(obj => {
      return obj.icon_name === 'bui_clean'
    })

    if( filtered.length ) {
      output = filtered[0]['text']
    }

    return output
  }

</script>