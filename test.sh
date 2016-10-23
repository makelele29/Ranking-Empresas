#!/bin/bash
mysql -u root < ranking.sql
mkdir Web
cd Web
cp -Rf ../Ranking/* .
cd . && npm install
npm install -g mocha
