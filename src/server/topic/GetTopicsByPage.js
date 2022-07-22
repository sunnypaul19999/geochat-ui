import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { topicEndpointConfig } from "./TopicEndpointConfig";


function createRequest(topicPageNumber) {

    return axios.get('http://localhost:5000/geochat/api/v1/geopoint/topic/page/1', {

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