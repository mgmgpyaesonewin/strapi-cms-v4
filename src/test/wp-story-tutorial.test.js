
const storyTutorials = require("./api/story-tutorial/story-tutorial.js");
test('Story Tutorial List Update Unit TEST', async () => {
    let response = await storyTutorials.fetchStoryTutorialList();
    let stories = response.data;

   
    expect(stories.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                type: expect.stringMatching('story'),
                story_name: expect.any(String),
                position: expect.any(String),
                image: expect.objectContaining({
                    url: expect.any(String),
                }),

                title: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                description: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                wp_tutorial_stories: expect.arrayContaining([
                    expect.objectContaining({
                        position: expect.any(String),
                        name: expect.any(String),
                        isPinned: expect.any(Boolean),
                        title: expect.objectContaining({
                            en: expect.any(String),
                            my: expect.any(String),
                            zw: expect.any(String)
                        }),
                        description: expect.objectContaining({
                            en: expect.any(String),
                            my: expect.any(String),
                            zw: expect.any(String)
                        }),
                        image: expect.objectContaining({
                            url: expect.any(String),
                        }),

                    }),
                ]),
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