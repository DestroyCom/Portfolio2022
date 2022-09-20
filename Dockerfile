FROM node:18
RUN mkdir -p app
WORKDIR /app
COPY . /app/
RUN npm install && npm cache clean --force
ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "start" ]
