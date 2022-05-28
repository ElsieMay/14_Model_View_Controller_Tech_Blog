const sequelize = require("../config/connection");
const commentSeeds = require("./commentSeeds");
const postSeeds = require("./postSeeds");
const userSeeds = require("./userSeeds");

const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log("\n----- DATABASE SYNCED -----\n");

	await userSeeds();
	console.log("\n----- SEEDED USERS -----\n");

	await postSeeds();
	console.log("\n----- SEEDED POSTS -----\n");

	await commentSeeds();
	console.log("\n----- SEEDED COMMENTS -----\n");

	process.exit(0);
};

seedAll();
