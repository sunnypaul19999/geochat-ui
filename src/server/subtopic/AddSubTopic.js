import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(topicId, subTopicTitle, subTopicDescription) {

    return axios.post(subTopicEndpointConfig.add.uri(topicId), {

        sub_topic_title: subTopicTitle,

        sub_topic_description: subTopicDescription

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


export async function addSubTopic(topicId, subTopicTitle, subTopicDescription) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(topicId, subTopicTitle, subTopicDescription);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}