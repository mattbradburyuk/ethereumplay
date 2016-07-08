FROM ubuntu:xenial

WORKDIR /root/

RUN apt-get update && apt-get install -y git build-essential libgmp3-dev golang
RUN git clone https://github.com/ethereum/go-ethereum
RUN (cd go-ethereum && git checkout v1.4.9)

RUN (cd go-ethereum && make geth)

RUN mkdir ~/.ethash

RUN ./go-ethereum/build/bin/geth makedag 0 ~/.ethash

#ADD fetcher.go go-ethereum/eth/fetcher/
#ADD worker.go miner.go agent.go go-ethereum/miner/
#ADD protocol_params.go go-ethereum/params/
#ADD block_validator.go state_processor.go tx_pool.go chain_makers.go blockchain.go go-ethereum/core/
#COPY p2p/ go-ethereum/p2p/

RUN (cd go-ethereum && make clean && make geth)

COPY CustomGenesis.json CustomGenesis.json

RUN ./go-ethereum/build/bin/geth init ./CustomGenesis.json

EXPOSE 8545

EXPOSE 30303

ENV TERM=xterm-256color


ENTRYPOINT ["/root/go-ethereum/build/bin/geth", "--networkid", "12902", "--rpc", "--jitvm=false", "--rpcaddr", "0.0.0.0", "--nodiscover", "--rpcapi", "eth,net,web3,admin,miner,personal"]
