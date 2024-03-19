const { isSameWithDateOfToday, isExpired } = require('./dateUtil');

module.exports = async () => {
  try {
    
    const todayISODate = new Date().toISOString();
    /*
    * Auto Publish and Unpublish with Start Date - End Date
    */
    let publishCount = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').updateMany({
        data: { publishedAt: todayISODate },
        where: {
          $and: [
            { is_monthly: { $eq: false } },
            { publishedAt: { $null: true } },
            { start_date: { $eq: todayISODate } },
          ],
        },
    });
    let unpublishCount = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').updateMany({
      data: { publishedAt: null },
      where: {
        $and: [
          { is_monthly: { $eq: false } },
          { publishedAt: { $notNull: true } },
          { end_date: { $lt: todayISODate } },
        ],
      },
    });

    var monthlyPromotions = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').findMany({
      where: { is_monthly: { $eq: true } }
    });
   
    for (const monthlyPromo of monthlyPromotions) { {
      if (monthlyPromo.publishedAt == null && isSameWithDateOfToday({ startDate: monthlyPromo.start_date })) {
        console.log("____________IS SAME DATE___________");
        let result = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').update({
          where: { id: monthlyPromo.id },
          data: { publishedAt: todayISODate }
        });
        publishCount.count++;
      } else if (monthlyPromo.publishedAt != null && isExpired({ startDate: monthlyPromo.start_date, endDate: monthlyPromo.end_date })) {
        let result = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').update({
          where: { id: monthlyPromo.id },
          data: { publishedAt: null }
        });
        unpublishCount.count++;
      }
    }
  }
    return publishCount.count + unpublishCount.count;
  } catch (error) {
    console.log(error);
  }
};