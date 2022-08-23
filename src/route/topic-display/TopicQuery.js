import { getTopicById } from "server/topic/GetTopicById";
import { getTopicsByPage } from "server/topic/GetTopicsByPage";

const format = (page) => {

    let topics = {};

    page.forEach(topic => {

        topics[topic.id] = {
            ...topic,

            //todo: remove below line, just for experiment
            // topic_title: `topic ${topic.id}`
        };

    });

    return topics;
}

async function fetchTopicPage(nextPageNumber) {

    // console.log(`nextPage = ${nextPageNumber}`)

    try {

        const page = await getTopicsByPage(nextPageNumber);

        let topics = format(page);

        // console.log(`fetching page topic ${nextPageNumber}`);

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

async function fetchTopicById(topicId) {


    try {

        let topics = await getTopicById(topicId);

        topics = format(topics);

        return topics[topicId];

    } catch (e) {

        console.log(e);

    }
}


export { fetchTopicPage, fetchTopicById };