// mongoose is what will let us connect to our database
var mongoose = require('mongoose');
// our Student Object, check out Student.js
var Student = require('./Student');

// Use mongoose to connect to our database
mongoose.connect('mongodb://localhost/school');

// This is how you create a student
// Notice how all the fields in Student.js are provided
// If you don't specify a value, it will be null/false/0/''
var aaroh = Student.create({
  id: '149003115',
  name: 'Aaroh',
  age: 17,
  gradeLevel: 12,
});

// This is how we can access the data of any student
aaroh.then(function (aarohData) {
  console.log(aarohData);
});

// Look familiar?
var maxwell = Student.create({
  id: '148003878',
  name: 'Maxwell',
  age: 12,
  gradeLevel: 7,
});

maxwell.then(function (maxwellData) {
  console.log(maxwellData);
});

// We can also find all student with 'name' of 'Aaroh'
// Find another student using some other field
Student.findOne({'name': 'Aaroh'}, function(err, student) {
  if (err) {
    console.log(err);
  }

  console.log('Student with name `Aaroh`:', student);
});