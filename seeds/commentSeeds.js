const { Comment } = require("../models");

const commentdata = [
	{
		comment_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		user_id: 1,
		post_id: 1,
	},
	{
		comment_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		user_id: 2,
		post_id: 4,
	},
	{
		comment_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		user_id: 5,
		post_id: 3,
	},
	{
		comment_text: "Vivamus venenatis et justo id bibendum.",
		user_id: 3,
		post_id: 1,
	},
	{
		comment_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		user_id: 4,
		post_id: 4,
	},
	{
		comment_text: "Curabitur at mi pharetra, suscipit orci ultrices, aliquam justo.",
		user_id: 2,
		post_id: 3,
	},
	{
		comment_text: "Phasellus ultricies sollicitudin nulla imperdiet facilisis.",
		user_id: 4,
		post_id: 5,
	},
	{
		comment_text: "Vivamus venenatis et justo id bibendum.",
		user_id: 5,
		post_id: 1,
	},
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
