'use strict';

/**
 * config-region controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config-region.config-region', ({ strapi }) => ({

    async find(ctx) {
        let regions = await strapi.service('api::config-region.config-region').find(ctx);
        let districts = await strapi.service('api::config-city-district.config-city-district').find(ctx);
        let townships = await strapi.service('api::config-township.config-township').find(ctx);
        if (districts.length > 0) {
            districts.map(district => {
                district.region_id = !!district.region ? district.region.id : 0;
                district.region_name = !!district.region ? district.region.name : '';
                delete district.region;

            });
        }
        if (townships.length > 0) {
            townships.map(township => {
                township.district_id = !!township.city_district ? township.city_district.id : 0;
                township.district_name = !!township.city_district ? township.city_district.name : '';
                delete township.city_district;

            });
        }

        return {
            'address_data': {
                'regions': regions.length > 0 ? regions : [],
                'districts': districts.length > 0 ? districts : [],
                'townships': townships.length > 0 ? townships : [],
            }
        }
    },
    async addressForWP(ctx) {
        return await this.find(ctx);
    },
    async addressForMerchant(ctx) {
        return await this.find(ctx);
    },
    async addressForWC(ctx) {
        return await this.find(ctx);
    },
    async findRegionByCode(ctx) {
        const { name } = ctx.params;
        let regions = await strapi.service('api::config-region.config-region').findByCode(name);
        return regions;
    }
}));
