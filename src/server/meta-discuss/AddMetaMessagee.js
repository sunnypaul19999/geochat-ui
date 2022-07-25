import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { metaDiscussEndpointConfig } from "./MetaDiscussEndpointConfig";


function createRequest(topicId, subTopicID, message) {

    return axios.post(metaDiscussEndpointConfig.add.uri(topicId, subTopicID), {

        message: message

    }, {

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




export async function addMetaMessage(topicId, subTopicID, message) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicId, subTopicID, message);

        return request.data;

    } catch (e) {

        console.log(e);

    }

}