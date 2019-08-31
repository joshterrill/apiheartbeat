# client build
FROM tiangolo/node-frontend:10 as client-build

WORKDIR /client

COPY src/public/client/ ./
RUN npm ci
RUN npm run build

# server build
FROM node:8 as server-build
WORKDIR /server

COPY . .
RUN npm ci

EXPOSE 3000 80

CMD [ "npm", "start" ]
