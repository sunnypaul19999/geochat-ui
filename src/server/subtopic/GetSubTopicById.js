import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(topicId, subTopicId) {

    return axios.get(subTopicEndpointConfig.getById.uri(topicId, subTopicId), {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function getSubTopicById(topicId, subTopicId) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicId, subTopicId);

        return request.data.subtopic;

    } catch (e) {

        console.log(e);

    }

}