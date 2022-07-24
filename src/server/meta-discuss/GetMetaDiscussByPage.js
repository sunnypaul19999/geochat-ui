import axios from "axios";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

import { metaDiscussEndpointConfig } from "./MetaDiscussEndpointConfig";


function createRequest(topicId, subTopicID, metaDiscussPageNumber) {

    return axios.get(metaDiscussEndpointConfig.getByPage.uri(topicId, subTopicID, metaDiscussPageNumber), {

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


export async function getMetaDiscussByPage(topicId, subTopicID, metaDiscussPageNumber) {

    try {

        //register geoPoint on every request
        await registerGeoPoint();

        const request = await createRequest(topicId, subTopicID, metaDiscussPageNumber);

        return request.data.sub_topic_meta_discussion;

    } catch (e) {

        console.log(e);

    }

}