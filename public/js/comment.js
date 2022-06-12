const commentFormHandler = async (event) => {
	event.preventDefault();

	const comment = document.querySelector("#comment-body").value;

	if (comment) {
		const response = await fetch(`/api/comments`, {
			method: "POST",
			body: JSON.stringify({ post_id, comment }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert("Failed to create comment");
		}
	}
};

document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);
