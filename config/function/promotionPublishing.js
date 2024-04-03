module.exports = async () => {
  try {
    
    
    const todayISODate = new Date().toISOString();
    console.log(todayISODate);
   const newPublishCount =
     await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').updateMany({
      data: {
        publishedAt: todayISODate,
      },
      where: {
        $and: [
          {
            publishedAt: {
              $null: true,
            },
          },
          {
            start_date: {
              $eq: todayISODate,
            },
          },
        ],
      },
    });
    const newUnpublishCount = await strapi.db.query('api::wp-promotions-ad.wp-promotions-ad').updateMany({
      data: {
        publishedAt: null,
      },
      where: {
        $and: [
          {
            publishedAt: {
              $notNull: true,
            },
          },
          {
            end_date: {
              $lt: todayISODate,
            },
          },
        ],
      },
    });
    console.log("@>>> After");
    console.log("@>>> newPublishCount.count ", newPublishCount.count);
    console.log("@>>> newUnpublishCount.count ", newUnpublishCount.count);
    const totalUpdateCount = newPublishCount.count + newUnpublishCount.count;
    console.log(totalUpdateCount);
    return totalUpdateCount;
  } catch (error) {
    console.log(error);
  }
};