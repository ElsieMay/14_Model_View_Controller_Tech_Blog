const editFormHandler = async (event) => {
	// Prevent form default
	event.preventDefault();
	// Query selectors select the post content and title
	const title = document.querySelector("#title").value;
	const post_text = document.querySelector("#post-content").value;
	const id = document.location.href.split("/").pop();
	// If title and post_text applies, fetch post api and update with new data
	if (title && post_text) {
		const response = await fetch(`/api/posts/${id}`, {
			method: "PUT",
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
document.querySelector(".edit-post").addEventListener("submit", editFormHandler);
