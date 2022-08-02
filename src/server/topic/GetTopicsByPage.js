import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicPageNumber) {

    return axios.get(topicEndpointConfig.getByPage.uri(topicPageNumber), {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function getTopicsByPage(topicPageNumber) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicPageNumber);

        return request.data.topics;

    } catch (e) {

        console.log(e);

    }

}