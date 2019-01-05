import _ from 'lodash';
import crypto from 'crypto';
import qs from 'querystring';
import config from '../../../../../config.json';

import * as twitchApiService from './twitch-api';

export const scopes = [
    'user_read',
    // 'channel_editor',
    'channel_subscriptions',
    'channel_check_subscription',
];

export function buildRedirectURL(state) {
    const query = qs.stringify({
        client_id: config.twitch.clientId,
        redirect_uri: config.twitch.redirect,
        scope: scopes.join(' '),
        response_type: 'code',
        state: state,
    });
    const url = `https://id.twitch.tv/oauth2/authorize?${query}`;
    return url;
}

export function generateState() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(8, (err, buf) => {
            if (err) {
                return reject(err);
            }
            return resolve(buf.toString('hex'));
        });
    });
}

export async function authenticateUser(code, scope) {
    const rawscopeArr = scope.split(' ');
    if (!_.isEqual(rawscopeArr, scopes)) {
        throw new Error('Incorrect scopes.');
    }
    const tokenPayload = await twitchApiService.fetchTokenPayload(code);
}
