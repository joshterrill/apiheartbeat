# apiheartbeat

[![Build Status](http://drone.redshift.ai/api/badges/joshterrill/apiheartbeat/status.svg)](http://drone.redshift.ai/joshterrill/apiheartbeat)

An application that checks your API's pulse and sends notifications if they flatline.

### install and run

The base server is a NodeJS app and can be run from the root of the project by running:

```
npm i
npm run dev
```

The client is written in angular and can be found in `src/public/client`. If you are doing development work, you will want to run the client and server side by side. To do this, run

```
cd src/public/client
npm ci
npm start
```

### building

To build the client, run

```
cd src/public/client
npm run build
```

This will build and compile the client project files into `src/public/compiled` which will then be served from the server.