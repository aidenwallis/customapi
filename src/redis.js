import bluebird from 'bluebird';
import redis from 'redis';
import config from '../config.json';

const cacheNS = 'customapi.cache.';

export function newClient() {
    const c = redis.createClient({host: config.redis, port: 6379});
    bluebird.promisifyAll(c);
    return c;
}

const client = newClient();

export function get(key, json = true) {
    return client.getAsync(cacheNS + key)
        .then((res) => {
            return json && res ? JSON.parse(res) : res;
        });
}

export function set(key, value, json = true) {
    return client.set(cacheNS + key, json ? JSON.stringify(value) : value);
}

export function setWithExpiry(key, value, expiry, json = true) {
    return client.set(cacheNS + key, json ? JSON.stringify(value) : value, 'EX', expiry);
}

export default {get, set, setWithExpiry, client};
