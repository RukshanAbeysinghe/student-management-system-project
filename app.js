const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const username = 'amarabandu';
const password = 'AEFAGHQtdH4Ay1Ht';
const clusterName = 'Cluster1';
const dbName = 'mydatabase';
// MongoDB connection URI
const uri = `mongodb+srv://${username}:${password}@${clusterName}.7mp0lii.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect to MongoDB
mongoose
  .connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start performing database operations
    // ...
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the student schema
const studentSchema = new mongoose.Schema({
  SID: {
    type: Number,
    required: true,
    unique: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  NearCity: {
    type: String,
    required: true
  },
  Course: {
    type: [String],
    required: true
  },
  Guardian: {
    type: String,
    required: true
  },
  Subjects: {
    type: [String],
    required: true
  }
});

// Create the student model
const Student = mongoose.model('Student', studentSchema);

// Insert a Student
app.post('/students', (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save()
    .then(student => {
      res.status(201).json(student);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Show all Students
app.get('/students', (req, res) => {
  Student.find()
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find a Student by SID
app.get('/students/sid/:sid', (req, res) => {
  const sid = parseInt(req.params.sid);
  Student.findOne({ SID: sid })
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by First Name
app.get('/students/firstname/:firstname', (req, res) => {
  const firstname = req.params.firstname;
  Student.find({ FirstName: firstname })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by Last Name
app.get('-+', (req, res) => {
  const lastname = req.params.lastname;
  Student.find({ LastName: lastname })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by Email
app.get('/students/email/:email', (req, res) => {
  const email = req.params.email;
  Student.find({ Email: email })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by Nearest City
app.get('/students/nearcity/:nearcity', (req, res) => {
  const nearcity = req.params.nearcity;
  Student.find({ NearCity: nearcity })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by Course
app.get('/students/course/:course', (req, res) => {
  const course = req.params.course;
  Student.find({ Course: course })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Find Students by Guardian
app.get('/students/guardian/:guardian', (req, res) => {
  const guardian = req.params.guardian;
  Student.find({ Guardian: guardian })
    .then(students => {
      res.json(students);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Update Student by SID
app.put('/students/sid/:sid', (req, res) => {
  const sid = parseInt(req.params.sid);
  Student.findOneAndUpdate({ SID: sid }, req.body, { new: true })
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Update Student by First Name
app.put('/students/firstname/:firstname', (req, res) => {
  const firstname = req.params.firstname;
  Student.findOneAndUpdate({ FirstName: firstname }, req.body, { new: true })
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Delete Student by SID
app.delete('/students/sid/:sid', (req, res) => {
  const sid = parseInt(req.params.sid);
  Student.findOneAndDelete({ SID: sid })
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
