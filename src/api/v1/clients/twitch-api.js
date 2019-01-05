import axios from 'axios';
import config from '../../../../config.json';

const client = axios.create({
    baseURL: 'https://api.twitch.tv/',
    headers: {
        'Client-ID': config.twitch.clientId,
    },
    timeout: 5000,
});

export default client;
