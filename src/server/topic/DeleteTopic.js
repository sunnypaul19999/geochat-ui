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

        return "Topic deleted!";

    } catch (e) {

        console.log(e);

        return e.response.data.message;
    }

}