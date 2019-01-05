import qs from 'querystring';
import twitchAuthClient from '../clients/twitch-auth';
import config from '../../../../../config.json';

export async function fetchTokenPayload(code) {
    const query = qs.stringify({
        client_id: config.twitch.clientId,
        client_secret: config.twitch.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: config.twitch.redirect,
        code: code,
    });
    const res = await twitchAuthClient.post(`token?${query}`);
    return res.data;
}
