import formatDate from '../util/format-date';
import ExternalApiError from '../errors/external-api';
import * as steamApiService from '../services/steam-api';
import * as twitchApiService from '../services/twitch-api';

export function uptime(req, res) {
    twitchApiService.getStream(req.params.channel)
        .then((stream) => {
            if (!stream) {
                throw new ExternalApiError('Channel not found or is not live', 404, true);
            }
            return res.send(`${stream.user_name} has been live for ${formatDate(stream.started_at)}`);
        })
        .catch((err) => res.handleError(err));
}

export function title(req, res) {
    twitchApiService.getChannel(req.params.channel)
        .then((channel) => {
            if (!channel) {
                throw new ExternalApiError('Channel not found', 404, true);
            }
            return res.send(channel.status);
        })
        .catch((err) => res.handleError(err));
}

export function game(req, res) {
    twitchApiService.getChannel(req.params.channel)
        .then((channel) => {
            if (!channel) {
                throw new ExternalApiError('Channel not found', 404, true);
            }
            return channel.game;
        })
        .then((game) => {
            if (!req.query.steamGame) {
                return game;
            }
            return steamApiService.transformGame(game);
        })
        .then((game) => res.send(game))
        .catch((err) => res.handleError(err));
}

export function toID(req, res) {
    twitchApiService.getUser({ login: req.params.name })
        .then((user) => {
            if (!user) {
                throw new ExternalApiError('User not found', 404, true);
            }
            return res.send(user.id);
        })
        .catch((err) => res.handleError(err));
}

export function toName(req, res) {
    twitchApiService.getUser({ id: req.params.id })
        .then((user) => {
            if (!user) {
                throw new ExternalApiError('User not found', 404, true);
            }
            return res.send(user.login);
        })
        .catch((err) => res.handleError(err));
}

export async function botStatus(req, res) {
    try {
        const user = await twitchApiService.getUser({ login: req.params.name });
        if (!user) {
            throw new ExternalApiError('User not found', 404, true);
        }
        const status = await twitchApiService.getBotStatus(user.id);
        let text = `Verified bot: ${!!status.is_verified_bot} - Known bot: ${!!status.is_known_bot}`;
        if (req.query.includeLimits) {
            text += '. ';
            text += 'Rate limits are: ';
            text += twitchApiService.calculateRatelimit(status.is_verified_bot, status.is_known_bot);
            text += ' per 30s.';
        }
        return res.send(text);
    } catch (err) {
        res.handleError(err);
    }
}
