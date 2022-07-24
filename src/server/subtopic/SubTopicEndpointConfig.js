import { serverConfig } from "config.js/ServerConfig"

const serverUrl = serverConfig.config.baseUrl;

const getBase = (topicId) => {
    return `${serverUrl}/geopoint/topic/${topicId}/subtopic`;
};

export const subTopicEndpointConfig = {

    getById: {

        uri: (topicId, subTopicId) => { return `${getBase(topicId)}/${subTopicId}` },

        method: 'GET',

        response: {
            //get topic at index 0
            topics: [
                {
                    plus_code: null,
                    id: null,
                    topic_title: null
                }
            ]
        }

    },

    getAll: {

        uri: (topicId) => { return `${getBase(topicId)}/all` },

        method: 'GET',

        response: {
            "execution_status": true,
            "subtopic": [
                {
                    "geo_point_plus_code": null,
                    "topic_id": null,
                    "sub_topic_id": null,
                    "sub_topic_title": null,
                    "sub_topic_description": null
                }
            ]
        }

    },

    getByPage: {

        uri: (topicId, subTopicPageNumber) => { return `${getBase(topicId)}/page/${subTopicPageNumber}` },

        method: 'GET',

        response: {
            "execution_status": true,
            "subtopic": [
                {
                    "geo_point_plus_code": null,
                    "topic_id": null,
                    "sub_topic_id": null,
                    "sub_topic_title": null,
                    "sub_topic_description": null
                }
            ]
        }

    },

    add: {

        uri: (topicId) => { return `${getBase(topicId)}/add` },

        method: 'POST',

        body: {
            "sub_topic_title": null,
            "sub_topic_description": null
        },

        response: {
            "execution_status": null,
            "sub_topic_id": null
        }

    },

    update: {

        uri: (topicId, subTopicId) => { return `${getBase(topicId)}/update/${subTopicId}` },

        method: 'PUT',

        body: {
            "sub_topic_title": null,
            "sub_topic_description": null
        },

        response: {}

    },

    delete: {

        uri: (topicId, subTopicId) => { return `${getBase(topicId)}/delete/${subTopicId}` },

        method: 'DELETE',

        response: {
            "execution_status": null,
            "subtopic": [
                {
                    "geo_point_plus_code": null,
                    "topic_id": null,
                    "sub_topic_id": null,
                    "sub_topic_title": null,
                    "sub_topic_description": null
                }
            ]
        }

    },
}