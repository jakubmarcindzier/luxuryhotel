// Get the library
import {create} from 'xmlbuilder2';

// Build the export function
export default defineEventHandler(async (event) => {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Fetch all the links
  const links = await $fetch(`${config.CMS_URL}/items/pages?filter[status][_eq]=published`, {
    params: {
      limit: -1,
      fields: ['slug', 'date_updated', 'content']
    }
  })

  // Set the static pages
  const static_pages = [
    {
      slug: '',
      date_updated: new Date().toISOString(),
      content: ''
    },
    {
      slug: 'wishlist',
      date_updated: new Date().toISOString(),
      content: ''
    },
  ]

  // Merge all pages
  const all_pages = [ ...static_pages, ...links.data ]
  
  // Map the urls
  const url = all_pages.map(function(item){
    return {
      loc: item.slug ? config.FRONT_URL+'/'+item.slug+'/' : config.FRONT_URL,
      lastmod: item.date_updated,
      changefreq: 'weekly',
      priority: 1,
      // 'image:image': {
      //   'image:loc': 'asa'
      // }
    }
  })
  
  // Build the XML file structure
  const urls = {
    urlset: {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "@xmlns:xhtml": "http://www.w3.org/2001/XMLSchema-instance",
      url
    }
  }

  // Create the XML
  const root = create(urls, { version: '1.0' }); 
  
  // Convert the XML tree to string
  const xml = root.end({ prettyPrint: true });

  // Set the XML header
  event.res.setHeader('Content-Type', 'application/xml')

  // Output the XML
  return xml

})