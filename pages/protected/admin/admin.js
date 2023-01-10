export function setupAdmin() {
	const jwt = localStorage.getItem('jwt')
	if (jwt == null) {
		unauthorizedAccess()
	} else {
		authorize(jwt)
	}
}

let usertypeCreate = ''

function unauthorizedAccess() {
	const title = document.querySelector('h3.card-title')
	title.innerText = 'Unauthorized Access'

	const body = document.querySelector('div.card-body')
	body.innerText = 'This page is only available to admins.'
}

async function authorize(jwt) {
	try {
		const data = await fetch('http://127.0.0.1:8080/admin/jwt', {
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
	title.innerText = 'Admin Dashboard: ' + username

	const body = document.querySelector('div.card-body')
	body.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h5 class="card-title">Create user</h5>
			</div>
			<div class="card-body">
				<input class="form-control" type="text" id="create-username" placeholder="username" />
				<input class="form-control mt-2" type="password" id="create-password" placeholder="password" />

				<p id="create-user-type">Role: </p>
				
				<div class="dropdown my-2">
					<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Role
					</button>
					<ul id="user-type" class="dropdown-menu">
						<li><a class="dropdown-item">USER</a></li>
						<li><a class="dropdown-item">ADMIN</a></li>
					</ul>
				</div>

				<button id="create-user" class="btn btn-success">Create</button>
			</div>
		</div>

		<div class="card mt-2">
			<div class="card-header">
				<h5 class="card-title">Delete user</h5>
			</div>
			<div class="card-body">
				<input class="form-control" type="text" id="delete-username" placeholder="username" />

				<button id="delete-user" class="btn btn-danger mt-2">Delete</button>
			</div>
		</div>
	`

	const usertypeDropdown = document.querySelector("ul#user-type")
	usertypeDropdown.addEventListener("click", changeUserType)

	const createUserButton = document.querySelector('button#create-user')
	createUserButton.addEventListener('click', createUser)

	const deleteUserButton = document.querySelector('button#delete-user')
	deleteUserButton.addEventListener('click', deleteUser)
}

function changeUserType(event) {
	const type = event.target.text

	const pUsertype = document.querySelector('p#create-user-type')
	pUsertype.textContent = 'Role: ' + type

	usertypeCreate = type
}

async function createUser() {
	const username = document.querySelector('input#create-username').value
	const password = document.querySelector('input#create-password').value

	const data = await fetch('http://127.0.0.1:8080/admin/jwt', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('jwt')
		},
		body: JSON.stringify({username, password, testUserType: usertypeCreate})
	})
}

async function deleteUser() {
	const username = document.querySelector('input#delete-username').value

	const data = await fetch('http://127.0.0.1:8080/admin/jwt/' + username, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('jwt')
		}
	})
}