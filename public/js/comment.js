const commentFormHandler = async (event) => {
	// Prevent form default
	event.preventDefault();
	// Query selector selects the textarea of the comment
	const comment_text = document.querySelector('textarea[name="comment-body"]').value;

	const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
	// If comment_text applies, fetch comment api and post new data
	if (comment_text) {
		const response = await fetch(`/api/comments`, {
			method: "POST",
			body: JSON.stringify({ post_id, comment_text }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// If status response is passable, replace site with new data
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to create comment");
		}
	}
};
// Comment form event listener for when submission is made on click
document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);
