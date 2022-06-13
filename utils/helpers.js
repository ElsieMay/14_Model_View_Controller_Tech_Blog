module.exports = {
	format_date: (date) => {
		return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
	},
	format_date_long: (date) => {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString(options);
	},

	format_plural: (word, amount) => {
		if (amount !== 1) {
			return `${word}s`;
		}

		return word;
	},
};
