const ApiHelper = require('./utils/apiHelper');

const router = require('express').Router();
const Activity = require('mongoose').model('Activity');

// @route POST api/activities/
ApiHelper.create(router, Activity);

// @route POST api/activities/filter
ApiHelper.filter(router, Activity);

// @route GET api/activities/:id
ApiHelper.get(router, Activity);

// @route PATCH api/activities/:id
ApiHelper.edit(router, Activity);

// @router DELETE api/activities/:id
ApiHelper.delete(router, Activity);

router.post('/quarterData', (req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const activityName = req.body.activityName;
    const queryFields = { members: 1 };

    const callQuarter = {
        $and: [
            {
                startDate: {
                    $gte: new Date(start),
                    $lte: new Date(end)
                }
            },
            {
                name: activityName
            }
        ]
    };

    Activity.find(callQuarter, queryFields, (err, docs) => {
        if (err) throw new Error(err.message, null);
        const arr = [];
        docs.forEach(function(list) {
            arr.push.apply(arr, list.members);
        });
        return res.json(arr);
    });
});

module.exports = router;
