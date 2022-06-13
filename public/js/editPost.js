const editFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#title").value;
	const post_text = document.querySelector("#post-content").value;
	const id = document.location.href.split("/").pop();
	if (title && post_text) {
		const response = await fetch(`/api/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify({ title, post_text }),
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

document.querySelector(".edit-post").addEventListener("submit", editFormHandler);
