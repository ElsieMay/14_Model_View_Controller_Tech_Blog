const newFormHandler = async (event) => {
	// Prevent form default
	event.preventDefault();
	// Query selectors select the post names and descriptions
	const title = document.querySelector("#post-name").value;
	const post_text = document.querySelector("#post-desc").value;
	// If title and post_text applies, fetch comment api and post new data
	if (title && post_text) {
		const response = await fetch(`/api/posts`, {
			method: "POST",
			body: JSON.stringify({ title, post_text }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// If status response is passable, replace/redirect site with new data
		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Failed to create post");
		}
	}
};
// Post event listener for when submission is made on click
document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
