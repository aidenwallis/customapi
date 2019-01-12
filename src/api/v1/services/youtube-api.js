import * as cacheService from './cache';
import youtubeClient from '../clients/youtube';

export async function fetchVideoFromCache(query) {
    const res = await cacheService.getFromCache(`youtube-latest.${query}`);
    if (res) {
        return res;
    }
    return null;
}

export function cacheResponse(query, video) {
    cacheService.cache60s(`youtube-latest.${query}`, video);
}

export async function getYTChannelID(username) {
    const res = await youtubeClient.get('search', {
        params: {
            q: username,
            type: 'channel',
            maxResults: 1,
            part: 'snippet',
            fields: 'items/snippet/channelId',
        },
    });
    if (!res.data.items[0]) {
        return null;
    }
    return res.data.items[0].snippet.channelId;
}

export async function fetchLatestVideo(channelID) {
    const res = await youtubeClient.get('search', {
        params: {
            channelId: channelID,
            maxResults: 1,
            order: 'date',
            type: 'video',
            part: 'snippet',
            fields: 'items/snippet/title,items/id/videoId',
        },
    });
    if (!res.data.items[0]) {
        return null;
    }
    return res.data.items[0];
}

export function compileResponse(video, query) {
    let text = '';
    if (!query.excludeTitle) {
        if (query.titleQuotations) {
            text += '"';
        }
        text += video.snippet.title;
        if (query.titleQuotations) {
            text += '"';
        }
        text += ' - ';
    }
    if (!query.idOnly) {
        text += 'https://';
        text += query.longUrl ? 'youtube.com/watch?v=' : 'youtu.be/';
    }
    text += video.id.videoId;
    return text;
}
