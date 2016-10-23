#!/bin/bash
export TESTSUITE_USER=root
export TESTSUITE_PASSWORD=root
export TESTSUITE_URL=http://127.0.0.1:8000
export CI_MODE=test
mysql -uroot  < ranking.sql
sudo apt-get install node-express-generator
mkdir Web
cd Web
express
cp -Rf ../Ranking/* .
echo "Añadidas las carpetas"
cd . && npm install
npm install -g grunt-docco
grunt docco
