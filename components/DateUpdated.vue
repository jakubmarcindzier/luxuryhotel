<template>
  {{props.text}} {{ dateUpdated(props.date) }}
</template>

<script setup>

  // Set the props
  const props = defineProps(['date', 'text'])

  // Set the Date updated
  function dateUpdated( date ) {

    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let theDate = new Date(date).toLocaleDateString('en-US', options)

    return theDate
  }

</script>