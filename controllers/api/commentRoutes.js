const router = require("express").Router();
const { response } = require("express");
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
	try {
		const commentData = await Comment.findAll({});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const commentData = await Comment.create(req.body);

		req.session.save(() => {
			req.session.comment_id = commentData.id;
			req.session.logged_in = true;

			res.status(200).json(commentData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});
