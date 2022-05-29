const { User } = require("../models");

const userdata = [
	{
		username: "Sally",
		email: "sally@hotmail.com",
		password: "password1!",
	},
	{
		username: "Tom",
		email: "tom@hotmail.com",
		password: "password1!",
	},
	{
		username: "Ahmed",
		email: "ahmed@hotmail.com",
		password: "password1!",
	},
	{
		username: "Ryan",
		email: "ryan@hotmail.com",
		password: "password1!",
	},
	{
		username: "Taylor",
		email: "taylor@hotmail.com",
		password: "password1!",
	},
	{
		username: "Jennie",
		email: "jen@hotmail.com",
		password: "password1!",
	},
	{
		username: "Shirley",
		email: "shirley@hotmail.com",
		password: "password1!",
	},
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
