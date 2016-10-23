#!/bin/bash
sudo apt-get update
sudo apt-get install lamp-server^
sudo apt install node-jade node-express-generator
mkdir Web
cd Web
express
cp -f ../Ranking/package.json ../Ranking/app.js ../Ranking/Gruntfile.js .
cp -f ../Ranking/views/* views/
cp -f ../Ranking/test/* test/

echo "Añadidas las carpetas"
cd . && npm install
grunt docco

