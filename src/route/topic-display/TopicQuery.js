import { getTopicsByPage } from "server/topic/GetTopicsByPage";

async function fetchTopicPage(nextPageNumber) {

    console.log(`nextPage = ${nextPageNumber}`)

    try {

        const page = await getTopicsByPage(nextPageNumber);

        let topics = {};

        page.forEach(topic => {

            topics[topic.id] = {
                ...topic,

                //todo: remove below line, just for experiment
                topic_title: topic.id
            };

        });

        //return pageNumber fetched and the topics
        return {

            pageNumber: nextPageNumber,

            topics: topics

        };

    } catch (e) {

        //todo: toast the error message here

        return;
    }

}


export { fetchTopicPage };