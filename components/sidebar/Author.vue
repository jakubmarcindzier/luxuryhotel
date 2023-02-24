<template>
  <div class="author-box">
    <div class="author-box-holder bg-light uk-text-center uk-padding">
      <nuxt-img v-if="author.avatar" :src="imageLink(author.avatar, 100, 100,)" class="uk-border-circle uk-margin-bottom" width="100" height="100" alt="Guide Author" />
      <nuxt-img v-else src="/img/author.webp" class="uk-border-circle uk-margin-bottom" width="100" height="100" alt="Guide Author" />
      <h3 v-if="props.starter" class="fs-m uk-margin-small-bottom">
        <NuxtLink to="/about/" class="color-black use-transition" aria-label="Author">{{props.starter}} {{author.first_name}} {{author.last_name}}</NuxtLink>
      </h3>
      <p v-if="author.description" class="fs-xs uk-margin-bottom uk-margin-remove-top">{{author.description}}</p>
      <p v-if="props.date" class="fs-xs uk-margin-remove-top uk-margin-remove-bottom opacity-75">Updated {{ dateUpdated(props.date) }}</p>
    </div>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['author', 'date', 'starter'])

  // Set the Date updated
  function dateUpdated( date ) {

    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let theDate = new Date(date).toLocaleDateString('en-US', options)

    return theDate
  }

</script>

<style>
  .author-box {
    padding-top: 80px;
  }
  .author-box img {
    margin-top: -100px;
    max-width: 100px;
    height: auto;
  }
</style>