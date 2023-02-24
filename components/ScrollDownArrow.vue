<template>
  <h6 class="fs-s fw-medium uk-text-uppercase uk-margin-large-top uk-text-center">{{props.intro}}</h6>
  <div class="animate-scroll-down uk-align-center uk-position-relative">
    <a href="#hgb" class="animate" uk-scroll="offset:15"></a>
  </div>
</template>

<script setup>

  // Set the props
  const props = defineProps([ 'intro' ])

</script>

<style>
  .animate-scroll-down {
    width: 40px;
    height: 40px;
  }
  .animate-scroll-down a {
    display: block;
    opacity: 0;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    line-height: 0;
    font-size: 0;
    color: transparent;
    margin-left: auto;
    margin-right: auto;
    -moz-background-size: 0 auto;
    -o-background-size: 0 auto;
    -webkit-background-size: 0 auto;
    background-size: 0 auto;
    -webkit-animation: scrollDown 1.5s 0s infinite normal ease forwards;
    -moz-animation: scrollDown 1.5s 0s infinite normal ease forwards;
    -o-animation: scrollDown 1.5s 0s infinite normal ease forwards;
    animation: scrollDown 1.5s 0s infinite normal ease forwards;
  }
  .animate-scroll-down a:before,
  .animate-scroll-down a:after {
    content: " ";
    position: absolute;
    top: 0;
    left: -100%;
    display: block;
    width: 300%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    -moz-background-size: 100% auto;
    -o-background-size: 100% auto;
    -webkit-background-size: 100% auto;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .animate-scroll-down a:before {
    -webkit-animation: scrollDown 1.5s 0.25s infinite normal ease forwards;
    -moz-animation: scrollDown 1.5s 0.25s infinite normal ease forwards;
    -o-animation: scrollDown 1.5s 0.25s infinite normal ease forwards;
    animation: scrollDown 1.5s 0.25s infinite normal ease forwards;
  }
  .animate-scroll-down a:after {
    -webkit-animation: scrollDown 1.5s 0.5s infinite normal ease forwards;
    -moz-animation: scrollDown 1.5s 0.5s infinite normal ease forwards;
    -o-animation: scrollDown 1.5s 0.5s infinite normal ease forwards;
    animation: scrollDown 1.5s 0.5s infinite normal ease forwards;
  }
  /* Scroll Down Animation */
  @-webkit-keyframes scrollDown {
    0% {
      opacity: 0;
      background-position: center top;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
    10% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      -moz-background-size: 20% auto;
      -o-background-size: 20% auto;
      -webkit-background-size: 20% auto;
      background-size: 20% auto;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      background-position: center bottom;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
  }
  @-moz-keyframes scrollDown {
    0% {
      opacity: 0;
      background-position: center top;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
    10% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      -moz-background-size: 20% auto;
      -o-background-size: 20% auto;
      -webkit-background-size: 20% auto;
      background-size: 20% auto;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      background-position: center bottom;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
  }
  @-ms-keyframes scrollDown {
    0% {
      opacity: 0;
      background-position: center top;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
    10% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      -moz-background-size: 20% auto;
      -o-background-size: 20% auto;
      -webkit-background-size: 20% auto;
      background-size: 20% auto;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      background-position: center bottom;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
  }
  @keyframes scrollDown {
    0% {
      opacity: 0;
      background-position: center top;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
    10% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      -moz-background-size: 20% auto;
      -o-background-size: 20% auto;
      -webkit-background-size: 20% auto;
      background-size: 20% auto;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      background-position: center bottom;
      -moz-background-size: 0 auto;
      -o-background-size: 0 auto;
      -webkit-background-size: 0 auto;
      background-size: 0 auto;
    }
  }
</style>