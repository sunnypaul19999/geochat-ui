import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(subTopicId) {

    return axios.get(subTopicEndpointConfig.getById.uri(subTopicId), {

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


export async function getSubTopicById(subTopicId) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(subTopicId);

        return request.data.subtopic;

    } catch (e) {

        console.log(e);

    }

}