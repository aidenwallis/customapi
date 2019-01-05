import axios from 'axios';
import config from '../../../../../config.json';

const client = axios.create({
    baseURL: 'https://id.twitch.tv/oauth2/',
    timeout: 5000,
    headers: {
        'Client-ID': config.twitch.clientId,
    },
});

export default client;
