const axios = require('axios');
const storyTutorials = require("./api/story-tutorial/story-tutorial.js");
describe("fetchStoryTutorialList", () => {
    describe("when storyTutorials API call is successful", () => {
        it("should return story tutorials list", async () => {
            let response = await storyTutorials.fetchStoryTutorialList();
            let stories = response.data;
            expect(stories[0]).toMatchSnapshot({
                description: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                id: expect.any(Number),
                image: expect.any(Object),
                position: expect.any(String),
                story_name: expect.any(String),
                title: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                type: expect.any(String),
                // wp_tutorial_stories: expect.arrayContaining([
                // wp_tutorial_stories: expect.arrayContaining([
                //     expect.objectContaining(
                //         {
                //             id: expect.any(Number),
                //             //createdAt : expect.any(Date),
                //             //updatedAt :expect.any(Date),
                //             //publishedAt:expect.any(Date),
                //             name: expect.any(String),
                //             title: expect.objectContaining({
                //                 en: expect.any(String),
                //                 my: expect.any(String),
                //                 zw: expect.any(String),
                //                 id: expect.any(Number)
                //             }),
                //             description: expect.objectContaining({
                //                 en: expect.any(String),
                //                 my: expect.any(String),
                //                 zw: expect.any(String),
                //                 id: expect.any(Number)
                //             }),
                //             image: expect.any(Object),

                //         }
                //     ),

                // ])

            });

            expect(stories[0].wp_tutorial_stories[0]).toMatchSnapshot({
                id: expect.any(Number),
                name: expect.any(String),
                title: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String),
                    id: expect.any(Number)
                }),
                description: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String),
                    id: expect.any(Number)
                }),
                image: expect.any(Object),
            });

            //expect(response.data.data).toMatchSnapshot();
        });
    });
});