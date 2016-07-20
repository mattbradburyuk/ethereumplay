#!/usr/bin/env bash

docker-compose -f 'docker-compose.1node.yml' down
docker-compose -f 'docker-compose.2nodes.yml' down