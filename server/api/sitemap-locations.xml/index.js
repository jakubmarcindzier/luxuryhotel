// Get the library
import {create} from 'xmlbuilder2';

// Build the export function
export default defineEventHandler(async (event) => {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Fetch all the links
  const links = await $fetch(`${config.CMS_URL}/items/location?filter[status][_eq]=published`, {
    params: {
      limit: -1,
      fields: ['slug', 'date_updated', 'parent.slug']
    }
  })

  // Set the additional locations
  function additionals(slug, updated) {
    return [
      {
        slug: slug +'/private-pools',
        date_updated: updated,
        parent: null
      },
      {
        slug: slug +'/family-friendly',
        date_updated: updated,
        parent: null
      },
      {
        slug: slug +'/multi-bedroom',
        date_updated: updated,
        parent: null
      },
      {
        slug: slug +'/5-star',
        date_updated: updated,
        parent: null
      },
      {
        slug: slug +'/sustainable',
        date_updated: updated,
        parent: null
      },
    ]
  }

  // Set all the links
  const all_links = links.data.map( function(value) {
    let output = [...[value], ...additionals(value.slug, value.date_updated)]
    return output
  })

  // Merge the locations
  const merged = all_links.flat(Infinity);
  
  // Map the urls
  const url = merged.map( function(item) {
    return {
      loc: item.parent ? config.FRONT_URL+'/in/'+item.parent.slug+'/'+item.slug+'/' : config.FRONT_URL+'/in/'+item.slug+'/',
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