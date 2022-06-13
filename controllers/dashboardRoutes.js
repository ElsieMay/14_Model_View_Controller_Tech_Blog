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
			include: [
				{
					model: User,
				},
				{
					model: Comment,
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
			created_at: req.session.createdAt,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/edit/:id", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findByPk(req.params.id);

		// Serialize data so the template can read it
		const post = postData.get({ plain: true });

		// Pass serialized data and session flag into template
		res.render("editPost", {
			post,
			logged_in: req.session.logged_in,
			username: req.session.username,
			created_at: req.session.createdAt,
		});
	} catch (err) {
		console.error(err);
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
			include: [
				{
					model: User,
				},
				{
					model: Comment,
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
			created_at: req.session.createdAt,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
