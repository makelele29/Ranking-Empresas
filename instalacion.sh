#!/bin/bash
sudo apt-get update
sudo apt-get install lamp-server^
mysql -u root -p  < ranking.sql
cd Ranking
npm install
npm install -g grunt-docco
grunt docco

