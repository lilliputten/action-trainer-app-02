<!--
@since 2024.06.05, 23:18
@changed 2024.06.05, 23:18
-->

# action-trainer-app-02

Action trainer app.

- Project info: v.0.0.5 / scenario241226 / 2024.12.27 14:26:19 +0300

TODO: Add the project description.

## See also

- [CHANGELOG](CHANGELOG.md)
- [TODO](TODO.md)

## Resources

Repository: https://github.com/lilliputten/action-trainer-app-02

Demo deploy server (with a recent build):

- Scenario 1: https://action-trainer-app-02.march.team/scenario1
- Scenario 2: https://action-trainer-app-02.march.team/scenario2
- Scenario 241226: https://action-trainer-app-02.march.team/scenario241226

Demo in a frame:

- Scenario 1: https://action-trainer-app-02.march.team/scenario1/frame-test
- Scenario 2: https://action-trainer-app-02.march.team/scenario2/frame-test
- Scenario 241226: https://action-trainer-app-02.march.team/scenario241226/frame-test

## Project workflow

Install all required node dependencies:

```
npm i
```

Start dev server (locate in browser with `http://localhost:3000`):

```
npm run start
```

Make build:

```
npm run build
```

Build and publish:

For successful publishing the build application the environment should be
propeply set up (see npm script command `postinstall-publish-submodule`).

```
npm run build-and-publish
```

To just publish previously created build:

```
npm run publish
```

Builds published into the `publish` branch. See utilities configuration in
`utils/config.sh`.
