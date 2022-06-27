module.exports = {
    models: {
        "merchant-onboarding": {
            url: "/merchant-on-boarding",
            app: "merchant",
        },
        "merchant-onboarding-page": {
            url: "/merchant-on-boarding",
            app: "wp",
        },
        "wp-mini-app": {
            url: "/wp-mini-app-categories",
            app: "wp",
        },
        "wp-category": {
            url: "/categories",
            app: "wp,merchant"
        },
        "wp-promotion": {
            url: "/promotions",
            app: "wp,merchant"
        }


    },
};
