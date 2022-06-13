const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
	try {
		const userData = await User.findAll({
			attributes: { exclude: ["password"] },
		});

		// Serialize data so the template can read it
		const users = userData.map((users) => users.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("users", {
			users,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const userData = await Post.findOne(req.params.id, {
			attributes: { exclude: ["password"] },
			include: [
				{
					model: Post,
					attributes: ["id", "post_text", "title"],
				},
				{
					model: Comment,
					attributes: ["id", "comment_text", "post_id"],
				},
			],
		});

		if (!userData) {
			res.status(400).json({ message: "No user found with this id, please try again" });
			return;
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.createdAt = new Date();

			res.status(200).json(userData);
		});
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.username = userData.username;
			req.session.createdAt = new Date();

			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		console.error(err);
		res.status(404).end();
	}
});

router.delete("/:id", withAuth, async (req, res) => {
	try {
		const userData = await User.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!userData) {
			res.status(404).json({ message: "No user found with this id!" });
			return;
		}

		res.status(200).json(userData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.put("/:id", withAuth, async (req, res) => {
	try {
		const userData = await User.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (!userData) {
			res.status(404).json({ message: "No user found with this id!" });
			return;
		}

		res.status(200).json(userData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
