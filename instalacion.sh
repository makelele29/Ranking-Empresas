#!/bin/bash
apt-get update
apt-get install lamp-server^
mysql -u root -p  < ranking.sql
sudo apt install node-jade node-express-generator
mkdir Web
cd Web
express
cp -Rf ../Ranking/* .
echo "Añadidas las carpetas"
cd . && npm install
npm install -g grunt-docco
grunt docco

