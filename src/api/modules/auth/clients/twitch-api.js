import axios from 'axios';
import config from '../../../../../config.json';

const client = axios.create({
    baseURL: 'https://api.twitch.tv/kraken/',
    timeout: 5000,
    headers: {
        'Client-ID': config.twitch.clientId,
    },
});

export default client;
