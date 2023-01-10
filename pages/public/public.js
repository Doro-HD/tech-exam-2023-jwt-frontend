export function setupSignIn() {
	const form = document.querySelector("form")
	form.addEventListener("submit", signIn)
}

async function signIn(event) {
	event.preventDefault()

	const username = document.querySelector("input#username").value
	const password = document.querySelector("input#password").value

	const data = await fetch("http://127.0.0.1:8080/sign-in/jwt", {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username, password})
	}).then(res => handleHttpErrors(res))

	localStorage.setItem("jwt", data.jwt)

	window.router.navigate("/private")
}