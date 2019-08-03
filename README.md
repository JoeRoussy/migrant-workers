# Connecting Indigenous Resources Canada
TODO: description here

## Setup
This app runs on node version 10.8.0 and uses mongodb version 4.0.

### Node
Make sure you have node 10.8.0 installed before installing any packages as the package lock file may force the server to install the wrong version. Also remember to run `npm i` after pulling new changes to make sure you have any new dependencies.

### Mongo
Mongo must be installed and running on your machine before trying to run the app. The version of mongo this app uses is 3.6.x
#### Schema
TODO...

#### Text Searches
In order to perform a text search a collection needs to have a text index on the field being searched and it must also declare a language. Note that if you are using a text search on an aggregation pipeline, it must be the first field in the `$match` field.

Declaring a language means each document has a `language` field set to a language, for example: `english`.

To make a text index on a field, use the following command (in the mongo shell for example):
```
db.<collection>.createIndex( { <field>: "text" } )

// For example:
db.listings.createIndex( { location: "text" } )
```
The following collections have a text index:
* Listings on location
* Users on name


### Logging
This app logs files to `/var/log/circ`. This folder must exist and its permissions must be set so the app can create files inside of it

### Environment Variables
Environment variables are loaded into the app from a `.env` file. These key value pairs must in of the form: `key=value` in this file (one per line). These values will be parsed and available in `process.env`.

Required environment variables are:
* SESSION_SECRET: Some random string
* DB_URI: The mongo connection string
* DB_NAME: The name of the database

Optional environment variables are:
* LOG_ROTATING_FILE: Rotating file for logs of all levels other than errors (this is `/var/log/circ/log.log` by default)
* LOG_ERROR_FILE: Rotating file for error logs (this is `/var/log/circ/errors.log` by default)

### Running The app
Once all of the above conditions are taken care of, run the front end using `npm run client-dev` and run the server in a new tab using `npm run server-dev`.

### Running in production environment
Run `npm run build` to build the front-end
Start the app using `num run start-prod`
Stop the app using `npm run stop`
