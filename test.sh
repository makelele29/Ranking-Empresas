#!/bin/bash
mysql  < ranking.sql
mkdir Web
cd Web
cp -Rf ../Ranking/* .
echo "Añadidas las carpetas"
cd . && npm install
npm install -g grunt-docco
grunt docco
