const delButtonHandler = async (event) => {
	const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

	const response = await fetch(`/api/posts/${id}`, {
		method: "DELETE",
		body: JSON.stringify({ post_id: id }),
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert("Failed to delete post");
	}
};

document.querySelector(".delete-post").addEventListener("click", delButtonHandler);
