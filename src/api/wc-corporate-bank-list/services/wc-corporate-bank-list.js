'use strict';

/**
 * wc-corporate-bank-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-corporate-bank-list.wc-corporate-bank-list', ({ strapi }) => ({
    async findAll(ctx) {
        try {
            const banks = await strapi.entityService.findMany(
                'api::wc-corporate-bank-list.wc-corporate-bank-list', 
                {
                    fields: ['uuid', 'name']
                }
            );
            if (!banks) {
                return ctx.notFound('Bank not found');
            }
            return banks;
        } catch (error) {
            throw new Error('Failed to fetch banks');
        }
    },

    async find(ctx) {
        try {
            const banks = await strapi.entityService.findMany(
                'api::wc-corporate-bank-list.wc-corporate-bank-list',
                {
                    fields: ['uuid', 'name', 'account_no']
                }
            );
            if (!banks) {
                return ctx.notFound('Bank not found');
            }
            return banks;
        } catch (error) {
            throw new Error('Failed to fetch banks');
        }
    }

}));