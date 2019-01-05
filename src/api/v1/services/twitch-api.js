import qs from 'querystring';
import * as cacheService from './cache';
import ExternalApiError from '../errors/external-api';
import twitchApiClient from '../clients/twitch-api';

export async function getStream(channelName) {
    const cacheKey = `streams.${channelName}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    try {
        const res = await twitchApiClient.get(`/helix/streams?user_login=${channelName}&first=1`);
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
    const cacheKey = `channels-kraken.${channelName}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await twitchApiClient.get(`/kraken/channels/${channelName}`);
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
    const res = await twitchApiClient.get('/helix/users', { params: query });
    if (res.status !== 200) {
        throw new ExternalApiError(`Invalid status code from Twitch API: ${res.status}`, res.status, true);
    }
    const user = res.data.data[0];
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
    const res = await twitchApiClient.get(`/kraken/users/${id}/chat?api_version=5`);
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
