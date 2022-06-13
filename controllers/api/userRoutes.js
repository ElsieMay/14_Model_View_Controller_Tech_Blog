const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
	try {
		// Get all Users and JOIN with user data
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
		//console logs error if received
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		// Get one post by id
		const userData = await Post.findOne(req.params.id, {
			attributes: { exclude: ["password"] },
			// Eager load comment and post models
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
			// 400 status response
			res.status(400).json({ message: "No user found with this id, please try again" });
			return;
		}
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	try {
		//Create a new post with the date included
		const userData = await User.create(req.body);
		//Saves user session when logged in
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.createdAt = new Date();
			// 200 status response
			res.status(200).json(userData);
		});
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(400).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			// 400 status response
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}
		//Checks if user password input is valid
		const validPassword = await userData.checkPassword(req.body.password);
		// 400 status response
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect email or password, please try again" });
			return;
		}
		//Saves user session when logged in
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.username = userData.username;
			req.session.createdAt = new Date();

			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(400).json(err);
	}
});

router.post("/logout", (req, res) => {
	//Allows user to logout when logged in
	if (req.session.logged_in) {
		//destroys user session
		req.session.destroy(() => {
			//ends session
			res.status(204).end();
		});
	} else {
		//console logs error if received
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
			// 404 status response
			res.status(404).json({ message: "No user found with this id!" });
			return;
		}
		// 200 status response
		res.status(200).json(userData);
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(500).json(err);
	}
});

router.put("/:id", withAuth, async (req, res) => {
	try {
		//Updates User id
		const userData = await User.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (!userData) {
			// 404 status response
			res.status(404).json({ message: "No user found with this id!" });
			return;
		}
		// 200 status response
		res.status(200).json(userData);
	} catch (err) {
		//console logs error if received
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
