const sequelize = require("../config/connection");
const commentSeeds = require("./commentSeeds");
const postSeeds = require("./postSeeds");
const userSeeds = require("./userSeeds");

const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log("\n----- DATABASE SYNCED -----\n");

	await commentSeeds();
	console.log("\n----- SEEDED COMMENTS -----\n");

	await postSeeds();
	console.log("\n----- SEEDED POSTS -----\n");

	await userSeeds();
	console.log("\n----- SEEDED USERS -----\n");

	process.exit(0);
};

seedAll();
