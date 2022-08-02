import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicId) {

    return axios.delete(topicEndpointConfig.delete.uri(topicId), {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function deleteTopic(topicId) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(topicId);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}