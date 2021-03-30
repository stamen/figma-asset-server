## Figma asset server

This tool simplifies the process of getting a number of assets from a Figma file.

Pass it one or more frames, specified by name or ID, and get a list of all the objects in each frame, with an image URL for each. You can request multiple scales at once, useful for constructing a Mapbox spritesheet.

### As a server

Install: `npm install`

Put Figma personal access tokens in `.figma-tokens.json` in this format:

```
{
    "<file key the token is used for>": "<token>"
}
```

This lets you keep your personal access token out of your front end code.

### Calling the API

Call it like this:

`localhost:8002/figma/assets-by-frame/?fileKey=8cJDHCZSZpECi07CRLZCHc&frameName=base`

Arguments:

* `fileKey`: the key for your Figma file. It's in your Figma URL: figma.com/file/yourfilekeyhere/filename?node-id=...
* `accessToken`: your access token, if it's not stored in `.figma-tokens.json`
* `frameId`: zero or more IDs, comma-separated, for frames that contain assets. Get this from the `node-id=` part of your Figma URL. Each looks something like `0:3`
* `frameName`: zero or more names, comma-reparated, for frames that contain assets. Get this from the panel on the left hand side of Figma.
* `scale`: zero or more pixel ratios. `1,2` generates every asset in `@1x` and `@2x` format. This affects the result format. Defaults to `2`

At least one `frameId` or `frameName` is required.

Response:

```
{
    "star": {
        "id": "102:5",
        "@2x": "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/7bcd/56f5/6dfb3335c90d11c04c723cb36c2c43a3"
    },
    "triangle": {
        "id": "102:4",
        "@2x": "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/a339/5a19/77658cc6c84d2c5dc3c28ca7d3e4b96a"
    },
}
```
## Tips

Using frame IDs is a bit more robust, in case you happen to rename a frame.

There are two reasons to provide more than one frame:
* combining assets from several different places in a file
* having a "base" set of assets, which you selectively replace with work-in-progress assets.

`frameId` assets are loaded before `frameName` assets. Within a group, they are processed left to right. So put your base frame first, then overrides later.