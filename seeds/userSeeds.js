const { User } = require("../models");

const userdata = [
	{
		name: "Sally",
		email: "sally@hotmail.com",
		password: "password1!",
	},
	{
		name: "Tom",
		email: "tom@hotmail.com",
		password: "password1!",
	},
	{
		name: "Ahmed",
		email: "ahmed@hotmail.com",
		password: "password1!",
	},
	{
		name: "Ryan",
		email: "ryan@hotmail.com",
		password: "password1!",
	},
	{
		name: "Taylor",
		email: "taylor@hotmail.com",
		password: "password1!",
	},
	{
		name: "Jennie",
		email: "jen@hotmail.com",
		password: "password1!",
	},
	{
		name: "Shirley",
		email: "shirley@hotmail.com",
		password: "password1!",
	},
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
