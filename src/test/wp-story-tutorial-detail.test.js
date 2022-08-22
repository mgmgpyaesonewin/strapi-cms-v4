
const storyTutorials = require("./api/story-tutorial/story-tutorial.js");
test('Get Wave Pay Story Tutorial by ID', async () => {
    let response = await storyTutorials.fetchStoryTutorialDetail(13);
    let data = response.data;
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            title: expect.objectContaining({
                en: expect.any(String),
                my: expect.any(String),
                zw: expect.any(String),
            }),
            description: expect.objectContaining({
                en: expect.any(String),
                my: expect.any(String),
                zw: expect.any(String),
            }),
            image: expect.objectContaining({
                url: expect.any(String)
            }),
            options: expect.objectContaining({
                autoPlay: expect.any(Boolean),
                autoPlaySpeed: expect.any(String),
            }),
        })
    );
    expect(data.options.buttons).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                type: expect.any(String),
                bgColor: expect.any(String),
                textColor: expect.any(String),
                en: expect.any(String),
                my: expect.any(String),
                zw: expect.any(String),
                deeplink: expect.objectContaining({
                    name: expect.any(String),
                    deeplink: expect.any(String),
                    deeplink_IOS: expect.toBeNullOrAny(String), 
                    is_webURL: expect.any(Boolean),
                    alternative_url: expect.toBeNullOrAny(String), //key I may receive string or null
                    alternative_url_IOS: expect.toBeNullOrAny(String), //key I may receive string or null
                    client_id: expect.toBeNullOrAny(String),
                }),
            })
        ])
    );
    expect(data.stories).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                en: expect.objectContaining({
                    extra_large: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    large: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    mid: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    small: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    extra_small: expect.objectContaining({
                        url: expect.any(String)
                    }),

                }),
                my: expect.objectContaining({
                    extra_large: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    large: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    mid: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    small: expect.objectContaining({
                        url: expect.any(String)
                    }),
                    extra_small: expect.objectContaining({
                        url: expect.any(String)
                    }),
                }),
            })
        ])
    );
});
expect.extend({
    toBeNullOrAny(received, expected) {
        if (received === null) {
            return {
                pass: true,
                message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
            };
        }
        if (expected == String) {
            return {
                pass: typeof received == 'string' || received instanceof String,
                message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
            };
        }
    }
});
