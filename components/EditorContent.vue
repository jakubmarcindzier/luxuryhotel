<template>
  <div v-html="convertDataToHtml(props.content)" class="editorjs-content"></div>
</template>

<script setup>

  // Set the props
  const props = defineProps(['content'])
  
  // Get the Booking AID
  const aid = await bookingAID()

  // Get the runtime config
  const config = useRuntimeConfig()

  // Parse the Editorjs content
  function convertDataToHtml(blocks) {

    let convertedHtml = "";

    blocks.map(block => {
      
      switch (block.type) {
        case "header":
          convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case "embded":
          convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
          break;
        case "paragraph":
          convertedHtml += `<p>${block.data.text}</p>`;
          break;
        case "delimiter":
          convertedHtml += "<hr />";
          break;
        case "image":
          convertedHtml += `<figure><img class="uk-width-1-1" src="${config.CMS_URL}${block.data.file.url}?fit=cover&width=900&format=webp&quality=85" srcset="${config.CMS_URL}${block.data.file.url}?fit=cover&width=480&format=webp&quality=85 480w, ${config.CMS_URL}${block.data.file.url}?fit=cover&width=900&format=webp&quality=85 900w" sizes="(max-width: 600px) 480px, 900px" title="${block.data.caption}" alt="${block.data.caption}" loading="lazy" /><figcaption>${block.data.caption}</figcaption></figure>`;
          break;
        case "simpleimage":
          convertedHtml += `<figure><img class="uk-width-1-1" src="${config.CMS_URL}${block.data.url}?fit=cover&width=900&format=webp&quality=85" srcset="${config.CMS_URL}${block.data.file.url}?fit=cover&width=480&format=webp&quality=85 480w, ${config.CMS_URL}${block.data.file.url}?fit=cover&width=900&format=webp&quality=85 900w" sizes="(max-width: 600px) 480px, 900px" title="${block.data.caption}" alt="${block.data.caption}" loading="lazy" /><figcaption>${block.data.caption}</figcaption></figure>`;
          break;
        case "list":
          convertedHtml += "<ul>";
          block.data.items.forEach(function(li) {
            convertedHtml += `<li>${li}</li>`;
          });
          convertedHtml += "</ul>";
          break;
        case "table":
          convertedHtml += '<div class="uk-overflow-auto">';
          if(block.data.withHeadings == true) {
            convertedHtml += '<table class="table-with-headers uk-table uk-table-divider uk-table-hover">';
          } else {
            convertedHtml += '<table class="table-without-headers uk-table uk-table-divider uk-table-hover">';
          }
          block.data.content.map((row) => {
            convertedHtml += `<tr>${row.reduce( (acc, cell) => acc + `<td>${cell}</td>`, '' )}</tr>`
          });
          convertedHtml += '</table>';
          convertedHtml += '</div>';
          break;
        case "hotel":

          // Set the hotel URL
          let hotel_link = 'https://www.booking.com/searchresults.html?ss='+block.data.name.replace(/\s/g, '+')+'&nflt=%3Bclass%3D4&nflt=%3Bclass%3D5&aid='+aid+''
          if( block.data.link ) {
            hotel_link = block.data.link+'?aid='+aid+''
          }

          // Define the hotel labels
          let hotel_labels = ''
          if( block.data.location || block.data.stars ) {
            hotel_labels += `<ul class="sb-hotel-labels uk-list uk-flex color-dark">`;
            if( block.data.location ) {
              hotel_labels += `
                <li class="uk-flex uk-flex-middle fs-xs">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span class="hb-label-value">${block.data.location}</span>
                </li>
              `
            }
            if( block.data.stars ) {
              hotel_labels += `
                <li class="uk-flex uk-flex-middle fs-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star lh-icon sb-hotel-meta-icon">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span class="hb-label-value">${block.data.stars}</span>
                </li>
              `
            }
            hotel_labels += `</ul>`;
          }

          // Define the hotel meta
          let hotel_meta = ''
          if( block.data.price ) {
            hotel_meta += `<ul class="sb-hotel-meta uk-list uk-flex color-dark">`;
            if( block.data.price ) {
              hotel_meta += `
                <li class="uk-flex uk-flex-middle fs-xs">
                  <span class="hb-meta-value">From <strong>$${block.data.price}</strong> /per night</span>
                </li>
              `
            }
            hotel_meta += `</ul>`;
          }

          convertedHtml += `<div id="${block.id}" class="sb-hotel uk-border-rounded">`;
          convertedHtml += `<div class=" uk-grid-collapse" uk-grid>`;
          convertedHtml += `
            <div class="sb-hotel-image uk-width-1-3@m uk-cover-container">
              <a href="${hotel_link}" target="_blank" class="sb-hotel-image-holder use-transition">
                <img src="${config.CMS_URL}${block.data.photo}?fit=cover&amp;width=360&height=360&quality=85&format=webp" alt="${block.data.name}" loading="lazy" uk-cover>
              </a>
            </div>

            <div class="sb-hotel-content uk-width-2-3@m uk-position-relative">
              ${hotel_labels}
              <a href="${hotel_link}" target="_blank">
                <h5 class="sb-hotel-title uk-margin-remove-bottom">${block.data.name}</h5>
              </a>
              ${hotel_meta}
              <p class="fs-xs-top">${block.data.description}</p>
              <a href="${hotel_link}" target="_blank" class="sb-hotel-button arrowed-btn uk-button uk-button-primary use-transition">
                Check Availability
              </a>
            </div>
          `;
          convertedHtml += `</div>`;
          convertedHtml += `</div>`;
          break;
        default:
          console.log("Unknown block type", block.type);
          break;
      }
    });

    return convertedHtml;
  }
