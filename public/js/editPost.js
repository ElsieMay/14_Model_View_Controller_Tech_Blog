const editFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#post-title").value.trim();
	const description = document.querySelector("#post-desc").value.trim();

	if (title && description) {
		const response = await fetch(`/api/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify({ title, description }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Failed to create post");
		}
	}
};

document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);