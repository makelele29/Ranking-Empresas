#!/bin/bash
mysql -u root < ranking.sql
cd Ranking
npm install
npm install -g mocha
