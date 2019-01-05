import axios from 'axios';
import config from '../../../../config.json';

const client = axios.create({
    timeout: 5000,
    params: {
        key: config.youtubeApiKey,
    },
    baseURL: 'https://www.googleapis.com/youtube/v3/',
});

export default client;
