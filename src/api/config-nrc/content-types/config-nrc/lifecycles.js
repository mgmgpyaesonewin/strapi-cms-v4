module.exports = {
    afterUpdate(event) {
        const { result, params, data } = event;
        console.log('---------');
        console.log("after update", result.nrc);
        console.log('---------');

    },
};
