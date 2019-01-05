import * as externalEmoteApiService from '../services/external-emote-api';
import ExternalApiError from '../errors/external-api';

export function bttv(req, res) {
    externalEmoteApiService.getBTTVEmotes(req.params.channel)
        .then((emotes) => res.send(emotes.map((e) => e.code).join(' ')))
        .catch((err) => res.handleError(err));
}

export function ffz(req, res) {
    externalEmoteApiService.getFFZEmotes(req.params.channel)
        .then((set) => res.send(set.emoticons.map((e) => e.name).join(' ')))
        .catch((err) => res.handleError(err));
}

export function twitch(req, res) {
    externalEmoteApiService.getTwitchEmotes(req.params.channel)
        .then((emotes) => {
            if (!emotes) {
                throw new ExternalApiError('Channel not found', 404, true);
            }
            return res.send(emotes.join(' '));
        })
        .catch((err) => res.handleError(err));
}
