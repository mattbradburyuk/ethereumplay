# ethereumplay

Brings up either single geth node or 2 node geth network using docker containers + set up scripts

To use, roughly (needs tidying up): 

1) Install docker

2) Build the docker images 

```bash
$ cd geth_1.4.7_vanila
$ sh dockerBuild.sh

then

$ cd ../tx_firer
$ sh tx_firerBuild.sh

```


3) Bring up the geths in ethereumplay directory:

```bash
$ sh bring_up_one_node.sh
or $
$ sh bring_up_two_nodes.sh

```

4) To tear down the geths:

```bash
$ sh take_down_all.sh
```
