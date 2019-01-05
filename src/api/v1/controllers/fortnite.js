import * as fortniteApiService from '../services/fortnite-api';

export function winsTotal(req, res) {
    fortniteApiService.getWinStats(req.params.username, req.params.platform)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Fortnite user not found!');
            }
            return res.send(req.query.locale ? data.overall.wins.toLocaleString() : data.overall.wins.toString());
        })
        .catch((err) => res.handleError(err));
}

export function winsToday(req, res) {
    fortniteApiService.getWinStats(req.params.username, req.params.platform)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Fortnite user not found!');
            }
            return res.send(req.query.locale ? data.wins.toLocaleString() : data.wins.toString());
        })
        .catch((err) => res.handleError(err));
}

export function statsFromProfile(req, res) {
    const statName = req.params.statName.toLowerCase();
    if (!fortniteApiService.resolvers[statName]) {
        return res.sendStatus(404);
    }
    fortniteApiService.getProfile(req.params.username, req.params.platform)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Fortnite user not found!');
            }
            const resolved = fortniteApiService.resolvers[statName](data);
            return res.send(req.query.locale ? resolved.toLocaleString() : resolved.toString());
        })
        .catch((err) => res.handleError(err));
}
