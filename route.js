const express = require('express');
const router = express.Router();
const config = require('./config');

const rooms = require('./model');

router.get('/rooms', function (req, res) {
    rooms.find(function (err, data) {
        res.json(data);
    })
});

router.post('/rooms', function (req, res) {
    console.log(req);
    var newRoom = new rooms({
        name: req.body.name,
        description: req.body.description
    })

    newRoom.save((err, newRoom) => {
        if (err) {
            res.json("Error");
        }
        else
            res.json('success');
    })

});

module.exports = router;