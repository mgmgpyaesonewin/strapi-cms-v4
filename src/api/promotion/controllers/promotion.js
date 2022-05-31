'use strict';

const { default: entityService } = require('@strapi/strapi/lib/services/entity-service');

/**
 *  promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promotion.promotion', ({ strapi }) => ({
    async find(ctx) {
        let status = "success";
        let types = ['NORMAL', 'SPECIAL'];
        const { data, meta } = await super.find(ctx);

        var finalData;
        if (types.includes(ctx.query.promotionType)) {
            finalData = data.filter(function (filterType) {
                return filterType.attributes.promotion_type.data.attributes.type_title == ctx.query.promotionType;
            });
        }
        else {
            finalData = data;
        }
        let param = ctx.request.querystring;
        if (ctx.query.populate) {
            let responseMap = [];
            finalData.map((value, index) => {
                let photoArr = value.attributes.photo_path.data;
                let photo = photoArr.slice(0, 1).shift();

                responseMap.push({
                    "promotion_id": value.id,
                    "photo_path": photo.attributes.url,
                    "promotion_type": value.attributes.promotion_type.data.attributes.type_title,
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
            //locale: ctx.query.locale
        });

        let responseMap = [];
        entries.map((value, index) => {
            let photoArr = value.photo_path;
            let photo = photoArr.slice(0, 1).shift();

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

    },


    async findOne(ctx) {
        let status = "success";
        const { id } = ctx.params;
        const { query } = ctx;

        const entity = await strapi.service('api::promotion.promotion').findOne(id, query);
        console.log(entity);

        if (ctx.query.populate) {


            const responseMap = {
                promotion_id: entity.id,
                photo_path: entity.photo_path[0].url,
                promotion_type: entity.promotion_type.type_title,
                category_id: entity.categoriess.category_id,
                category_title: entity.categoriess.category_title,
                hasDetails: entity.hasDetails,

                action_link_ios: entity.action_link_ios,
                action_link_android: entity.action_link_android,
                promotion_title: entity.promotion_title,
            };
            return { status, responseMap };


        }
        else {
            return entity;
        }

    }

}));
