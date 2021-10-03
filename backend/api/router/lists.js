const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

const dbo = require('../../db/conn');


router.route('/lists').get((req, res) => {
	const db_connect = dbo.getDb();
	db_connect
		.collection('lists')
		.find({})
		.toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
});

router.route("/lists/:id")
	.get(function (req, res) {
		const db_connect = dbo.getDb();
		let myquery = { id: req.body.id };
		db_connect
			.collection("lists")
			.findOne(myquery, function (err, result) {
				if (err) throw err;
				res.json(result);
			});
	})
	.delete(function (req, res) {
		const db_connect = dbo.getDb();
		db_connect
			.collection("lists")
			.findOneAndDelete({ _id: mongodb.ObjectID(req.params.id) }, function (err, doc) {
				if (err) throw err;
			});
		db_connect
			.collection("cards")
			.deleteMany({ list_id: req.params.id }, function (err, doc) {
				if (err) throw err;
				res.end();
			});

	});


router.route("/lists/add").post(function (req, res) {
	const db_connect = dbo.getDb();
	let myobj = {
		list_name: req.body.list_name,
	};
	db_connect.collection("lists").insertOne(myobj, function (err, result) {
		if (err) throw err;
		res.send('ok');
	});
});

module.exports = router;