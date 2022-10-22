FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cd client && npm install && npm run build
COPY ./client/build /app 
RUN chmod -R 777 /app
RUN npm install && npm cache clean --force
ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "start" ]