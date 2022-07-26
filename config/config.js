module.exports = {
  models: {
    /* general */
  
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
    "merchant-home":{
      url: ["/merchant-home"],
      app: "merchant"
    },
    "merchant-deeplink": {
      url: ["/merchant-home","/merchant-tutorial-stories"],
      app: "merchant",
    },
    "merchant-tutorial-story":{
      url: ["/merchant-home","/merchant-tutorial-stories"],
      app: "merchant",
    },
    "merchant-term-and-condition-version":{
      url:["/merchant-term-and-condition-content","/merchant-term-and-condition-versions"],
      app: "merchant",
    },
    "merchant-term-and-condition-content":{
      url:["/merchant-term-and-condition-content"],
      app: "merchant",
    },
    /* Wave Pay */
    "deeplink": {
      url: ["/wp-mini-app-categories","/wp-tutorial-lists","/wp-tutorial-stories"],
      app: "wp",
    },
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
      url: ["/wp-tutorial-stories", "/wp-tutorial-lists","wp-tutorial-story-lists"],
      app: "wp"
    },

    "wp-tutorial-story": {
      url: ["/wp-tutorial-stories", "/wp-tutorial-lists","wp-tutorial-story-lists"],
      app: "wp"
    },
    "wp-term-and-condition": {
      url: ["/wp-term-and-conditions"],
      app: "wp"
    },
    "wp-term-and-condition-version":{
      url: ["/wp-mobile-app-versions","/wp-term-and-conditions"],
      app: "wp"
    }

  },
};
