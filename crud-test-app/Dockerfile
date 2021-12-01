# what to base the container off of
FROM node:latest

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --silent

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN chown node:node * && chmod 777 *

# stop stupid Node crypto error thing
ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000
CMD [ "npm", "start" ]