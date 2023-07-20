# HOME ASSIGNMENT - REFLECTIZ

The system was built using Nest.js,Typescript, express.js and mongoDB, have several different services.
First: contains 2 routes, the other one searches for a domain by its name, while the second one creates a new domain in the system.
Second: runs scheduled, every 30 seconde on all records to get up-to-date information.

## Routes structure

##### POST /domain

    {
      "name": "testdomain.com"
    }

Returns information about a domain testdomain.com. If it does not exist, the object will be added to the DB and at a later stage will be scanned.

##### POST /domain/analysis

    {
        "name": "testdomain.com"
    }

Adds the domain to the DB for a scan analyze. if it already exists in the DB we will return an message the domain already exist.

##### Example request:

    POST http://localhost:3000/api/domains
    {
        "name": "testdomain.com"
    }

## scheduled

Every 30 seconds we will pull the records from DB whose whoIs and virusTotal are null (new records) and update them.

## How to run it

First, you need to import the code using git clone, then go to the current project and create .env file.
Before running, it is important to check that there are env values in the .env file.
for example:

###### .env

    WHO_IS_URL="https://www.whoisxmlapi.com/whoisserver/WhoisService"
    WHO_IS_API_KEY=your-api-key

    TOTAL_VIRUS_URL="https://www.virustotal.com/api/v3/domains"
    TOTAL_VIRUS_API_KEY=your-api-key

    MONGO_DB_URI="mongodb://mongodb:27017/domains"

Once you've got all the values for your .env file, you can run the code using docker:

    docker-compose up -d --build
