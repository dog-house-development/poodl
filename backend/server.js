import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Member from './models/member'

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
// router.get('/members', (req, res) => {
//     Member.find((err, members) => {
//         if (err) return res.json({
//             success: false,
//             error: err
//         });
//         return res.json({
//             success: true,
//             data: members
//         });
//     });
// });
router.get('/members', (req, res) => {
  Member.find((err, members) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: members });
  });
});
router.put('/members/:memberId', (req, res) => {
    const { memberId } = req.params;
    if (!memberId) {
        return res.json({
            success: false,
            error: 'No member id provided'
        });
    }
    Member.findById(memberId, (error, member) => {
        if (error) return res.json({
            success: false,
            error
        });
        const { author, text } = req.body;
        if (firstName) member.firstName = firstName;
        if (lastName) member.lastName = lastName;
        member.save(error => {
            if (error) return res.json({
                success: false,
                error
            });
            return res.json({
                success: true
            });
        });
    });
});

router.put('/members/:memberId', (req, res) => {
    const { memberId } = req.params;
    if (!memberId) {
        return res.json({
            success: false,
            error: 'No member id provided'
        });
    }
    Member.findById(memberId, (error, member) => {
        if (error) return res.json({
            success: false,
            error
        });
        const { firstName, lastName } = req.body;
        if (firstName) member.firstName = firstName;
        if (lastName) member.lastName = lastName;
        member.save(error => {
            if (error) return res.json({
                success: false,
                error
            });
            return res.json({
                success: true
            });
        });
    });
});

router.delete('/members/:memberId', (req, res) => {
    const { memberId } = req.params;
    if (!memberId) {
        return res.json({
            success: false,
            error: 'No member id provided'
        });
    }
    Member.remove({
        _id: memberId
    }, (error, member) => {
        if (error) return res.json({
            success: false,
            error
        });
        return res.json({
            success: true
        });
    });
});
router.post('/members', (req, res) => {
    const member = new Member();
    // body parser lets us use the req.body
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide a first and last name'
        });
    }
    member.firstName = firstName;
    member.lastName = lastName;
    member.save(err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true
        });
    });
});
// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
