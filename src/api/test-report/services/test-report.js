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
                    acc = acc || [];
                    acc.push({
                        id: item.id,
                        name: item.name || '',
                        description: item.description || ''
                    });
                    return acc;
                }, [])

                // returning the reduced data
                return { status, responeMap };
            }
        } catch (err) {
            return err;
        }
    },
    custom: async (ctx) => {
        try {

            let { id } = ctx.params;
            const entries = await strapi.entityService.findOne('api::test.test', id, {
                fields: ['id', 'name'],

            });
            // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            // return this.transformResponse(sanitizedEntity);
            return entries;


        } catch (err) {
            return err;

        }
    },
    insertTest:async(ctx)=> {
        try{
        const entry = await strapi.entityService.create('api::test.test', {
            data: {
                name: 'Custom API',
                description : ' Custom Description'

            },
            });
               

        } catch(err){
            return err;
        }
    }
}