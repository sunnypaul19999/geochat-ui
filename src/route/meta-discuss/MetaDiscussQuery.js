import { getMetaDiscussByPage } from "server/meta-discuss/GetMetaDiscussByPage";


async function fetchMetaDiscussPage(topicId, subTopicId, nextPageNumber) {

    try {

        const page = await getMetaDiscussByPage(topicId, subTopicId, nextPageNumber);

        let messages = {};

        page.forEach(message => {

            messages[message.message_id] = {

                ...message,

                message: `message ${message.message_id}`
            };

        });

        //return pageNumber fetched and the topics
        return {

            pageNumber: nextPageNumber,

            messages: messages

        };

    } catch (e) {

        //todo: toast the error message here
        console.log(e);

        return;
    }

}


export { fetchMetaDiscussPage };