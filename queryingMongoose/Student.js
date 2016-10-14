// mongoose is what will let us connect to our database
var mongoose = require('mongoose');

// Create a Student model
// Specify type of each model variable
var Student = mongoose.model('Student', {
  id: String,
  name: String,
  age: Number,
  gradeLevel: Number,
});

// Set Student as our module export.
// Now other files can require this file 
// and access the Student model and create students.
module.exports = Student;