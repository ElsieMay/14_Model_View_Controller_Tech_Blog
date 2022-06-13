const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ["id", "post_text", "title"],
			include: [
				User,
				{
					model: Comment,
					attributes: ["id", "comment_text", "post_id", "user_id"],
				},
			],
		});

		// Serialize data so the template can read it
		const posts = postData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("dashboard", {
			posts,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.findOne(req.params.id, {
			include: [
				{
					model: Post,
					attributes: ["id", "post_text", "title"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "user_id", "post_id"],
				},
			],
		});

		if (!postData) {
			res.status(400).json({ message: "No post found with this id, please try again" });
			return;
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post("/", withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			title: req.body.title,
			post_text: req.body.post_text,
			user_id: req.session.user_id,
			created_at: req.session.createdAt,
		});
		console.log("newpost", newPost);
		res.status(200).json(newPost);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.put("/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!postData) {
			res.status(404).json({ message: "No post found with this id!" });
			return;
		}
		res.status(200).json(postData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete("/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!postData) {
			res.status(404).json({ message: "No post found with this id!" });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
