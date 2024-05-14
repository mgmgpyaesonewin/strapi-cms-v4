const { isSameWithDateOfToday, isExpired } = require('./dateUtil');

module.exports = async () => {
  try {
    
    const todayISODate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' })).toISOString();
    /*
    * Auto Publish and Unpublish with Start Date - End Date
    */
    let publishCount = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').updateMany({
        data: { publishedAt: todayISODate },
        where: {
          $and: [
            { is_monthly: { $eq: false } },
            { publishedAt: { $null: true } },
            { start_date: { $notNull: true }},
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
          { end_date: { $notNull: true }},
          { end_date: { $lt: todayISODate } },
        ],
      },
    });

    var monthlyPromotions = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').findMany({
      where: { is_monthly: { $eq: true } }
    });
   
    for (const monthlyPromo of monthlyPromotions) { {
      let startDate = monthlyPromo.start_date;
      let endDate = monthlyPromo.end_date;
      if (monthlyPromo.publishedAt == null && startDate != null  && isSameWithDateOfToday({ startDate: startDate })) {
        console.log("____________IS SAME DATE___________");
        let result = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').update({
          where: { id: monthlyPromo.id },
          data: { publishedAt: todayISODate }
        });
        publishCount.count++;
      } else if (monthlyPromo.publishedAt != null && startDate != null  && endDate != null && isExpired({ startDate: startDate, endDate: endDate })) {
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