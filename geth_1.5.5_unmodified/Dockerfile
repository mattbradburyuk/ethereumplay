FROM ubuntu:xenial

RUN echo 'hello world'

WORKDIR /root/

# install Go, clone the go-ethereum source code and check out the relevant version
RUN apt-get update && apt-get install -y git build-essential libgmp3-dev golang
RUN git clone https://github.com/ethereum/go-ethereum
RUN (cd go-ethereum && git checkout v1.5.5)

# make geth from source code
RUN (cd go-ethereum && make geth)

# make the DAG and store
# https://github.com/ethereum/wiki/wiki/Mining#ethash-dag
RUN mkdir ~/.ethash
RUN ./go-ethereum/build/bin/geth makedag 0 ~/.ethash


## The subsitute and rebuild approach is not working with geth 1.5, something to do with geth now using a vendors folder for dependencies and atempting to laod things twice on the reload

    # add substituted source files
    #ADD protocol_params.go go-ethereum/params/
    #ADD modified_files/main.go go-ethereum/cmd/geth/
    #ADD modified_files/block_validator.go go-ethereum/core/

    ## removes installation of geth (leaving /.ethash) and remakes using substituted files
    #RUN (cd go-ethereum && make clean && make geth)



## copy over the genesis block
COPY CustomGenesis.json CustomGenesis.json

## bootstraps and initialises a new genesis block (JSON)
RUN ./go-ethereum/build/bin/geth init ./CustomGenesis.json
#
#ADD modified_files/limits.conf /etc/security/
#
#
## exposes ports on the docker container (this does not do the mapping to unique ports)
EXPOSE 8545
EXPOSE 30303


## sets text window's colours
ENV TERM=xterm-256color

## the command to start geth with options whne the container is started
ENTRYPOINT ["/root/go-ethereum/build/bin/geth", "--verbosity", "6", "--networkid", "12902", "--rpc", "--jitvm=false", "--rpcaddr", "0.0.0.0", "--nodiscover", "--rpcapi", "eth,net,web3,admin,miner,personal", "--rpccorsdomain", "*"]

# remember "--rpccorsdomain", "*" sounds dangerous
# remember "--wsorigins", "*" sounds dangerous
