//Import all models, to correspond with each other
const Comment = require("./comment");
const Post = require("./post");
const User = require("./user");

User.hasMany(Project, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Post.belongsto(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

module.exports = { Comment, Post, User };
