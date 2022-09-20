FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mkdir -p /usr/src/app/client
COPY /client/build /usr/src/app/client
RUN npm install && npm cache clean --force
ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "start" ]
