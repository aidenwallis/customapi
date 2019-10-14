import axios from 'axios';
import config from '../../../../config.json';

export const twitchHelixClient = axios.create({
    baseURL: 'https://api.twitch.tv/',
    headers: {
        'Client-ID': config.twitch.clientId,
    },
    timeout: 5000,
});

export const twitchKrakenClient = axios.create({
    baseURL: 'https://api.twitch.tv/',
    headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': config.twitch.clientId,
    },
    timeout: 5000,
});

export const twitchAuthClient = axios.create({
    baseURL: 'https://id.twitch.tv/',
    headers: {
        'Client-ID': config.twitch.clientId,
    },
    timeout: 15000,
});