</script>

<style>
  .editorjs-content figure {
    margin: 40px auto;
  }
  .editorjs-content figcaption {
    text-align: center;
    margin: 15px 0;
    font-size: var(--font-size-xs);
    opacity: .65;
  }
  .editorjs-content p a {
    color: var(--black);
    border-bottom: 1px solid var(--secondary);
    -moz-transition: all .2s ease;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
  }
  .editorjs-content p a:hover {
    border-color: var(--primary);
  }
  .editorjs-content h1 a,
  .editorjs-content h2 a,
  .editorjs-content h3 a,
  .editorjs-content h4 a,
  .editorjs-content h5 a,
  .editorjs-content h6 a {
    border: none;
    color: var(--black);
  }
  .editorjs-content h1 {
    font-size: var(--font-size-xxl)
  }
  .editorjs-content h2 {
    font-size: var(--font-size-xl);
  }
  .editorjs-content h3 {
    font-size: var(--font-size-l);
  }
  .editorjs-content h4 {
    font-size: var(--font-size-m);;
  }
  .editorjs-content table {
    font-size: var(--font-size-xs);
  }
  .editorjs-content table.table-with-headers tbody tr:first-child {
    font-weight: 500;
    background: var(--light);
  }
  /* Hotel Blocks */
  .sb-hotel-big {
    margin: 40px auto;
  }
  .sb-hotel {
    background: var(--slate);
    padding: 15px;
    margin: 30px 0;
    min-height: 260px;
  }
  .sb-hotel .uk-grid {
    min-height: 260px;
  }
  .sb-hotel .sb-hotel-content {
    padding: 20px 30px;
  }
  .sb-hotel ul.sb-hotel-labels,
  .sb-hotel ul.sb-hotel-meta {
    gap: 15px;
  }
  .sb-hotel ul.sb-hotel-labels li,
  .sb-hotel ul.sb-hotel-meta li {
    margin: 0;
  }
  .sb-hotel ul.sb-hotel-labels li svg {
    margin-right: 6px;
  }
  .sb-hotel ul.sb-hotel-meta li svg {
    width: 18px;
    margin-right: 8px;
  }
  .sb-hotel ul.sb-hotel-labels li .hb-label-value {
    margin-top: 3px;
  }
  .sb-hotel-action:hover {
    background: transparent;
    color: var(--primary);
  }
  .sb-hotel-label {
    letter-spacing: .5px;
    gap: 6px;
  }
  .sb-hotel .sb-hotel-action:hover {
    color: var(--primary);
  }
  .sb-hotel-image {
    min-height: 300px;
  }

  /* FAQ */
  .content-faq .uk-accordion-title {
    padding: 15px 20px;
    border: 1px solid var(--light-gray);
  }
  .content-faq .uk-open .uk-accordion-title {
    color: var(--black);
    border-color: var(--black);
  }

  /* Author notes */
  .sb-author-note {
    position: relative;
    max-width: 800px;
    margin: 40px auto;
  }
  .sb-author-note .sb-author-note-content {
    position: relative;
    border: 3px solid;
    border-radius: 15px;
    padding: 36px;
  }
  .sb-author-note .sb-author-note-content:after {
    content:"";
    position: absolute;
    border: 3px solid;
    border-radius: 0 50px 0 0;
    width: 70px;
    height: 60px;
    bottom: -63px;
    left: 50px;
    border-bottom: none;
    border-left: none;
    z-index: 2; 
  }
  .sb-author-note .sb-author-note-content:before {
    content:"";
    position: absolute;
    width: 90px;
    height: 6px;background: var(--light);
    bottom: -3px;
    left: 50px;
    z-index: 1;
  }
  .sb-author-note .sb-author-note-image {
    padding-top: 15px;
    margin-left: 150px;
    padding-left: 15px;
    gap: 20px;
  }
  .sb-author-note .sb-author-note-image:first-letter {
    margin-left: -12px;
  }
  .sb-author-note img {
    max-width: 60px;
    max-height: 60px;
  }
  @media only screen and (max-width: 992px) {
    .sb-hotel {
      padding: 30px;
      margin-left: -20px;
      margin-right: -20px;
    }
    .sb-hotel .sb-hotel-content {
      padding: 20px 0 0;
    }
    .location-custom-content {
      margin-top: 0px;
      padding: 20px;
    }
  }
</style>