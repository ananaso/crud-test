# what to base the container off of
FROM node:latest

# make the 'app' folder the current working directory
WORKDIR /server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --silent

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 3003
CMD [ "npm", "run-script", "start-dev" ]