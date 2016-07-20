#!/usr/bin/env bash

echo 'Bringing up a two node network.....\n'

echo 'Removing old logs'
rm test_log.txt

echo 'Take down previous docker-compose if up'
docker-compose -f 'docker-compose.2nodes.yml' down


echo 'Running Docker-compose up (detached)'
docker-compose -f 'docker-compose.2nodes.yml' up >> test_log.txt &           # & detaches the command from stdin so the shell isn't tied up

sleep 3         # sleep to give a short pause before setting up the geths

echo 'Running setup_geth.sh\n'

sh setup/setup_geth.sh

