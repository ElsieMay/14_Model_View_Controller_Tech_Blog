const signupFormHandler = async (event) => {
	// Prevent form default
	event.preventDefault();
	// Collect values from the signup form
	const username = document.querySelector("#name-signup").value.trim();
	const email = document.querySelector("#email-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();

	if (username && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: { "Content-Type": "application/json" },
		});
		// If successful, redirect the browser to the dashboard
		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert(response.statusText);
		}
	}
};
// Sign up event listener for when submission is made on click
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
