In this tutorial, we're going to be using MongoDB and
Mongoose to create a database for our node applications.

1. Download MongoDB from https://www.mongodb.org/

2. Open a Git Bash anywhere and run `mongod`. Do not
close this window throughout the process of this tutorial.
Minimize it if necessary. The command opens our Mongoose
databases for use.

3. Let's create our package.json and outline the 
dependencies we need.

  {
    "dependencies": {
      "mongoose": "^4.1.10"
    }
  }

3.5. Open Git Bash in your project folder and run the
command `npm install`. This command installs any dependencies
outlined in our package.json, in our case, mongoose.

4. This will let us use mongoose in our node application

5. Now let's create a Student mongoose model. This will
let us standardize what our Students look like. Do this
in a Student.js file.

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

6. Now create a server.js file like we have with previous
applications. This one will have Mongoose and our Student
Model as requirements.

  // mongoose is what will let us connect to our database
  var mongoose = require('mongoose');
  // our Student Object, check out Student.js
  var Student = require('./Student');

6.5. Now let's make sure to connect to a database using the Mongoose library. I chose the name school arbitrarily, you can replace that with anything.

  // Use mongoose to connect to our database
  mongoose.connect('mongodb://localhost/school');

7. Now we can create a student.

  // This is how you create a student
  // Notice how all the fields in Student.js are provided
  // If you don't specify a value, it will be null/false/0/''
  var aaroh = Student.create({
    id: '149003115',
    name: 'Aaroh',
    age: 17,
    gradeLevel: 12,
  });

  console.log(aaroh);

8. Now in Git Bash in your project folder, run `node server.js`.
This will print our `aaroh` object. You will notice it doesn't 
print what we think it should intuitively print. Press
Control + C twice to exit the server.

9. This is because `aaroh` is a pointer to a `promise` in
javascript. These promises are used when we want to asynchronously
call a function. Promises are usually used for functions that cannot
immediately return a value. In the case of our Student.create(),
Mongoose can either create a student quickly (<10 ms) or take a
while (>200 ms), usually in the case where we create hundreds of
Students. You can read more about promises at
MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
I recommend you do, because they are a very important part of
Javascript. Especially pay attention to promise.prototype.then!

10. So after having read about promises, the following code should
seem familiar. This is how you can access data of a promise object.

  // This is how we can access the data of any student
  aaroh.then(function (aarohData) {
    console.log(aarohData);
  });

11. Now run `node server.js` in Git Bash in your project folder, 
and you should see what looks like our aaroh object. Try creating
another Student and accessing it's data. I do this in my server.js
file for reference. Press Control + C twice to exit the server.

12. What if we want to find a Student based on a certain key-value
pair? Use the find function of a mongoose model, which is built
into every model.

  // We can also find all student with 'name' of 'Aaroh'
  // Find another student using some other field
  Student.findOne({'name': 'Aaroh'}, function(err, student) {
    if (err) {
      console.log(err);
    }

    console.log('Student with name `Aaroh`:', student);
  });

13. Try changing the name to your students name, or try finding
your student based on some other criteria. Look up the Mongoose
find function documentation (http://mongoosejs.com/docs/queries.html)