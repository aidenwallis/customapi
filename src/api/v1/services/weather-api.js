import config from '../../../../config.json';

import * as cacheService from './cache';
import genericApiClient from '../clients/generic-api';

const cardinalDirections = {
    'North': [337.5, 22.5],
    'North-East': [22.5, 67.5],
    'East': [67.5, 112.5],
    'South-East': [112.5, 167.5],
    'South-West': [202.5, 247.5],
    'South': [167.5, 202.5],
    'West': [247.5, 292.5],
    'North-East': [292.5, 337.5],
};

function getDirection(bearing) {
    for (let dir in cardinalDirections) {
        if (bearing >= cardinalDirections[dir][0] && bearing <= cardinalDirections[dir][1]) {
            return dir;
        }
    }
    return 'Unknown';
}

function convertToC(temp) {
    const converted = (temp - 32) / 1.8;
    return `${Math.round(converted)} C`;
}

function convertToF(temp) {
    const converted = (temp * 9 / 5) + 32;
    return `${Math.round(converted)} F`;
}

function convertToMPH(speed) {
    return `${Math.round(speed * 2.2369)} MPH`;
}

function convertToKMH(speed) {
    return `${Math.round(speed * 3.6)} KPH`;
}

function parseWeather(payload) {
    if (!payload.list.length) {
        return 'Weather location not found';
    }
    const data = payload.list[0];
    const temp = data.main.temp - 273.15;
    const conditions = data.weather.length ? data.weather.map(w => w.description).join(', ') : 'unknown conditions';
    let text = `Weather for ${data.name}, ${data.sys.country}: `;
    text += `With ${conditions}`;
    text += ` and a temperature of ${Math.round(temp)} C (${convertToF(temp)}). `;
    text += `The wind is blowing from the ${getDirection(data.wind.deg)} at ${convertToMPH(data.wind.speed)} (${convertToKMH(data.wind.speed)})`;
    text += ` and the current humidity is ${data.main.humidity}%.`;
    return text;
}

export async function getWeather(query) {
    const cacheKey = `weather-lookups:${query}`;
    const cacheHit = await cacheService.getFromCache(cacheKey);
    if (cacheHit) {
        return parseWeather(cacheHit);
    }
    const res = await genericApiClient.get('https://api.openweathermap.org/data/2.5/find', {
        params: {
            q: query,
            appid: config.openweatherApiKey,
        },
    });
    cacheService.cache60s(cacheKey, res.data);
    return parseWeather(res.data);
}
