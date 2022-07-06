module.exports = {
  models: {
    /* general */
    "deeplink": {
      url: ["/wp-mini-app-categories","/wp-tutorial-lists","/wp-tutorial-stories"],
      app: "wp",
    },
    /* merchant */
    "merchant-on-boarding": {
      url: ["/merchant-core-config"],
      app: "merchant",
    },
    "merchant-onboarding-page": {
      url: ["/merchant-core-config"],
      app: "merchant",
    },
    "merchant-core-config": {
      url: ["/merchant-core-config"],
      app: "merchant",
    },
    "merchant-login": {
      url: ["/merchant-core-config"],
      app: "merchant",
    },
    /* Wave Pay */
    "wp-mini-app": {
      url: ["/wp-mini-app-categories"],
      app: "wp",
    },
    "wp-mini-app-category": {
      url: ["/wp-mini-app-categories"],
      app: "wp",
    },
    "wp-category": {
      url: ["/categories"],
      app: "wp"
    },
    "wp-promotion": {
      url: ["/promotions"],
      app: "wp"
    },

    "wp-tutorial-list": {
      url: ["/wp-tutorial-lists"],
      app: "wp"
    },

    "wp-subcategories-tutorial": {
      url: ["/wp-tutorial-lists"],
      app: "wp"
    },
    "wp-tutorial": {
      url: ["/wp-tutorial-lists", "/wp-tutorials"],
      app: "wp"
    },
    "wp-tutorial-story-list": {
      url: ["/wp-tutorial-stories", "/wp-tutorial-lists"],
      app: "wp"
    },

    "wp-tutorial-story": {
      url: ["/wp-tutorial-stories", "/wp-tutorial-lists"],
      app: "wp"
    },

  },
};
