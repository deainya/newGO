# rfbGO sandbox app

## General info
App is built using MEAN stack
* MongoDB
* Express
* Angular
* Node

## Developing
* `npm install` to resolve dependencies
* `npm install gulp` to install Gulp
* `npm run watch` to start transpile watch
* `node htdocs/app.js` to run app on server side

## Seeding MongoDB
* `mongoimport -u user -p pass --db partnergo-dev --collection actions --type json --file seeds/a-seed.json --jsonArray --drop`
* `mongoimport -u user -p pass --db partnergo-dev --collection orders --type json --file seeds/o-seed.json --jsonArray --drop`
* `mongoimport -u user -p pass --db partnergo-dev --collection tradepoints --type json --file seeds/t-seed.json --jsonArray --drop`
* `mongoimport -u user -p pass --db partnergo-dev --collection users --type json --file seeds/u-seed.json --jsonArray --drop`

## Start/Stop forever server side app (appps/rfbGO/htdocs)
* `/opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever stop app.js`
* `/opt/bitnami/nodejs/bin/node /opt/bitnami/nodejs/bin/forever start app.js`
