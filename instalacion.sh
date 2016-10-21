#!/bin/bash
sudo apt-get update
sudo apt-get install lamp-server^
sudo apt install node-jade node-express-generator
mkdir ranking
cd ranking
express
mv -f ../package.json ../app.js .
mv -f ../views/* views/
mv -f ../public/* public/
rm -r ../views ../public
echo "Añadidas las carpetas"
cd . && npm install
npm install express-session
DEBUG=my-application ./bin/www

