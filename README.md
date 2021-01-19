# 0verDistribution


## Install
```
git clone https://github.com/0verseas/0verDistribution.git
cd 0verDistribution
npm install
cp src/js/env.js.example src/js/env.js
```
edit the config file in `src/env.js`

## Run
```
npm run serve
```

## Deploy
```
npm run build
```
the built static files will be in the `dist`

## Docker 🐳
1. Install [Docker](https://docs.docker.com/engine/install/) & [Docker Compose](https://docs.docker.com/compose/install/)
2. Edit docker compose file: `docker/docker-compose.yml`
2. `cp docker/.env.example docker/.env` and edit it (if you need).
3. If static file doesn't yet be built, you should build it before running docker.
3. `cd docker && docker-compose up -d`
