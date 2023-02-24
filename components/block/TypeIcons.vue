<template>

  <h6 v-if="props.title" class="color-white uk-margin-medium-bottom uk-margin-medium-top">{{props.title}}</h6>
  
  <div class="hotel-types-box uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-5@m uk-grid" uk-grid>
    <template v-for="(icon, index) in props.types" :key="index">

      <NuxtLink :to="'/'+icon.url+'/'" :prefetch="false" class="hotel-type" :aria-label="icon.name">
        <div class="hotel-type-icon bg-dark uk-border-circle uk-flex-inline uk-flex-center uk-flex-middle use-transition">
          <nuxt-img :src="'/img/icons/'+icon.type+'.svg'" preload :alt="icon.url+'-hotels'" />
        </div>
        <p class="hotel-type-label uk-margin-bottom-remove fw-semibold color-white">{{icon.name}}</p>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['id', 'title', 'types'])

</script>

<style>
  @media only screen and (max-width: 600px) {
    .hotel-type:last-child {
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>