# social-network-api

## Description
In the UT Austin Coding Bootcamp, challenge 18 was creating a Social Network API where users could post thoughts, add reactions to thoughts and have a friends list of other users. The packages used to create the API were ***express.js*** for simplifying APIs, ***mongoose*** the ODM of the database, ***mongoose-lean-virtuals*** and ***mongoose-lean-getters*** to correctly send the document as plain old javascript object with virtuals and getters enabled. Then, the database that is being utilized for this application is MongoDB, hence the mongoose package.

## Walkthrough Video

## Criteria
- GIVEN a social network API <br>
- WHEN I enter the command to invoke the application <br>
- [x] THEN my server is started and the Mongoose models are synced to the MongoDB database <br>
- WHEN I open API GET routes in Insomnia for users and thoughts <br>
- [x] THEN the data for each of these routes is displayed in a formatted JSON <br>
- WHEN I test API POST, PUT, and DELETE routes in Insomnia <br>
- [x] THEN I am able to successfully create, update, and delete users and thoughts in my database <br>
- WHEN I test API POST and DELETE routes in Insomnia <br>
- [x] THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list <br>
