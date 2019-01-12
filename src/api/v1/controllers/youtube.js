import * as youtubeApiService from '../services/youtube-api';

export async function latest(req, res) {
    let {name} = req.params;
    const cacheRes = await youtubeApiService.fetchVideoFromCache(name);
    if (cacheRes) {
        return res.send(youtubeApiService.compileResponse(cacheRes, req.query));
    }
    try {
        if (name.length < 24) {
            name = await youtubeApiService.getYTChannelID(name);
            if (!name) {
                return res.status(404).send('YouTube channel not found!');
            }
        }
        const video = await youtubeApiService.fetchLatestVideo(name);
        if (!video) {
            return res.status(404).send('No video found for channel');
        }
        youtubeApiService.cacheResponse(name, video);
        const text = youtubeApiService.compileResponse(video, req.query);
        return res.send(text);
    } catch (err) {
        res.handleError(err);
    }
}
