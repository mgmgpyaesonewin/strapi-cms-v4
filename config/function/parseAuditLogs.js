module.exports = async () => {
    try {
        console.log("cron " + new Date().toISOString());
    }catch(error){
        console.warm(error);
    }
};