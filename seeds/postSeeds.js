const { Post } = require("../models");

const postdata = [
	{
		title: "Lorem ipsum",
		post_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		user_id: 1,
	},
	{
		title: "Curabitur at mi pharetra",
		post_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		user_id: 2,
	},
	{
		title: "Phasellus ultricies",
		post_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		user_id: 3,
	},
	{
		title: "Vivamus venenatis",
		post_text: "Vivamus venenatis et justo id bibendum.",
		user_id: 4,
	},
	{
		title: "Donec scelerisque",
		post_text: "Donec scelerisque ullamcorper hendrerit.",
		user_id: 5,
	},
];

const seedPost = () =>
	Post.bulkCreate(postdata, {
		individualHooks: true,
		returning: true,
	});

module.exports = seedPost;
