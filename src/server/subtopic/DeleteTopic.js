import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(subTopicId) {

    return axios.delete(subTopicEndpointConfig.delete.uri(subTopicId), {

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


export async function updateSubTopic(subTopicId) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(subTopicId);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}