import * as cacheService from './cache';
import config from '../../../../config.json';
import ExternalApiError from '../errors/external-api';
import {twitchAuthClient, twitchKrakenClient, twitchHelixClient} from '../clients/twitch-api';
import logger from '../../../util/logger';

function getHelixToken() {
    return twitchAuthClient.post('oauth2/token', undefined, {
        params: {
            client_id: config.twitch.clientId,
            client_secret: config.twitch.clientSecret,
            grant_type: 'client_credentials',
        },
    }).then((res) => {
        if (!res.data || res.status !== 200) {
            return Promise.reject(res.data.error || 'Non 200 http status code returned');
        }
        twitchHelixClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
    });
}

export function startHelixToken() {
    getHelixToken().then(() => {
        logger.info('Retrieved helix token from Twitch!');
        setTimeout(startHelixToken, 60 * 1000 * 60 * 24);
    }).catch((err) => {
        logger.error('Failed to get bearer token from helix', err.toString());
        setTimeout(startHelixToken, 5000);
    });
}

export async function getStream(channelName) {
    const cacheKey = `streams.${channelName}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    try {
        const res = await twitchHelixClient.get(`/helix/streams?user_login=${channelName}&first=1`);
        if (res.status !== 200) {
            throw new ExternalApiError(`Invalid status code from Twitch API: ${res.status}`, res.status, true);
        }
        const r = res.data.data ? res.data.data[0] : null;
        if (r) {
            cacheService.cache60s(cacheKey, r);
        }
        return r;
    } catch (err) {
        throw new ExternalApiError('Twitch API error', 500, true);
    }
}

export async function getChannel(channelName) {
    const user = await getUser({login: channelName});
    if (!user) {
        throw new ExternalApiError('User not found', 404, true);
    }
    const cacheKey = `channels-kraken-v5.${user.id}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await twitchKrakenClient.get(`/kraken/channels/${user.id}`);
    if (res.status === 404) {
        return null;
    }
    if (res.status !== 200) {
        throw new ExternalApiError(`Invalid status code from Twitch API: ${res.status}`, res.status, true);
    }
    cacheService.cache60s(cacheKey, res.data);
    return res.data;
}

export async function getUser(query) {
    const cacheKey = `twitch-users-by-${query.login ? 'login' : 'id'}.${query.login || query.id}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await twitchHelixClient.get('/helix/users', {params: query});
    if (res.status !== 200) {
        throw new ExternalApiError(`Invalid status code from Twitch API: ${res.status}`, res.status, true);
    }
    const [user] = res.data.data;
    if (user) {
        cacheService.cache5m(cacheKey, user);
    }
    return user;
}

export async function getBotStatus(id) {
    const cacheKey = `twitch-bot-statuses.${id}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await twitchKrakenClient.get(`/kraken/users/${id}/chat`);
    if (res.status !== 200) {
        throw new ExternalApiError('User not found', 404, true);
    }
    cacheService.cache5m(cacheKey, res.data);
    return res.data;
}

export function calculateRatelimit(verifiedBot, knownBot) {
    if (verifiedBot) {
        return 7500;
    }
    if (knownBot) {
        return 100;
    }
    return 20;
}
