const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");

router.get("/", async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			attributes: ["id", "post_text", "title"],
			include: [
				{
					model: Comment,
					attributes: ["id", "comment_text", "post_id", "user_id"],
				},
				{
					model: User,
					attributes: ["username"],
				},
			],
		});

		// Serialize data so the template can read it
		const posts = postData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("homepage", {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

router.get("/post/:id", async (req, res) => {
	try {
		const postData = await Post.findOne(req.params.id, {
			attributes: ["id", "post_text", "title"],
			include: [
				{
					model: Comment,
					attributes: ["id", "comment_text", "post_id", "user_id"],
				},
				{
					model: User,
					attributes: ["username"],
				},
			],
		});

		const posts = postData.map((posts) => posts.get({ plain: true }));

		res.render("editPost", {
			posts,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
