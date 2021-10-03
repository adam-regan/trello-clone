const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

const dbo = require('../../db/conn');


router.route("/cards/add").post(function (req, res) {
	const db_connect = dbo.getDb();
	let myobj = {
		card_name: req.body.card_name,
		list_id: req.body.list_id
	};
	db_connect.collection("cards").insertOne(myobj, function (err, result) {
		if (err) throw err;
		res.send('ok');
	});
});

router.route("/cards/:id")
	.put(function (req, res) {
		const db_connect = dbo.getDb();
		db_connect
			.collection("cards")
			.updateOne(
				{ _id: mongodb.ObjectID(req.params.id) },
				{
					$set: {
						card_name: req.body.card_name
					}
				}, function (err, result) {
					if (err) throw err;
					res.send('ok');
				});
	})
	.delete(function (req, res) {
		const db_connect = dbo.getDb();
		db_connect
			.collection("cards")
			.findOneAndDelete({ _id: mongodb.ObjectID(req.params.id) }, function (err, result) {
				if (err) throw err;
				res.send('ok');
			});
	});

router.route('/cards/list/:id').get((req, res) => {
	const db_connect = dbo.getDb();
	db_connect
		.collection('cards')
		.find({ list_id: req.params.id })
		.toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
});

module.exports = router;