//Import all models, to correspond with each other
const Comment = require("./comment");
const Post = require("./post");
const User = require("./user");

Comment.belongsto(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

Comment.belongsto(Post, {
	foreignKey: "post_id",
	onDelete: "SET NULL",
});

Post.belongsto(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

Post.hasMany(Comment, {
	foreignKey: "post_id",
});

User.hasMany(Post, {
	foreignKey: "user_id",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

module.exports = { Comment, Post, User };
