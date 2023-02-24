<template>


  <section class="page-module uk-container uk-container-large">
    <div v-if="props.items" :class="'info-blocks uk-child-width-1-1@s uk-child-width-1-'+props.columns+'@m uk-grid-match uk-text-center'" uk-grid>

      <div v-for="(feature, index) in props.items" :key="index" class="info-blocks-item">
        <div class="info-blocks-content bg-white uk-padding-large">
          <h3 v-if="feature.title" class="info-block-title">{{feature.title}}</h3>
          <div v-if="feature.description" v-html="feature.description" class="info-blocks-description"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
  
  // Set the props
  const props = defineProps(['id', 'items', 'columns'])

</script>

<style>
  .info-blocks-content {
    position: relative;
  }
  .info-blocks-content * {
    position: relative;
    z-index: 1;
  }
  .info-blocks-content:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0px;
    bottom: 0;
    left: 0;
    background: var(--black);
    z-index: 0;
  }
  .info-blocks-content > *,
  .info-blocks-content:after {
    -moz-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    transition-delay: .1s;
  }
  .info-blocks-content:hover > * {
    color: #fff;
  }
  .info-blocks-content:hover::after {
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 600px) {
    .info-block-title {
      font-size: var(--font-size-xl);
    }
  }
</style>