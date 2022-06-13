const editFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#title").value;
	const description = document.querySelector("#post-content").value;
	console.log(title, description);
	if (title && description) {
		const response = await fetch(`/api/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify({ title, description }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(title, description);
		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Failed to create post");
		}
	}
};

document.querySelector(".edit-button").addEventListener("submit", editFormHandler);
