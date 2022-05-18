'use strict';

/**
 *  promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promotion.promotion', ({ strapi }) => ({
    async find(ctx) {
        let status = "success";
        
        const { data, meta } = await super.find(ctx);
        //return data;
        let param = ctx.request.querystring;
        console.log(param);
        let isInclude = param.includes("populate=deep");

        if (isInclude) {
            let responseMap = [];
            data.map((value, index) => {
                let photoArr = value.attributes.photo_path.data;
                let photo = photoArr.slice(0, 1).shift();
                responseMap.push({
                    "promotion_id": value.id,
                    "photo_path": photo.attributes.url,
                    "promotion_type": value.attributes.promotion_type.data.attributes.type_title,
                    "category_id": value.attributes.categoriess.data.id,
                    "hasDetails": value.attributes.hasDetails,
                    "category_title":value.attributes.categoriess.data.attributes.category_title,
                    "action_link_ios": value.attributes.action_link_ios,
                    "action_link_android": value.attributes.action_link_android,
                    'promotion_title': value.attributes.promotion_title,
                });
            });
            return { status, responseMap };

        }
        return data;
    }
}));
