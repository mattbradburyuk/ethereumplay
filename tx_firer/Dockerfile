FROM node:argon

RUN apt-get install curl

# create app directory

RUN mkdir -p /home/tx_firer
WORKDIR /home/tx_firer

COPY package.json /home/tx_firer/
RUN npm install

COPY . /home/tx_firer/


ENTRYPOINT node tx_firer.js