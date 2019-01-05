import redisClient from '../../../redis';

export function getFromCache(key, json = true) {
    return redisClient.get(key, json);
}

export function set(key, value, json = true) {
    return redisClient.set(key, value, json);
}

export function cache60s(key, value, json = true) {
    return redisClient.setWithExpiry(key, value, 60, json);
}

export function cache5m(key, value, json = true) {
    return redisClient.setWithExpiry(key, value, 300, json);
}

export function cache30m(key, value, json = true) {
    return redisClient.setWithExpiry(key, value, 1800, json);
}

export function cache45m(key, value, json = true) {
    return redisClient.setWithExpiry(key, value, 2700, json);
}
