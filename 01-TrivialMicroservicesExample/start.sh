
#!/bin/sh

cd helloworld
docker build -t helloworld .
docker run --name helloworld -p 3001:3001 -d helloworld

cd ../ciaomondo
docker build -t ciaomondo .
docker run --name ciaomondo -p 3000:3000 -d ciaomondo

cd ../holamundo
docker build -t holamundo .
docker run --name holamundo -p 3002:3002 -d holamundo