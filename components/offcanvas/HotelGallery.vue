<template>
  <div id="mh_gallery" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog uk-height-1-1">
      <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>

      <div class="uk-grid-collapse uk-flex-middle uk-height-auto uk-height-1-1@l" uk-grid>
        <div class="uk-position-relative uk-width-1-2@m uk-width-2-3@l uk-visible-toggle" tabindex="-1" uk-slider="center: true">
          <ul id="mh_gallery_images" class="uk-slider-items uk-grid uk-grid-match" >
            <li class="uk-width-3-4" v-for="(image, index) in props.images" :key="index">
              <img :src="image.url_1440" :alt="props.hotelName+' image '+index">
            </li>
          </ul>
        
          <a class="color-dark uk-position-center-left uk-position-small" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
          <a class="color-dark uk-position-center-right uk-position-small" href="#" uk-slidenav-next uk-slider-item="next"></a>
        </div>

        <div class="uk-padding uk-padding-large@l uk-width-1-2@m uk-width-1-3@l bg-white">
          <p id="mogal_hotel_location" class="fs-s uk-flex uk-flex-middle">
            <span class="uk-margin-small-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin lh-svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <span>{{props.location}}</span>
          </p>

          <h4 id="mh_name">{{props.hotelName}}</h4>
          <p>{{props.hotelDescription}}</p>
          <NuxtLink :to="props.hotelLink" target="_blank" class="arrowed-btn uk-button uk-button-primary use-transition">See available rooms</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps([ 'images', 'location', 'hotelName', 'hotelLink', 'hotelStars', 'hotelDescription' ])

</script>

<style>
  #mogal_hotel_location span {
    line-height: 1;
  }
  #mogal_hotel_location span:last-child {
    margin-top: 2px;
  }
  #mh_gallery_images img {
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
  }
  @media only screen and (max-width: 1080px) {
    #mh_name {
      font-size: 26px;
    }
  }
  @media only screen and (max-width: 600px) {
    .uk-modal-close-full {
      padding: 8px;
    }
  }
</style>