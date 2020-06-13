const h1 = document.querySelector('#h1');
const bookGrid = document.querySelector('#bookGrid');
const addBookBtn = document.querySelector('#addBookBtn');
const addBookModal = document.querySelector('#addBookModal');
const booksForm = document.querySelector('#booksForm');
const menuBtn = document.querySelector('#menuBtn');
const menuModal = document.querySelector('#menuModal');
const signInBtn = document.querySelector('#signInBtn');
const createAccountBtn = document.querySelector('#createAccountBtn');
const signInModal = document.querySelector('#signInModal');
const createAccountModal = document.querySelector('#createAccountModal');
const accountModal = document.querySelector('#accountModal');
const deleteWarningModal = document.querySelector('#deleteWarningModal');
const yesDelete = document.querySelector('#yesDelete');
const noDelete = document.querySelector('#noDelete');
const h2 = document.querySelector('h2');
const divSignOut = document.querySelector('#divSignOut');
const divAccount = document.querySelector('#divAccount');
const signIn = document.querySelector('#signInModalContent');
const signOut = document.querySelector('#signOutBtn');
const createAccountModalContent = document.querySelector(
	'#createAccountModalContent'
);

function renderBook(doc) {
	let div = document.createElement('div');
	div.setAttribute('data-id', doc.id);
	div.setAttribute('class', 'card');
	bookGrid.appendChild(div);
	div.addEventListener('mouseenter', () => {
		deleteBtn.style.display = 'block';
		editBtn.style.display = 'block';
	});

	div.addEventListener('mouseleave', () => {
		deleteBtn.style.display = 'none';
		editBtn.style.display = 'none';
	});

	let title = document.createElement('div');
	title.textContent = doc.data().title;
	div.appendChild(title);

	let author = document.createElement('div');
	author.textContent = `by ${doc.data().author}`;
	div.appendChild(author);

	let pages = document.createElement('div');
	pages.textContent = `${doc.data().pages} pages`;
	if (doc.data().pages) {
		div.appendChild(pages);
	}

	let read = document.createElement('div');
	if (doc.data().read.checked) {
		read.textContent = 'I have already read this book!';
	} else {
		read.textContent = 'I should read this book...';
	}
	div.appendChild(read);

	let deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('class', 'deleteBtn');
	deleteBtn.textContent = '\u00D7';
	deleteBtn.style.display = 'none';
	div.appendChild(deleteBtn);

	deleteBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		deleteWarningModal.style.display = 'block';
		yesDelete.addEventListener('click', () => {
			deleteWarningModal.style.display = 'none';
			db.collection('books').doc(id).delete();
		});
	});

	let editBtn = document.createElement('button');
	editBtn.setAttribute('class', 'editBtn');
	editBtn.textContent = '\u270E';
	editBtn.style.display = 'none';
	div.appendChild(editBtn);

	noDelete.addEventListener('click', () => {
		deleteWarningModal.style.display = 'none';
	});

	if (div) {
		div.style.cursor = 'pointer';
	}
}

addBookBtn.addEventListener('click', () => {
	openaddBookModal();
});

/*
db.collection('books')
	.get()
	.then(snapshot => {
		snapshot.docs.forEach((doc) => {
			renderBook(doc);
		});
	});
*/

booksForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addBookToLibrary();
	closeaddBookModal();
});

function addBookToLibrary() {
	db.collection('books').add({
		title: booksForm.title.value,
		author: booksForm.author.value,
		pages: booksForm.pages.value,
		read: booksForm.read.value,
	});
	booksForm.title.value = '';
	booksForm.author.value = '';
	booksForm.pages.value = '';
	booksForm.read.value = '';
}

window.addEventListener('click', outsideModalClick);

function closeaddBookModal() {
	addBookModal.style.display = 'none';
}

function outsideModalClick(e) {
	if (
		(e.target == addBookModal) |
		(e.target == menuModal) |
		(e.target == signInModal) |
		(e.target == createAccountModal) |
		(e.target == accountModal) |
		(e.target == deleteWarningModal)
	) {
		closeaddBookModal();
		closeMenuModal();
		closeSignInModal();
		closeCreateAccountModal();
		// closeAccountModal();
		closeDeleteWarningModal();
	}
}

function openaddBookModal() {
	addBookModal.style.display = 'block';
}

function closeMenuModal() {
	menuModal.style.display = 'none';
	menuBtn.classList.remove('menuModalOpen');
}

function closeSignInModal() {
	signInModalContent.signInEmail.value = '';
	signInModalContent.signInPassword.value = '';
	signInModal.style.display = 'none';
}

function closeCreateAccountModal() {
	createAccountModal.style.display = 'none';
	createAccountModalContent.email.value = '';
	createAccountModalContent.password.value = '';
	createAccountModalContent.displayName.value = '';
}

// function closeAccountModal() {
// 	accountModal.style.display = 'none';
// }

function closeDeleteWarningModal() {
	deleteWarningModal.style.display = 'none';
}

menuBtn.addEventListener('click', () => {
	if (menuBtn.classList.contains('menuModalOpen')) {
		menuBtn.classList.remove('menuModalOpen');
	} else {
		menuBtn.setAttribute('class', 'menuModalOpen');
		menuModal.style.display = 'block';
	}
});

signInBtn.addEventListener('click', () => {
	closeMenuModal();
	signInModal.style.display = 'block';
});

createAccountBtn.addEventListener('click', () => {
	closeMenuModal();
	createAccountModal.style.display = 'block';
});
