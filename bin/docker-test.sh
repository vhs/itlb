#!/bin/bash

BASEDIR=`dirname $0 | awk '{ print $0 "/.." }'`

cd $BASEDIR

PKGDIR=`pwd`

TEMPLATE=vanhack/itlb
NAME=vhs-itlb

docker build -t $TEMPLATE $PKGDIR

echo "Killing old instance (if any)"
docker kill $NAME
echo "Removing old instance (if any)"
docker rm $NAME
echo "Starting"
docker run -d --restart=always -P --name $NAME -t $TEMPLATE bin/www
