'use strict';

/**
 * merchant-force-upgrade-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;
//module.exports = createCoreService('api::merchant-force-upgrade-list.merchant-force-upgrade-list');
module.exports = createCoreService('api::merchant-force-upgrade-list.merchant-force-upgrade-list', ({ strapi }) => ({

    async find() {
        return strapi.db.query('api::merchant-force-upgrade-list.merchant-force-upgrade-list').findOne({
            select: [],
            populate: {
                iOS: {
                    populate: {
                        forcedUpgrade: {
                            populate: {
                                build: {
                                    select: ["version_name", "version_code"]
                                },

                            }
                        },
                        softUpgrade: {
                            populate: {
                                build: {
                                    select: ["version_name", "version_code"]

                                }
                            }
                        },
                        version_info: {
                            select: [],
                            populate: {
                                version_info: {
                                    populate: {
                                        version: {
                                            select: ["version_name", "version_code"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                Android: {
                    populate: {
                        forcedUpgrade: {
                            populate: {
                                build: {
                                    select: ["version_name", "version_code"]

                                }
                            }
                        },
                        softUpgrade: {
                            populate: {
                                build: {
                                    select: ["version_name", "version_code"]

                                }
                            }
                        },
                        version_info: {
                            select: [],
                            populate: {
                                version_info: {
                                    populate: {
                                        version: {
                                            select: ["version_name", "version_code"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
        }
        );
    },
}));
