import * as weatherApiService from '../services/weather-api';

export function yahoo(req, res) {
    weatherApiService.getYahooWeather(req.params.query)
        .then((data) => res.send(data))
        .catch((err) => res.handleError(err));
}
