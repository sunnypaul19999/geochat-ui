import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { subTopicEndpointConfig } from "./SubTopicEndpointConfig";


function createRequest(topicId, subTopicId, subTopicTitle, subTopicDescription) {

    return axios.put(subTopicEndpointConfig.update.uri(topicId, subTopicId), {

        sub_topic_title: subTopicTitle,

        sub_topic_description: subTopicDescription

    }, {

        withCredentials: true,

        headers: {
            "Content-Type": "application/json",
        },

    });

}


export async function updateSubTopic(topicId, subTopicId, subTopicTitle, subTopicDescription) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const response = await createRequest(topicId, subTopicId, subTopicTitle, subTopicDescription);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}