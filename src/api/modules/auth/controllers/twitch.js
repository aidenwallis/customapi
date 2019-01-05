import * as twitchAuthService from '../services/twitch-auth';
import logger from '../../../../util/logger';



export async function redirect(req, res) {
    const state = await twitchAuthService.generateState();
    const redirectURL = twitchAuthService.buildRedirectURL(state);
    req.session.oauthState = state;
    res.redirect(redirectURL);
}

export async function callback(req, res) {
    if (!req.query.code || !req.query.scope || !req.query.state || req.query.state !== req.session.oauthState) {
        return redirect(req, res);
    }

    try {
        const user = await twitchAuthService.authenticateUser(req.query.code, req.query.scope);
        console.log(user);
        return res.json(user);
    } catch (err) {
        logger.error('Auth error', err);
        redirect(req, res);
    }
}
