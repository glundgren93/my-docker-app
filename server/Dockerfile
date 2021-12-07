FROM node:15.14-alpine3.10

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

COPY package.json /usr/src/app
RUN npm install 

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD /wait && npm start