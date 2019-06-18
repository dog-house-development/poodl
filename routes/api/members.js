const passport = require('passport');
const mongoose = require('mongoose');

const Member = mongoose.model('Member');
const router = require('express').Router();

const ApiHelper = require('./utils/apiHelper');
const { addSeniorCenterIdToRequest, restrictVolunteer } = require('./utils/ExpressMiddleware');

// @route POST api/members/
ApiHelper.create(router, Member);

// @route POST api/members/filter
ApiHelper.filter(router, Member, addSeniorCenterIdToRequest);

// @route GET api/members/:id
ApiHelper.get(router, Member);

// @route PATCH api/members/:id
ApiHelper.edit(router, Member);

// @route DELETE api/members/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), restrictVolunteer, (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Member.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!doc) {
            return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
        }

        // Delete all the services that are for that member
        mongoose.model('Service').deleteMany({ memberId: id }, err => {
            if (err) {
                return res.status(404).json(err);
            }
        });

        // Remove the member's id from any activity's member array.
        mongoose.model('Activity').updateMany(
            {},
            {
                $pull: {
                    members: id
                }
            },
            err => {
                if (err) {
                    return res.status(404).json(err);
                }
            }
        );

        return res.json(doc);
    });
});

module.exports = router;
