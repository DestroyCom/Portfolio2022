FROM node:lts-alpine as builder

WORKDIR /build

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM node:lts-alpine as runner

WORKDIR /app
COPY --from=builder /build /client/build

COPY ./package*.json ./
RUN npm install

COPY ./server/ ./server/

CMD [ "npm", "start" ]