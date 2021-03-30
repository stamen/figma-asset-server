const figma = require('./figmaAssets');
const figmaTokens = require('../.figma-tokens.json');

async function test() {
    const fileKey = '8cJDHCZSZpECi07CRLZCHc';
    const params = {
        fileKey,
        personalAccessToken: figmaTokens[fileKey],
        // frameIds: ['2:5610'],
        frameIds: ['1:3'],
        frameNames: ['strokes'],
        scales: [1, 2],
    };
    const frameIds = await figma.getFigmaIconsByFrames(params);
    console.log(frameIds);
}
test();
