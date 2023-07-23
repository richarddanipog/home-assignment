# HOME ASSIGNMENT - REFLECTIZ

The system was built using Nest.js, Typescript, and MongoDB, which have several different services.
First: contains 2 routes, the other one searches for a domain by its name, while the second one creates a new domain in the system.
Second: runs scheduled, every 30 seconds on all records to get up-to-date information.

## scheduled

Every 30 seconds we will pull the records from DB whose isAnalyzed are false (new records) and update them.

## Routes

##### POST /api/domains

    {
      "name": "testdomain.com"
    }

Returns information about a domain testdomain.com. If it does not exist, the object will be added to the DB and at a later stage will be scanned.

##### POST /api/domains/analysis

    {
        "name": "testdomain.com"
    }

Adds the domain to the DB for a scan analysis. if it already exists in the DB we will return a message the domain already exists.

##### Example request:

    POST http://localhost:3000/api/domains
    {
        "name": "youtube.com"
    }
    
    basic auth
        user: admin
        password: 123456

## How to run it

First, you need to import the code using git clone, then go to the current project and create a .env file.
Before running, it is important to check that there are env values in the .env file.
for example:

###### .env

    WHO_IS_URL="https://www.whoisxmlapi.com/whoisserver/WhoisService"
    WHO_IS_API_KEY=your-api-key

    VIRUS_TOTAL_URL="https://www.virustotal.com/api/v3/domains"
    VIRUS_TOTAL_API_KEY=your-api-key

    MONGO_DB_URI="mongodb://mongodb:27017/domains"

    BASIC_AUTH_USER=admin
    BASIC_AUTH_PASSWORD=123456

** If you don't have Virus Total apiKey or WhoIs apiKey, contact me and I will send you your mine.

Once you've got all the values for your .env file, you can run the code using docker:

    docker-compose up -d --build
