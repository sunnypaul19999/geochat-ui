import { serverConfig } from "config.js/ServerConfig"

const serverUrl = serverConfig.config.baseUrl;

const getBase = (topicId, subTopicId) => {
    return `${serverUrl}/geopoint/topic/${topicId}/subTopic/${subTopicId}/subTopicMetaDiscussion`;
};

export const metaDiscussEndpointConfig = {

    // getById: {

    //     uri: (topicId, subTopicId, metaDiscussId) => { return `${getBase(topicId, subTopicId)}/message/${metaDiscussId}` },

    //     method: 'GET',

    //     response: {
    //         //get topic at index 0
    //         topics: [
    //             {
    //                 plus_code: null,
    //                 id: null,
    //                 topic_title: null
    //             }
    //         ]
    //     }

    // },

    getAll: {

        uri: (topicId, subTopicId) => { return `${getBase(topicId, subTopicId)}/all` },

        method: 'GET',

        response: {
            "execution_status": null,
            "sub_topic_meta_discussion": [
                {
                    "message_id": null,
                    "sender_username": null,
                    "message": null
                }
            ]
        }

    },

    getByPage: {

        uri: (topicId, subTopicId, metaDiscussPageNumber) => { return `${getBase(topicId, subTopicId)}/page/${metaDiscussPageNumber}` },

        method: 'GET',

        response: {
            "execution_status": null,
            "sub_topic_meta_discussion": [
                {
                    "message_id": null,
                    "sender_username": null,
                    "message": null
                }
            ]
        }

    },

    add: {

        uri: (topicId, subTopicId) => { return `${getBase(topicId, subTopicId)}/add` },

        method: 'POST',

        body: {
            "message": null
        },

        response: {
            "execution_status": null,
            "message_id": null
        }

    },

    delete: {

        uri: (topicId, subTopicId, metaDiscussId) => { return `${getBase(topicId, subTopicId)}/message/delete/${metaDiscussId}` },

        method: 'DELETE',

        response: {
            "execution_status": null,
            "sub_topic_meta_discussion": [
                {
                    "message_id": null,
                    "sender_username": null,
                    "message": null
                }
            ]
        }

    },
}