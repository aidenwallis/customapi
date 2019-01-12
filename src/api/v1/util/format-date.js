function dateDiff(from, to) {
    const diff = to - from;
    if (diff < 0) {
        return dateDiff(to, from);
    }
    const returnArr = [];
    const d = Math.floor(diff / (60 * 60 * 1000 * 24) * 1);
    if (d > 0) {
        returnArr.push(`${d < 10 ? '0' : ''}${d}d`);
    }

    const hours = Math.floor((diff % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
    if (hours && hours > 0) {
        returnArr.push(`${hours < 10 ? '0' : ''}${hours}h`);
    }

    const mins = Math.floor(((diff % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
    if (mins && mins > 0) {
        returnArr.push(`${mins < 10 ? '0' : ''}${mins}m`);
    }

    const secs = Math.floor((((diff % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
    if (secs && secs > 0) {
        returnArr.push(`${secs < 10 ? '0' : ''}${secs}s`);
    }

    if (returnArr.length === 0) {
        return '0s';
    }

    if (returnArr.length === 1) {
        return returnArr[0];
    }

    const last = returnArr.pop();

    return `${returnArr.join(', ')} and ${last}`;
}

export default function formatDuration(timestamp) {
    const d = new Date(timestamp);
    const now = new Date();
    return dateDiff(d, now);
}
