import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicId, topicTitle) {

    return axios.put(topicEndpointConfig.update.uri(topicId), {

        topic_tilte: topicTitle

    }, {

        withCredentials: true,

        auth: {
            username: 'username',
            password: 'password'
        },

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

        return response.data;

    } catch (e) {

        console.log(e);

    }

}