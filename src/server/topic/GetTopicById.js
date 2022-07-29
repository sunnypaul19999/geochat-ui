import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicId) {

    return axios.get(topicEndpointConfig.getById.uri(topicId), {

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


export async function getTopicById(topicId) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicId);

        return request.data.topics;

    } catch (e) {

        console.log(e);

    }

}