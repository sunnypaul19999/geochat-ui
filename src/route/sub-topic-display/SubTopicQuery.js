import { getSubTopicsByPage } from "server/subtopic/GetSubTopicsByPage";

async function fetchSubTopicPage(topicId, nextPageNumber) {

    console.log(`topicId = ${topicId}`)

    try {

        const page = await getSubTopicsByPage(topicId, nextPageNumber);

        let subTopics = {};

        page.forEach(subTopic => {

            subTopics[subTopic.sub_topic_id] = {
                ...subTopic,

                //todo: remove below line, just for experiment
                sub_topic_title: `sub-topic ${subTopic.sub_topic_id}`
            };

        });


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


export { fetchSubTopicPage };