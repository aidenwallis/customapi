import * as cacheService from './cache';
import * as logger from '../../../util/logger';
import externalEmoteClient from '../clients/external-emote';
import ExternalApiError from '../errors/external-api';

function handleEmoteError(err) {
    if (err.response && err.response.status === 404) {
        throw new ExternalApiError('Channel not found', 404, true);
    }
    throw new ExternalApiError(err);
}

function fetchTwitchEmotes() {
    logger.info('Fetching latest emotes from Twitchemotes.com');
    externalEmoteClient.get('https://twitchemotes.com/api_cache/v3/subscriber.json')
        .then((res) => {
            cacheService.set('twitch-emotes:lastRequest', new Date(), false);
            let count = 0;
            for (let channelID in res.data) {
                const channel = res.data[channelID];
                count++;
                cacheService.cache45m(`twitch-emotes:channel-name:${channel.channel_name}`, channel.emotes.map((e) => e.code));
            }
            logger.info(`Successfully cached ${count} channels!`);
            setTimeout(() => fetchTwitchEmotes(), 30 * 60 * 1000);
        })
        .catch((err) => {
            logger.error('Failed to get latest Twitch emotes from twitchemotes.com');
            logger.error(err);
            setTimeout(() => fetchTwitchEmotes(), 30 * 1000);
        });
}

async function startEmotePolling() {
    const lastRequest = await cacheService.getFromCache('twitch-emotes:lastRequest', false);
    const now = new Date();
    const date = new Date(lastRequest);
    date.setMinutes(date.getMinutes() + 30);
    if (now > date) {
        fetchTwitchEmotes();
        return;
    }
    const delta = date - now;
    logger.info(`Waiting ${delta}ms before sending a Twitchemotes.com poll...`);
    setTimeout(() => fetchTwitchEmotes(), delta);
}

startEmotePolling();

export function getBTTVEmotes(channel) {
    return externalEmoteClient.get(`https://api.betterttv.net/2/channels/${channel}`)
        .then((res) => res.data.emotes)
        .catch((err) => handleEmoteError(err));
}

export function getFFZEmotes(channel) {
    return externalEmoteClient.get(`https://api.frankerfacez.com/v1/room/${channel}`)
        .then((res) => res.data.sets[res.data.room.set])
        .catch((err) => handleEmoteError(err));
}

export function getTwitchEmotes(channel) {
    return cacheService.getFromCache(`twitch-emotes:channel-name:${channel}`);
}
