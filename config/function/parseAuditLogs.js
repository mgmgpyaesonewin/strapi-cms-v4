module.exports = async () => {
    try {

        console.log("cron " + new Date().toISOString());
        const date = new Date();
        const todayDate = new Date();
        const additionOfMonths = 2;
        date.setMonth(date.getMonth() - additionOfMonths); // For subtract use minus (-)
       // date.setDay(date.getDay() - additionOfMonths); // For subtract use minus (-)
        console.log('New Date:', date);
        const entries = await strapi.entityService.findMany('api::trail.trail', {
            filters: {
              $and: [
                {
                    createdAt: {
                        $gte: date,
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
          
          console.log(entries,entries.length);
        //await strapi.entityService.delete('api::trail.trail', 1);
        //await strapi.entityService.delete('api::trail.trail', 1);
    } catch (error) {
        console.warm(error);
    }
};