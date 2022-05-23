'use strict';

const { default: entityService } = require('@strapi/strapi/lib/services/entity-service');

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
                console.log(value.attributes.categoriess.data);
                responseMap.push({
                    "promotion_id": value.id,
                    "photo_path": photo.attributes.url,
                    "promotion_type": value.attributes.promotion_type.data.attributes.type_title,
                    // "category_id": value.attributes.categoriess.data.id,
                    "category_id": value.attributes.categoriess.data.attributes.category_id,
                    "hasDetails": value.attributes.hasDetails,
                    "category_title": value.attributes.categoriess.data.attributes.category_title,
                    "action_link_ios": value.attributes.action_link_ios,
                    "action_link_android": value.attributes.action_link_android,
                    'promotion_title': value.attributes.promotion_title,
                });
            });
            return { status, responseMap };

        }
        return data;
    },
    async indexTest(ctx, next) {
        let status = 200;
        let { id } = ctx.params;
        const entries = await strapi.entityService.findMany('api::promotion.promotion', {
            populate: 'deep',
            filters: {
                categoriess: {
                    category_id: id
                },
            },
        });

        let responseMap = [];
        entries.map((value, index) => {
            let photoArr = value.photo_path;
            console.log(photoArr);
            let photo = photoArr.slice(0, 1).shift();
            console.log(value);
            responseMap.push({
                "promotion_id": value.id,
                'promotion_title': value.promotion_title,
                "photo_path": photo.url,
                "promotion_type": value.promotion_type.type_title,
                "category_id": value.categoriess.category_id,
                "hasDetails": value.hasDetails,
                "category_title": value.categoriess.category_title,
                "action_link_ios": value.action_link_ios,
                "action_link_android": value.action_link_android,

            });
        });
        return { status, responseMap };
       
    }



    /*
    async indexTest(ctx, next) {
         let status = 200;
         console.log("promoiton index");
         const entries = await strapi.db.query('api::promotion.promotion').findMany({

            populate: {
                path: 'deep'
            },
             where: {

                 categoriess: {
                     category_id: 3
                   },

               },

         });


         console.log(entries);
          ctx.body = entries;

       }  */
}));
