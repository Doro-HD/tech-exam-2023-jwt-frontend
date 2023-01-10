export function setupPrivate() {
	const jwt = localStorage.getItem('jwt')
	if (jwt == null) {
		unauthorizedAccess()
	} else {
		authorize(jwt)
	}
}

function unauthorizedAccess() {
	const title = document.querySelector('h3.card-title')
	title.innerText = 'Unauthorized Access'

	const body = document.querySelector('div.card-body')
	body.innerText = 'Please sign in to access this page.'
}

async function authorize(jwt) {
	try {
		const data = await fetch('http://127.0.0.1:8080/private/jwt', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + jwt
			}
		}).then(res => handleHttpErrors(res))
		
		isAuthorized(data.username)
	} catch {
		unauthorizedAccess()
	}
}

function isAuthorized(username) {
	const title = document.querySelector('h3.card-title')
	title.innerText = 'Welcome ' + username 

	const body = document.querySelector('div.card-body')
	body.innerText = 'This is your own personal page.'
}