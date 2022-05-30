const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ["id", "post_text", "title"],
			include: [
				{
					model: User,
					attributes: ["username"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "user_id", "post_id"],
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
		res.status(500).json(err);
	}
});

router.get("/edit/:id", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findByPk(req.params.id, {
			attributes: ["id", "post_text", "title"],
			include: [
				{
					model: User,
					attributes: ["username"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "user_id", "post_id"],
				},
			],
		});

		// Serialize data so the template can read it
		const posts = postData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("edit-post", {
			posts,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/create", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ["id", "post_text", "title"],
			include: [
				{
					model: User,
					attributes: ["username"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "user_id", "post_id"],
				},
			],
		});

		// Serialize data so the template can read it
		const posts = postData.map((posts) => posts.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("createPost", {
			posts,
			logged_in: req.session.logged_in,
			username: req.session.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
