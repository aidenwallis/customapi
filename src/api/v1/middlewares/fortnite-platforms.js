const platforms = {
    pc: true,
    xbl: true,
    psn: true,
};

export default function fortnitePlatformsMiddleware(req, res, next) {
    if (!req.params.platform) {
        return next();
    }
    const p = req.params.platform.toLowerCase();
    if (!platforms[p]) {
        return res.status(400).send('Invalid platform, must be "xbl", "psn" or "pc"');
    }
    next();
}
