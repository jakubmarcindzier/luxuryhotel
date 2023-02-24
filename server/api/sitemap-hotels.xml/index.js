// Get the library
import {create} from 'xmlbuilder2';

// Build the export function
export default defineEventHandler(async (event) => {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Fetch all the links
  const links = await $fetch(`${config.CMS_URL}/items/hotels?filter[status][_eq]=published`, {
    params: {
      limit: -1,
      fields: ['slug', 'date_updated']
    }
  })
  
  // Map the urls
  const url = links.data.map(function(item){
    return {
      loc: config.FRONT_URL+'/hotels/'+item.slug+'/',
      lastmod: item.date_updated,
      changefreq: 'weekly',
      priority: 1
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