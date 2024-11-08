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

## Deploy Docker Develop Environment 🐳
Just need to modify related documents(env.js, .env, docker-compose.yml)

First of all, git clone https://github.com/0verseas/0verDistribution.git than switch folder to 0verDistribution/, if dev then git clone https://github.com/0verseas/0verDistribution.git ./0verDistribution-dev and do below
  - ``cd ./0verDistribution/`` or ``cd ./0verDistribution-dev/``
    - switch git branch(if dev then do this step)
      - ``sudo git checkout dev``
    - ``sudo cp src/js/env.js.example src/js/env.js``
    - edit src/js/env.js (modify baseUrl, reCAPTCHA_site_key, year)
    - docker build
      - ``sudo npm run docker-build``

Secondly, switch folder to 0verDistribution/docker/ or 0verDistribution-dev/docker/ and do below
- ``cd ./docker/``
  - ``sudo cp .env.example .env``
  - edit .env (modify NETWORKS, DOMAIN_NAME, ENTRYPOINTS)
  - if you want to exclude IPs other than ours then edit docker-compose.yaml open ncnuipwhitlist@file label setting

Finally, did all the above mentioned it after that the last move is docker-compose up
- ``sudo docker-compose up -d``

If want to stop docker-compose
- ``sudo docker-compose down``

if don‘t want to stop container and apply docker-compose edited setting then
- ``sudo docker-compose up --detach``