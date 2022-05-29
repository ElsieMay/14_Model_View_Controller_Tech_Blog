const router = require("express").Router();
const { Project, Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");

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
					attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
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

router.get("/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.findOne(req.params.id, {
			include: [
				{
					model: Post,
					attributes: ["id", "post_text", "title", "created_at"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
				},
			],
		});

		if (!postData) {
			res.status(400).json({ message: "No post found with this id, please try again" });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			title: req.body.title,
			post_text: req.body.post_text,
			user_id: req.session.user_id,
		});

		res.status(200).json(newProject);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put("/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.update(req.params.id, {
			include: [
				{
					title: req.body.title,
					post_text: req.body.post_text,
				},
			],
		});

		if (!postData) {
			res.status(404).json({ message: "No post found with this id!" });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", withAuth, async (req, res) => {
	try {
		const projectData = await Project.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!projectData) {
			res.status(404).json({ message: "No project found with this id!" });
			return;
		}

		res.status(200).json(projectData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
