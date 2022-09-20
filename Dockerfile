FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install && npm cache clean --force
RUN ['ls', "-l"]
ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "start" ]
