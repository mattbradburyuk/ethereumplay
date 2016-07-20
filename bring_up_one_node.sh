#!/usr/bin/env bash

echo 'Bringing up a single geth node .....\n'

echo 'Removing old logs'
rm test_log.txt

echo 'Take down previous docker-compose if up'
docker-compose -f 'docker-compose.1node.yml' down


echo 'Running Docker-compose up (detached)'
docker-compose -f 'docker-compose.1node.yml' up >> test_log.txt &           # & detaches the command from stdin so the shell isn't tied up

sleep 3         # sleep to give a short pause before setting up the geths

echo 'single_node_helper.js'

node geth_1.4.7_vanilla/single_node_helper.js
