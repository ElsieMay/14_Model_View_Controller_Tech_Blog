const logout = async () => {
	// Fetch logout api endpoint
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	// If successful, redirect the browser to the home page
	if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
};
// Logout event listener for when submission is made on click
document.querySelector("#logout").addEventListener("click", logout);
