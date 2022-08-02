import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(topicId, subTopicPageNumber) {

    return axios.get(subTopicEndpointConfig.getByPage.uri(topicId, subTopicPageNumber), {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function getSubTopicsByPage(topicId, subTopicPageNumber) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicId, subTopicPageNumber);

        return request.data.subtopic;

    } catch (e) {

        console.log(e);

    }

}