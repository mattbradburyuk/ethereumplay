FROM node:argon

RUN apt-get install curl

# create app directory

RUN mkdir -p /home/tx_listener
WORKDIR /home/tx_listener

COPY package.json /home/tx_listener/
RUN npm install

COPY . /home/tx_listener/

EXPOSE 8081

ENTRYPOINT node tx_listener.js