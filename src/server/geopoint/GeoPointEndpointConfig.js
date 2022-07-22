import { serverConfig } from "config.js/ServerConfig"

const serverUrl = serverConfig.config.baseUrl;

const base = `${serverUrl}/geopoint`;
export const geoPointEndpointConfig = {

    register: {

        uri: () => { return `${base}/register` },

        method: 'POST',

        response: {
            plus_code: null,
            message: null
        },

    }

}