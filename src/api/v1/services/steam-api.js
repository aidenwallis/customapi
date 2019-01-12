import logger from '../../../util/logger';

import genericApiClient from '../clients/generic-api';
import * as cacheService from './cache';

function fetchSteamGames() {
    logger.info('Sending polling request to Steam API...');
    genericApiClient.get('https://api.steampowered.com/ISteamApps/GetAppList/v0001/')
        .then((res) => {
            cacheService.set('steam-games:last-request', new Date(), false);
            const apps = res.data.applist.apps.app;
            for (let i = 0; i < apps.length; i++) {
                const game = apps[i];
                cacheService.cache45m(`steam-games:game:${game.name}`, game.appid, false);
            }
            logger.info(`Saved ${apps.length} steam games into cache!`);
            setTimeout(() => fetchSteamGames(), 30 * 60 * 1000);
        })
        .catch((err) => {
            logger.error('Failed to fetch games from Steam API.');
            logger.error(err);
            setTimeout(() => fetchSteamGames(), 60 * 1000);
        });
}

async function startSteamPolling() {
    const lastRequest = await cacheService.getFromCache('steam-games:last-request', false);
    if (!lastRequest) {
        fetchSteamGames();
        return;
    }
    const now = new Date();
    const date = new Date(lastRequest);
    date.setMinutes(date.getMinutes() + 30);
    if (now > date) {
        fetchSteamGames();
        return;
    }
    const delta = date - now;
    logger.info(`Waiting ${delta}ms before sending a request to Steam...`);
    setTimeout(() => fetchSteamGames(), delta);
}

startSteamPolling();

export function getSteamGame(name) {
    return cacheService.getFromCache(`steam-games:game:${name}`, false);
}

export function transformGame(game) {
    return getSteamGame(game)
        .then((res) => {
            if (res) {
                return `${game} - https://store.steampowered.com/app/${res}`;
            }
            return game;
        });
}
