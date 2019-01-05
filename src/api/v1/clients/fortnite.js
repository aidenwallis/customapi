import axios from 'axios';
import config from '../../../../config.json';

const client = axios.create({
    baseURL: 'https://api.fortnitetracker.com/v1/',
    headers: {
        'TRN-Api-Key': config.fortniteTrackerKey,
    },
    timeout: 5000,
});

export default client;
