#!/usr/bin/env bash

geth_1_DockerIp=$(docker inspect ethereumplay_geth_1_1 | grep '"IPAddress"' | grep -v '"IPAddress": "",' | sed -e 's/.*"IPAddress": "//g' | sed -e 's/",.*//g')
echo  geth_1 ip address is $geth_1_DockerIp

geth_2_DockerIp=$(docker inspect ethereumplay_geth_2_1 | grep '"IPAddress"' | grep -v '"IPAddress": "",' | sed -e 's/.*"IPAddress": "//g' | sed -e 's/",.*//g')
echo  geth_2 ip address is $geth_2_DockerIp

node setup/geth_helper.js -c bob
