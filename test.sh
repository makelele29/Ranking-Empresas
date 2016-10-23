#!/bin/bash
mysql  < ranking.sql
mkdir Web
cd Web
cp -Rf ../Ranking/* .
cd . && npm install
