FROM node:14.9
 
WORKDIR /frontendapp
 
COPY package*.json /frontendapp/package*.json
 
RUN npm install
 
COPY . /frontendapp

EXPOSE 3000
 
CMD [ "npm", "start" ]