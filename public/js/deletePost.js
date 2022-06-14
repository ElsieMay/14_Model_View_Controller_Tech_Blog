const delButtonHandler = async (event) => {
	const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

	//Fetch post api by id
	const response = await fetch(`/api/posts/${id}`, {
		// Delete method is called on id selected
		method: "DELETE",
		body: JSON.stringify({ post_id: id }),
	});
	// If status response is passable, replace dashboard with new data
	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert("Failed to delete post");
	}
};
// Post event listener for when submission is made on click
document.querySelector(".delete-post").addEventListener("click", delButtonHandler);
