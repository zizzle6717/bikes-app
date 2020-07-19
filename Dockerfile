FROM node:14.5.0

ENV NODE_ENV "production"

WORKDIR /usr/src/app

# In actual production code, environment variables would be fetched and loaded during deployment
# from a vault or using a container orchestrator. Here I'm just using the example env variables.
# I would probably also run the build in the CI/CD pipeline before copying the dist directory
COPY package*.json ./
COPY .env.template ./
COPY ./dist/ ./dist/
COPY ./docs/ ./docs/
COPY ./scripts/ ./scripts/
COPY ./_bin/ ./_bin/

RUN npm ci --production --silent
RUN npm run init

EXPOSE 9000

CMD npm run serve