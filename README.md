# apiheartbeat

[![Build Status](http://drone.redshift.ai/api/badges/joshterrill/apiheartbeat/status.svg)](http://drone.redshift.ai/joshterrill/apiheartbeat)

An application that checks your API's pulse and sends notifications if they flatline.

### docker

```
# build new docker image

docker build -t docker.redshift.ai:5000/joshterrill/apiheartbeat:1.0.0 .

# run docker image detached

docker run -p 3000:3000 -d docker.redshift.ai:5000/joshterrill/apiheartbeat:1.0.0

# run docker image with stdout

docker run -p 3000:3000 -i -t docker.redshift.ai:5000/joshterrill/apiheartbeat:1.0.0

# run docker image attached with shell

docker run -i -t docker.redshift.ai:5000/joshterrill/apiheartbeat:1.0.0 /bin/bash

# publish to docker registry

docker publish docker.redshift.ai:5000/joshterrill/apiheartbeat:1.0.0

# run in production and always keep on

docker pull docker.redshift.ai:5000/joshterrill/apiheartbeat:latest
docker stop apiheartbeat
docker rm apiheartbeat
docker run -d -p 80:80 --env PORT=80 --name apiheartbeat --restart unless-stopped docker.redshift.ai:5000/joshterrill/apiheartbeat:latest

# when running into permission denied error when trying to pull from private registry run this:

sudo usermod -a -G docker $USER
```

### drone

```
# execute

drone exec

# execute specific pipeline

drone exec --pipeline notify
```