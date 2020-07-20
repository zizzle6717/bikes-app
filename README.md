# bikes-app
Demo App

## Init
```
npm install
npm init
npm run build
npm run start <PORT>
```
> Note: Omit the PORT arg to run on the port defined as an environment variable in .env

## Documentation
Swagger documentation can be found by starting the app and navigating to `/docs`. To regenerate documentation after making changes to `/docs/swagger.yaml`, run `npm run generate:docs`.

## Test Coverage
Test coverage can be found by starting the app and navigating to `/coverage`. The coverage directory is gitignored and will only be generated after running `npm test`. Run unit tests and integrations tests separately by running `npn run test:unit` and `npm run test:coverage` respectively.

## Hot Module Reload
Run `npm run build:watch` in one terminal and `npm start` in another. Any changes to files will cause webpack to re-compile the app.

## Environment Variables
Using the .env.template as a template, add environment variables in a .env file. The actual .env file is gitignored.

## Health Check
The health check endoint is found at `/_healthz`

## Typescript
Typescript is intentionally configured as to not enforce strict typing and allows implicit types. This is an opinionated approach, it is my opinion, and that's all it is. :)

## Linting and Pre-Commit/Pre-Push Hooks
Run `npm run lint` or `npm run lint:fix` to check for linting errors. With the included pre-commit hooks, code is required to be free of any lint errors to complete a git commit. A pre-push hook is also implemented to require all tests to pass before pushing to a remote. To manually override these hooks simply add `--no-verify` to the end of either command.

## Docker
Build `npm run docker:build`
Run `npm run docker:run`
Stop `npm run docker:stop`
Remove `npm run docker:remove`