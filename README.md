# 0verDistribution

## Deploy Local Develop Environment
### Install
```
git clone https://github.com/0verseas/0verDistribution.git
cd 0verDistribution
npm install
cp src/js/env.js.example src/js/env.js
```
edit the config file in `src/env.js`

### Run
```
npm run serve
```

### Deploy
```
npm run build
```
the built static files will be in the `dist`

## Deploy Docker Develop Environment
### Startup Preparation
if dev then
```
git clone https://github.com/0verseas/0verDistribution.git ./0verDistribution-dev/
cd ./0verDistribution-dev/
git checkout dev
```
if official then
```
git clone https://github.com/0verseas/0verDistribution.git
cd ./0verDistribution/
```

```
npm install
cp ./src/env.js.example ./src/env.js
cp ./docker/.env.example ./docker/.env
```
#### Edit Config Files
modify baseUrl, isProduction, reCAPTCHA_site_key, year
```
vim ./src/env.js
```
modfiy NETWORKS, DOMAIN_NAME, ENTRYPOINTS
*If dev then modfiy COMPOSE_PROJECT_NAME and CONTAINER_NAME*
```
vim ./docker/.env
```
#### *If want Container Block Exclude IPs Other than Ours*
modify uncomment row 28
```
vim ./docker/docker-compose.yaml
```
### Build
```
sudo npm run docker-build
```
### StartUp
*at ./docker/ path*
```
sudo docker-compose up -d
```
### Stop
*at ./docker/ path*
```
sudo docker-compose down
```
### ✨Nonstop Container and Apply New Edit Docker-Compose Setting (Use Only Container is running)✨
The command will not effect on the running container if you have not edited any of the settings on docker-compose.yaml
*at ./docker/ path*
```
sudo docker-compose up --detach
```