const router = require("express").Router();
const { response } = require("express");
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all comments and JOIN with user data
		const commentData = await Comment.findAll({
			user_id: req.session.user_id,
			post_id: req.body.post_id,
			created_at: req.session.createdAt,
		});

		// Serialize data so the template can read it
		const posts = commentData.map((posts) => posts.get({ plain: true }));
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", withAuth, async (req, res) => {
	try {
		// Create a new comment when user is logged in
		const newComment = await Comment.create({
			comment_text: req.body.comment_text,
			user_id: req.session.user_id,
			post_id: req.body.post_id,
		});
		// 200 status response
		res.status(200).json(newComment);
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(400).json(err);
	}
});

module.exports = router;
