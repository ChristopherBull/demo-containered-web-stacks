const express = require('express');
const app = express();
const port = 3000;

// MongoDB configuration
const { MongoClient } = require('mongodb');
// Note: The `uri` is the location of the database, using the docker image name
// which is specified in the docker compose file;
// i.e., `db` instead of `localhost`.
// Note: Port `27017` is the default port for MongoDB.
const uri = 'mongodb://db:27017';
const client = new MongoClient(uri);

/**
 * Connect to the MongoDB server.
 */
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  }
  catch (err) {
    console.error('Error connecting to MongoDB:', err);
    // Exit the application with an error code
    process.exit(1);
  }
}

/**
 * Initialise the database with some data.
 */
async function initialiseDB() {
  try {
    // Get the `university` database
    const db = client.db('university');
    // Get the `students` collection within the `university` database
    const studentsCollection = db.collection('students');

    // Drop the collection (only for demo purposes, to start with a clean slate)
    await studentsCollection.drop();

    // Prepare multiple documents of students ot be inserted into DB
    const docs = [
      { first_name: 'Jane', student_id: 0, stage: 1 },
      { first_name: 'Joe', student_id: 1, stage: 1 },
      { first_name: 'Logan', student_id: 2, stage: 3 },
      { first_name: 'Ash', student_id: 3, stage: 2 },
    ];

    // Insert data into DB
    const result = await studentsCollection.insertMany(docs);
    console.log(`DB seeded: ${result.insertedCount} documents were inserted`);
  }
  catch (err) {
    console.error('Error initialising the database:', err);
    // Exit the application with an error code
    process.exit(1);
  }
}

/**
 * Get all students from the database.
 * @returns {Promise<Array>} A cursor to the result set.
 */
function getStudents() {
  // Get the `university` database
  const db = client.db('university');
  // Get the `students` collection within the `university` database
  const studentsCollection = db.collection('students');
  // Query for all students (as find() is async, use await to wait for the result set to be returned)
  const students = studentsCollection.find();
  // Return the result set as an array
  return students.toArray();
}

// Connect to the database and initialise it
connectDB();
initialiseDB();

/**
 * Define a route for the root URL, and send a simple response.
 * When a request is made to the root URL, the server will respond with "Hello World! This is a web response."
 * To test this, open a web browser and navigate to http://localhost:3000/.
 */
app.get('/', async (req, res) => {
  // Get all students from the database (as a JSON string)
  const students = JSON.stringify(await getStudents());
  // Send a response to the client
  res.send('Hello World! This is a web response. Node and Express (Logic layer) are working!<br><br>Database contents:<br>' + students);
});

/**
 * Start this simple web server, listening on port 3000.
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
