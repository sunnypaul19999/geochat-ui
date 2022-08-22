import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicId, topicTitle) {

    return axios.put(topicEndpointConfig.update.uri(topicId), {

        topic_title: topicTitle

    }, {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function updateTopic(topicId, topicTitle) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(topicId, topicTitle);

        return 'Topic updated!';

    } catch (e) {

        console.log(e);

        return e.response.data.message;
    }

}