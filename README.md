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

First of all, git clone https://github.com/0verseas/0verDistribution.git than switch folder to 0verDistribution/, and do below
  - ``cd 0verDistribution/``
    - switch git branch
      - ``sudo git checkout dev``
    - ``sudo cp src/js/env.js.example src/js/env.js``
    - edit src/js/env.js (modify baseUrl, reCAPTCHA_site_key, year)
    - docker build
      - ``sudo docker run -it --rm -v $PWD:/0verDistribution -w /0verDistribution node:14.16.0 sh -c 'npm install && npm run build'``

Secondly, switch folder to 0verDistribution/docker/ and do below
- ``cd docker/``
  - ``sudo cp .env.example .env``
  - edit .env (modify NETWORKS)
  - edit docker-compose.yml (modify the container's label which "traefik.http.routers.distribution.rule=Host(`` `input school's domain name here` ``) && PathPrefix(`` `/school_allstudent` ``)")

Finally, did all the above mentioned it after that the last move is docker-compose up
- ``sudo docker-compose up -d``

If want to stop docker-compose
- ``sudo docker-compose down``
