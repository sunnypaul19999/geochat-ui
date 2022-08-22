import { getSubTopicById } from "server/subtopic/GetSubTopicById";
import { getSubTopicsByPage } from "server/subtopic/GetSubTopicsByPage";

const format = (page) => {

    let subTopics = {};

    page.forEach(subTopic => {

        subTopics[subTopic.sub_topic_id] = {
            ...subTopic,

            //todo: remove below line, just for experiment
            // sub_topic_title: `sub-topic ${subTopic.sub_topic_id}`
        };

    });

    return subTopics;
}

async function fetchSubTopicPage(topicId, nextPageNumber) {

    try {

        const page = await getSubTopicsByPage(topicId, nextPageNumber);

        let subTopics = format(page);


        //return pageNumber fetched and the topics
        return {

            pageNumber: nextPageNumber,

            subTopics: subTopics

        };

    } catch (e) {

        //todo: toast the error message here
        console.log(e);

        return;
    }

}

async function fetchSubTopicById(topicId, subTopicId) {

    try {

        const page = await getSubTopicById(topicId, subTopicId);

        let subTopics = format(page);

        //return pageNumber fetched and the topics
        return subTopics[subTopicId];

    } catch (e) {

        //todo: toast the error message here
        console.log(e);

        return;
    }

}


export { fetchSubTopicPage, fetchSubTopicById };