const router = require("express").Router();
const { response } = require("express");
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all comments and JOIN with user data
		const commentData = await Comment.findAll({});

		// Serialize data so the template can read it
		const posts = commentData.map((posts) => posts.get({ plain: true }));
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", withAuth, async (req, res) => {
	try {
		const newComment = await Post.create({
			comment_text: req.body.comment_text,
			user_id: req.session.user_id,
			post_id: req.body.post_id,
		});

		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete("/:id", withAuth, async (req, res) => {
	try {
		const commentData = await Project.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!commentData) {
			res.status(404).json({ message: "No comment found with this id!" });
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
