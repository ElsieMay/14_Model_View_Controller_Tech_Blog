const { Post } = require("../models");

const postdata = [
	{
		title: "Lorem ipsum",
		created_at: "2022-02-06T12:00:00.000Z",
		post_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		user_id: 1,
	},
	{
		title: "Curabitur at mi pharetra",
		created_at: "2022-02-06T12:00:00.000Z",
		post_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		user_id: 2,
	},
	{
		title: "Phasellus ultricies",
		created_at: "2022-02-06T12:00:00.000Z",
		post_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		user_id: 3,
	},
	{
		title: "Vivamus venenatis",
		created_at: "2022-02-06T12:00:00.000Z",
		post_text: "Vivamus venenatis et justo id bibendum.",
		user_id: 4,
	},
	{
		title: "Donec scelerisque",
		created_at: "2022-02-06T12:00:00.000Z",
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
