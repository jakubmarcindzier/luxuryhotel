<template>

  <section :id="'hero_'+props.id" class="module-hero uk-flex uk-flex-middle uk-flex-center uk-position-relative">
    <div class="uk-container uk-container-small uk-text-center uk-position-relative uk-position-z-index">
      <div class="home-hero-text uk-text-center">
        <p v-if="props.subtitle" class="color-white fs-m uk-margin-remove-bottom">{{props.subtitle}}</p>
        <h1 v-if="props.title" class="color-white">{{props.title}}</h1>
      </div>

      <LazyBlockSearchHotels use_location="yes" />
      <LazyBlockTypeIcons :id="props.id" :title="props.type_title" :types="props.types"/>
    </div>
    
    <nuxt-img :src="imageLink(props.background, 2000, 900, 'webp', 80)" fit="cover" width="2000" height="900" class="hero-module-image uk-width-1-1 uk-height-1-1 uk-position-absolute uk-position-top" alt="5 star Luxury Hotel Reviews and Guides" preload placeholder />
  </section>

</template>

<script setup>

  // Set the props
  const props = defineProps(['id', 'title', 'subtitle', 'search', 'background', 'types', 'type_title'])

</script>

<style>
  .module-hero {
    background-color: #1f2222;
    background-size: cover;
    background-position: center;
    min-height: 780px;
    padding: 60px 0;
  }
  .module-hero .uk-container-small {
    width: 100%;
  }
  .hero-module-image {
    object-fit: cover;
    opacity: .35;
  }
  .hotel-type-icon {
    width: 80px;
    height: 80px;
  }
  .hotel-type:hover .hotel-type-icon {
    background: var(--primary);
  }
  .hotel-type-label {
    letter-spacing: .5px;
  }
  @media only screen and (max-width: 600px) {
    .module-hero {
      padding: 120px 0 80px;
    }
  }
</style>