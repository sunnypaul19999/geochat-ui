import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicTitle) {

    return axios.post(topicEndpointConfig.add.uri(), {

        topic_title: topicTitle

    }, {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function addTopic(topicTitle) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(topicTitle);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}