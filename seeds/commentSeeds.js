const { Comment } = require("../models");

const commentdata = [
	{
		comment_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 1,
		post_id: 1,
	},
	{
		comment_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 2,
		post_id: 4,
	},
	{
		comment_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 5,
		post_id: 3,
	},
	{
		comment_text: "Vivamus venenatis et justo id bibendum.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 3,
		post_id: 1,
	},
	{
		comment_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 4,
		post_id: 4,
	},
	{
		comment_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 2,
		post_id: 3,
	},
	{
		comment_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 4,
		post_id: 5,
	},
	{
		comment_text: "Vivamus venenatis et justo id bibendum.",
		created_at: "2022-02-06T12:00:00.000Z",
		user_id: 5,
		post_id: 1,
	},
];

const seedComments = () =>
	Comment.bulkCreate(commentdata, {
		individualHooks: true,
		returning: true,
	});

module.exports = seedComments;
