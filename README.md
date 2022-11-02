# social-network-api

## Description
In the UT Austin Coding Bootcamp, challenge 18 was creating a Social Network API where users could post thoughts, add reactions to thoughts and have a friends list of other users. The packages used to create the API were ***express.js*** for simplifying APIs, ***mongoose*** the ODM of the database, ***mongoose-lean-virtuals*** and ***mongoose-lean-getters*** to correctly send the document as plain old javascript object with virtuals and getters enabled. Then, the database that is being utilized for this application is MongoDB, hence the mongoose package.

## Head-Scratcher
In the making of this application the routes and responses worked fine until I got to the POST route of '/api/thoughts/:thoughtId/reactions/', which is adding a reaction (a subdocument) to a thought. The problem ocurred when I added a reaction and tried to send the updated thought as a response. The gathering of the updated data worked appropiately (indicated by a console log) but when I tried to send the results to the response, it would end up sending an error instead. Though, I spent a couple of hours trying to find the cause of the error, I was unsuccessful. But, I did find a way around it by importing and utilizing two mongoose plug-in packages, ***mongoose-lean-virtuals*** and ***mongoose-lean-getters***. With the lean method on a query, mongoose skips the initiation of a full Mongoose document and just gives you a plain old javascript object, making it easier to send as response. Then, after stating virtuals and getters to be enabled in the lean method, it still adds the virtual and getters to the object as if the initiation was never skipped. 

## Walkthrough Video
[Video](https://drive.google.com/file/d/1--B0znWQurwtDkOchapcV6_CBjKsD7FM/view?usp=sharing)

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

## How to Run on Local Computer
1. Clone repo onto your local computer
2. In the terminal, navigate to the root of the folder
3. Run 'npm install' (installing all dependencies)
4. Run 'node utils/seed' (seeding the database with data)
5. Run 'node server' (starting up server on local computer)
6. Request away!
