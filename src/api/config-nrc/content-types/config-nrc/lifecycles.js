const axios = require('axios');
module.exports = {
    afterUpdate(event) {
        const { result, params, data } = event;
        axios.post(process.env.MW_NRC_URL, {
            "nrcJsonString": JSON.stringify(result.nrc),
        }, {
            headers: {
                'client_id': process.env.MW_CLIENT_ID,
                'client_secret': process.env.MW_CLIENT_SECRET
            }
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });

    },
};
