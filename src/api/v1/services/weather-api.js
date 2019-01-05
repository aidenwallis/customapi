import weatherClient from '../clients/weather';
import ExternalApiError from '../errors/external-api';

const cardinalDirections = {
    'North': [337.5, 22.5],
    'North-East': [22.5, 67.5],
    'East': [67.5, 112.5],
    'South-East': [112.5, 167.5],
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

export async function getYahooWeather(query) {
    const res = await weatherClient.get('https://query.yahooapis.com/v1/public/yql', {
        params: {
            q: `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${encodeURIComponent(query)}")`,
            format: 'json',
            env: 'store.datatables.org/alltableswithkeys',
        },
    });
    const { data } = res;
    if (!data.query.results || !data.query.results.channel.location) {
        throw new ExternalApiError('Weather location not found', 404, true);
    }
    const result = data.query.results.channel;
    let text = 'Weather for ';
    text += `${result.location.city}, ${result.location.region}: `;
    text += `Conditions are ${result.item.condition.text}`;
    text += ` with a temperature of ${Math.round(result.item.condition.temp)} ${result.units.temperature.toUpperCase()} (`;
    text += `${result.units.temperature.toUpperCase() === 'F' ? convertToC(result.item.condition.temp) : convertToF(result.item.condition.temp)}). `;
    text += `The wind is blowing from the ${getDirection(result.wind.direction)} at ${result.wind.speed} ${result.units.speed.toUpperCase()} `;
    text += `and the current humidity is ${result.atmosphere.humidity}%.`;
    return text;
}
