import { serverConfig } from "config.js/ServerConfig"

const serverUrl = serverConfig.config.baseUrl;

const base = `${serverUrl}/geopoint/topic`;
export const topicEndpointConfig = {


    getById: {

        uri: (topicId) => { return `${base}/${topicId}` },

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

        uri: () => { return `${base}/all` },

        method: 'GET',

        response: {

            topics: [
                {
                    plus_code: null,
                    id: null,
                    topic_title: null
                }
            ]

        }

    },

    getByPage: {

        uri: (topicPageNumber) => { return `${base}/page/${topicPageNumber}` },

        method: 'GET',

        response: {

            topics: [
                {
                    plus_code: null,
                    id: null,
                    topic_title: null
                }
            ]

        }

    },

    add: {

        uri: () => { return `${base}/add` },

        method: 'POST',

        response: {

            id: null

        }

    },

    update: {

        uri: (topicId) => { return `${base}/update/${topicId}` },

        method: 'PUT',

        response: {}

    },

    delete: {

        uri: (topicId) => { return `${base}/delete/${topicId}` },

        method: 'DELETE',

        response: {

            topics: [
                {
                    plus_code: null,
                    id: null,
                    topic_title: null
                }
            ]

        }

    },
}