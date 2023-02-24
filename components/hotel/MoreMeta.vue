<template>
  <div v-if="pending" class="uk-margin-top">
    <content-loader viewBox="0 0 730 150" :animate="true" :speed="2" primaryColor="#cacdd8" secondaryColor="#ffffff">
      <rect x="0" y="0" rx="5" ry="4" width="700" height="10" /> 
      <rect x="0" y="25" rx="5" ry="4" width="700" height="10" /> 
      <rect x="0" y="50" rx="5" ry="4" width="700" height="10" />
      <rect x="0" y="75" rx="5" ry="4" width="700" height="10" />
    </content-loader>
  </div>

  <template v-else>
    <div class="hb-more-meta uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_staff')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Staff</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_staff')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_staff')}}</span>
        </div>
      </div>

      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_services')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Facilities</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_services')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_services')}}</span>
        </div>
      </div>

      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_clean')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Cleanliness</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_clean')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_clean')}}</span>
        </div>
      </div>

      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_comfort')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Comfort</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_comfort')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_comfort')}}</span>
        </div>
      </div>

      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_value')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Value for money</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_value')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_value')}}</span>
        </div>
      </div>

      <div v-if="reviewScores(reviews.score_breakdown, 'hotel_location')" class="hb-more-meta-item uk-margin-small-top">
        <span class="fs-xs">Location</span>
        <div class="hb-meta-score uk-flex uk-flex-middle">
          <progress class="uk-progress" :value="reviewScores(reviews.score_breakdown, 'hotel_location')" max="10"></progress>
          <span class="fs-xs fw-semibold uk-margin-small-left">{{reviewScores(reviews.score_breakdown, 'hotel_location')}}</span>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>

  // Import libraries
  import { ContentLoader } from 'vue-content-loader'

  // Set the props
  const props = defineProps(['hotel_id'])

  // Define the API settings
  const config = useRuntimeConfig()
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Get the hotels from Booking's API
  const { pending, data: reviews, refresh } = await useLazyAsyncData(
    'more-reviews-'+props.hotel_id+'',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/review-scores', {
      params: {
        locale: 'en-gb',
        hotel_id: props.hotel_id
      },
      headers: {
        'X-RapidAPI-Key': RA_KEY,
        'X-RapidAPI-Host': RA_HOST
      }
    }
  ))

  // Get the review scores
  function reviewScores(data, type) {

    // Get and merge the reviews by question
    let questions = data.map(a => a.question)
    let mergedQuestions = questions.reduce((a, b) => a.concat(b))

    // Filter and map the questions
    let questionsOutput = mergedQuestions.filter(item => {
      return item.question.includes(type)
    })

    // Set the reviews array to work with
    let reviewsArray = questionsOutput.map(a => Number(a.score))

    // Sum the values
    let sum = reviewsArray.reduce((a, b) => a + b, 0);

    // Return the fixed value
    return (sum / 10).toFixed(1)
  }

</script>