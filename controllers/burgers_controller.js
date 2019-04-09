var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

router.get("/", function(req, res) {
    burgers.all(function(data) {
        res.render("index", {data:data});
    });
});

router.post("/api/burgers", function(req, res) {
    burgers.create([
        "name", "Double Cheese"
    ], [req.body.name, req.body.sleepy],
    function(result) {
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id =" + req.params.id;

    console.log("condition", condition);

    burgers.update({
        burgers: req.body.burgers
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end;
        }
        else {
            return res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id =" + req.params.id;
    
    burgers.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;