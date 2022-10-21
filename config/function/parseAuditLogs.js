module.exports = async () => {
  try {

    console.log("cron " + new Date());
    const subtract = new Date();
    const todayDate = new Date();
    const additionOfMonths = 3;
    subtract.setMonth(subtract.getMonth() - additionOfMonths); // For subtract use m
    console.log('New Date:', subtract);
    // const entries = await strapi.entityService.findMany('api::trail.trail', {
    //     filters: {
    //       $and: [
    //         {
    //             createdAt: {
    //                 $gte: subtract,
    //               },
    //         },
    //         {
    //             createdAt: {
    //                 $lte: todayDate,
    //               },
    //         },
    //       ],
    //     },
    //   });
    const entries = await strapi.db.query('api::trail.trail').deleteMany({
      where: {
        $and: [
          {
            createdAt: {
              $gte: subtract,
            },
          },
          {
            createdAt: {
              $lte: todayDate,
            },
          },
        ],
      },
    });


    console.log(entries.length);
    //await strapi.entityService.delete('api::trail.trail', 1);
    //await strapi.entityService.delete('api::trail.trail', 1);
  } catch (error) {
    console.warm(error);
  }
};