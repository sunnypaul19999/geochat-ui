import axios from "axios";

import { geoPointEndpointConfig } from "server/geopoint/GeoPointEndpointConfig";



function createRequest(topicPageNumber) {

    return axios.post(geoPointEndpointConfig.register.uri(), {

        lat: "23.677303229900822",

        lon: "86.94993375397198"

    }, {

        withCredentials: true,

        auth: {
            username: 'username',
            password: 'password'
        }

    });

}


export async function registerGeoPoint() {

    try {

        const response = await createRequest();

        //console.log(response.data);

        return response.data;

    } catch (e) {

        console.log(e);

    }

}