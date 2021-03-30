const router = require('express').Router();
const figma = require('./figmaAssets');
const fs = require('fs');
let figmaTokens = {};
try {
    figmaTokens = JSON.parse(
        fs.readFileSync(__dirname + '/../.figma-tokens.json')
    );
} catch {}

router.get('/blah', async (req, res) => {
    res.send('hi');
});

router.get('/assets-by-frame', async (req, res) => {
    const arrayify = (x) => (typeof x === 'string' ? [x] : x);
    if (!req.query.fileKey) {
        return res.status(400).send({ error: 'fileKey must be set.' });
    }
    const personalAccessToken =
        req.params.accessToken || figmaTokens[req.query.fileKey];
    if (!personalAccessToken) {
        return res.status(400).send({
            error: 'No access token provided and none stored for that fileKey',
        });
    }
    if (!req.query.frameId && !req.query.frameName) {
        return res.status(400).send({
            error: 'At least one frameId or frameName must be provided.',
        });
    }
    try {
        const result = await figma.getFigmaIconsByFrames({
            fileKey: req.query.fileKey,
            frameIds: arrayify(req.query.frameId),
            frameNames: arrayify(req.query.frameName),
            scales: arrayify(req.query.scale || [2]),
            personalAccessToken,
        });

        res.send(result);
    } catch (e) {
        res.status(500).send({
            exception: e.message,
        });
    }
});

module.exports = router;
