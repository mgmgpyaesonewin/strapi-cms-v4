'use strict';

/**
 *  homepage controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage',({ strapi }) =>  ({
    async find(ctx){
        let status = 'success';
        ctx.query = { ...ctx.query, local: 'en' }
        const { data, meta } = await super.find(ctx);
        let responseMap = data.attributes;
        let profile = {
            profile_name: responseMap.profile_name,
            profile_wallet: responseMap.profile_wallet,
            padding : responseMap.padding,
            margin : responseMap.margin,
            sort : responseMap.sort,
            locale : responseMap.local,
            profile_image_url : responseMap.profile_image_url.data.attributes.url,
            serviceWidget :responseMap.serviceWidget
                
            
          }
            let categoriesWidget = responseMap.categoriesWidget;
          
          
        //let categoriesWidget = responseMap.categoriesWidget;
          
          
        //return {status,profile,categoriesWidget};
        return {status,responseMap};


    }
}));
``