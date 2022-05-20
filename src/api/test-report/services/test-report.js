'use strict';
    
module.exports = {
  pagesReport: async () => {
    try {
      // fetching the data
      // we dont really need contentSections for this example.
      // its kept here, just for your reference
      let status = 200;
      const entries = await strapi.entityService.findMany('api::test.test', {
        fields: ['id', 'name'],
        populate: {
          metadata: {
            fields: ['metaTitle']
          },
          contentSections: {
            populate: '*'
          }
        }
      });

      // reducing the data to a simple array
      let responeMap;
      if (entries && Array.isArray(entries)) {
        responeMap = entries.reduce((acc, item) => {
            console.log(acc);
          acc = acc || [];
          //console.log(acc);
          acc.push({
            id: item.id,
            name: item.name || '',
            metaTitle: item.metadata?.metaTitle || ''
          });
          return acc;
        }, [])

        // returning the reduced data
        return {status,responeMap};
      }
    } catch (err) {
      return err;
    }
  }
}