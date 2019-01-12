import axios from 'axios';
import * as cacheService from './cache';
import fortniteApiClient from '../clients/fortnite';

export function getCurrentWins(payload) {
    return payload.stats.curr_p2.top1.valueInt + payload.stats.curr_p10.top1.valueInt + payload.stats.curr_p9.top1.valueInt;
}

export function getSoloCurrentWins(payload) {
    return payload.stats.curr_p2.top1.value;
}

export function getSoloTotalWins(payload) {
    return payload.stats.p2.top1.value;
}

export function getDuoCurrentWins(payload) {
    return payload.stats.curr_p10.top1.value;
}

export function getDuoTotalWins(payload) {
    return payload.stats.p10.top1.value;
}

export function getSquadCurrentWins(payload) {
    return payload.stats.curr_p9.top1.value;
}

export function getSquadTotalWins(payload) {
    return payload.stats.p9.top1.value;
}

export function getWinRatio(payload) {
    return `${payload.stats.p2.winRatio.value}%`;
}

export const resolvers = {
    wins_current: getCurrentWins,
    solowin_current: getSoloCurrentWins,
    solowin_total: getSoloTotalWins,
    duowin_current: getDuoCurrentWins,
    duowin_total: getDuoTotalWins,
    squadwin_current: getSquadCurrentWins,
    squadwin_total: getSquadTotalWins,
    wins_ratio: getWinRatio,
};

export const resolverNames = Object.keys(resolvers);

export async function getWinStats(username, platform) {
    const cacheKey = `fortnite-wins.${platform}.${username}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await axios.get(`https://fortnitetracker.com/profile/${platform}/${username}/obs/data/-60`);
    if (res.status !== 200) {
        return null;
    }
    cacheService.cache60s(cacheKey, res.data);
    return res.data;
}

export async function getProfile(username, platform) {
    const cacheKey = `fortnite-profile.${platform}.${username}`;
    const cacheRes = await cacheService.getFromCache(cacheKey);
    if (cacheRes) {
        return cacheRes;
    }
    const res = await fortniteApiClient.get(`profile/${platform}/${username}`);
    if (res.status !== 200) {
        return null;
    }
    cacheService.cache60s(cacheKey, res.data);
    return res.data;
}
