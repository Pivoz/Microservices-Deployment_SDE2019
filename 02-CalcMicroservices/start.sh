#!/bin/sh

cd Adapter_n2w
docker build -t adaptern2w .
docker run --name adaptern2w --net host -p 3000:3000 -d adaptern2w

cd ../Decimal_n2w
docker build -t decimaln2w .
docker run --name decimaln2w --net host -p 3001:3001 -d decimaln2w
