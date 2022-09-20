FROM node:16
RUN mkdir -p app
WORKDIR /app
COPY . /app/
RUN cd client && npm install && npm cache clean --force && npm run build
RUN npm install && npm cache clean --force
ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "start" ]
