const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || require('./config/secrets').mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Add the validation error plugin to make the model validation
// errors look nice.
mongoose.plugin(require('./models/plugins/validationError'));

// Add models to mongoose
mongoose.model('Activity', require('./models/Activity'));
mongoose.model('Admin', require('./models/Admin'));
mongoose.model('Member', require('./models/Member'));
mongoose.model('SeniorCenter', require('./models/SeniorCenter'));
mongoose.model('Service', require('./models/Service'));

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/admins', require('./routes/api/admins'));
app.use('/api/members', require('./routes/api/members'));
app.use('/api/seniorCenters', require('./routes/api/seniorCenters'));
app.use('/api/services', require('./routes/api/services'));
app.use('/api/activities', require('./routes/api/activities'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;
