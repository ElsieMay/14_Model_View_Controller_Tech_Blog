const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all posts and JOIN with user data
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ["id", "post_text", "title", "created_at"],
			include: [
				{
					model: User,
					attributes: ["name"],
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
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
