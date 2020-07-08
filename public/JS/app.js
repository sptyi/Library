// Render current user's books as cards
function renderBook(doc) {
	if (firebase.auth().currentUser.uid == doc.data().user) {
		let div = document.createElement('div');

		column++;
		if (firstRow == true && column > 3) {
			column = 1;
			firstRow = false;
			row = 2;
		} else if (column > 3) {
			column = 1;
			row++;
		}

		div.setAttribute('data-column', doc.data().column);
		div.setAttribute('data-row', doc.data().row);
		div.setAttribute('data-id', doc.id);
		div.setAttribute('class', 'card');
		div.setAttribute('draggable', 'true');
		bookGrid.appendChild(div);

		div.addEventListener('mouseenter', () => {
			deleteBtn.style.display = 'block';
			editBtn.style.display = 'block';
			read.classList.add('shiftDown');
		});

		div.addEventListener('mouseleave', () => {
			deleteBtn.style.display = 'none';
			editBtn.style.display = 'none';
			read.classList.remove('shiftDown');
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

		let read = document.createElement('button');
		if (doc.data().read) {
			read.textContent = 'Read';
			read.setAttribute('class', 'readBtn btn');
			div.setAttribute('class', 'cardRead');
		} else {
			read.textContent = 'Not Read';
			read.setAttribute('class', 'notReadBtn btn');
		}
		div.appendChild(read);

		read.addEventListener('click', (e) => {
			let id = e.target.parentElement.getAttribute('data-id');
			bookId = id;
			if (read.classList.contains('readBtn')) {
				db.collection('books').doc(bookId).update({
					read: false,
				});
				read.textContent = 'Not Read';
				read.setAttribute('class', 'notReadBtn btn');
			} else {
				db.collection('books').doc(bookId).update({
					read: true,
				});
				read.textContent = 'Read';
				read.setAttribute('class', 'readBtn btn');
			}
		});

		let deleteBtn = document.createElement('button');
		deleteBtn.setAttribute('class', 'deleteBtn active');
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
			deleteBtn.style.display = 'none';
			editBtn.style.display = 'none';
		});

		noDelete.addEventListener('click', () => {
			deleteWarningModal.style.display = 'none';
		});

		let editBtn = document.createElement('button');
		editBtn.setAttribute('class', 'editBtn');
		editBtn.textContent = '\u270E';
		editBtn.style.display = 'none';
		div.appendChild(editBtn);

		editBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.parentElement.getAttribute('data-id');
			bookId = id;
			updateBookForm.title.value = doc.data().title;
			updateBookForm.author.value = doc.data().author;
			updateBookForm.pages.value = doc.data().pages;
			updateBookModal.style.display = 'block';
			editBtn.style.display = 'none';
			deleteBtn.style.display = 'none';
		});
	}
}

// Sign In
signInBtn.addEventListener('click', (e) => {
	e.preventDefault();
	signInForm.style.display = 'block';
	signInBtn.style.display = 'none';
	createAccountBtn.style.display = 'none';
	backBtn.style.display = 'inline-block';
	loginMessage.textContent = 'Enter your email and password to sign in:';
});

// Create Account
createAccountBtn.addEventListener('click', (e) => {
	e.preventDefault();
	createAccountForm.style.display = 'block';
	signInBtn.style.display = 'none';
	createAccountBtn.style.display = 'none';
	backBtn.style.display = 'inline-block';
	loginMessage.textContent =
		'Enter your email, password, and a display name to sign up:';
});

// Back
backBtn.addEventListener('click', () => {
	createAccountBtn.style.display = 'inline-block';
	createAccountForm.style.display = 'none';
	signInBtn.style.display = 'inline-block';
	signInForm.style.display = 'none';
	backBtn.style.display = 'none';
	loginMessage.textContent =
		'Sign in or create an account below to save and keep track of your library!';
});

// Add Book to Library
addBookCard.addEventListener('click', () => {
	addBookCard.style.zIndex = '-1';
	addBookModal.style.display = 'block';
});

booksForm.addEventListener('submit', (e) => {
	e.preventDefault();
	bookTitle.focus();
	addBookToLibrary();
	closeModal();
});

function addBookToLibrary() {
	column++;
	db.collection('books').add({
		title: booksForm.title.value,
		author: booksForm.author.value,
		pages: booksForm.pages.value,
		read: booksForm.read.checked,
		user: firebase.auth().currentUser.uid,
		column: column,
		row: row,
	});
	booksForm.title.value = '';
	booksForm.author.value = '';
	booksForm.pages.value = '';
	booksForm.read = false;
}

// Update Books
updateBookForm.addEventListener('submit', (e) => {
	e.preventDefault();
	updateBookTitle.focus();
	updateBook();
	closeModal();
});

function updateBook() {
	db.collection('books').doc(bookId).update({
		title: updateBookForm.title.value,
		author: updateBookForm.author.value,
		pages: updateBookForm.pages.value,
	});
	updateBookForm.title.value = '';
	updateBookForm.author.value = '';
	updateBookForm.pages.value = '';
}

// Close Modals
window.addEventListener('click', outsideModalClick);

function outsideModalClick(e) {
	if (
		(e.target == addBookModal) |
		(e.target == accountInfoModal) |
		(e.target == deleteWarningModal) |
		(e.target == signOutWarningModal) |
		(e.target == updateBookModal) |
		(e.target == deleteAccountWarningModal)
	) {
		closeModal();
		addBookCard.style.zIndex = '';
	}
}

function closeModal() {
	addBookModal.style.display = 'none';
	updateBookModal.style.display = 'none';
	accountInfoModal.style.display = 'none';
	deleteWarningModal.style.display = 'none';
	signOutWarningModal.style.display = 'none';
	deleteAccountWarningModal.style.display = 'none';
}

// Account Info
function openAccountInfoModal() {
	accountDisplayName.textContent = auth.currentUser.displayName;
	accountEmail.textContent = auth.currentUser.email;
	editAccountEmailConfirmBtn.style.display = 'none';
	editAccountEmailBtn.style.display = 'inline-block';
	editAccountPasswordConfirmBtn.style.display = 'none';
	editAccountPasswordBtn.style.display = 'inline-block';
	accountPasswordDots = '';
	for (let i = window.localStorage.getItem('passwordLength'); i > 0; i--) {
		accountPasswordDots += '\u{000B7}';
	}
	accountPassword.textContent = accountPasswordDots;
	editAccountDisplayName.style.display = 'none';
	editAccountDisplayNameConfirmBtn.style.display = 'none';
	editAccountDisplayNameBtn.style.display = 'inline-block';
	accountDisplayName.style.display = 'block';
	accountDisplayName.textContent = auth.currentUser.displayName;
	editAccountEmail.style.display = 'none';
	loginError.style.display = 'none';
	createAccountError.style.display = 'none';
	editAccountDisplayNameError.style.display = 'none';
	editAccountEmailError.style.display = 'none';
	editAccountPasswordError.style.display = 'none';
	deleteAccountError.style.display = 'none';
	accountInfoModal.style.display = 'block';
}

accountBtn.addEventListener('click', () => {
	openAccountInfoModal();
});

editAccountDisplayNameBtn.addEventListener('click', () => {
	accountDisplayName.textContent = 'Enter new display name:';
	editAccountDisplayNameBtn.style.display = 'none';
	editAccountDisplayName.style.display = 'inline-block';
	editAccountDisplayNameConfirmBtn.style.display = 'inline-block';
	closeAccountEmail();
	closeAccountPassword();
});

function closeAccountDisplayName() {
	accountDisplayName.textContent = auth.currentUser.displayName;
	editAccountDisplayNameBtn.style.display = 'inline-block';
	editAccountDisplayName.style.display = 'none';
	editAccountDisplayNameConfirmBtn.style.display = 'none';
}

editAccountDisplayNameConfirmBtn.addEventListener('click', (e) => {
	e.preventDefault();
});

editAccountEmailBtn.addEventListener('click', () => {
	accountEmail.textContent = 'Enter new email address:';
	editAccountEmail.style.display = 'inline-block';
	editAccountEmailBtn.style.display = 'none';
	editAccountEmailConfirmBtn.style.display = 'inline-block';
	closeAccountDisplayName();
	closeAccountPassword();
});

function closeAccountEmail() {
	accountEmail.textContent = auth.currentUser.email;
	editAccountEmail.style.display = 'none';
	editAccountEmailBtn.style.display = 'inline-block';
	editAccountEmailConfirmBtn.style.display = 'none';
}

editAccountPasswordBtn.addEventListener('click', () => {
	accountPassword.textContent =
		'Click Okay below to receive an email with a link to change your password.';
	editAccountPasswordBtn.style.display = 'none';
	editAccountPasswordConfirmBtn.style.display = 'inline-block';
	closeAccountDisplayName();
	closeAccountEmail();
});

function closeAccountPassword() {
	accountPassword.textContent = accountPasswordDots;
	editAccountPasswordBtn.style.display = 'inline-block';
	editAccountPasswordConfirmBtn.style.display = 'none';
}

// Sign Out
signOutBtn.addEventListener('click', (e) => {
	signOutWarningModal.style.display = 'block';
});

noSignOut.addEventListener('click', () => {
	signOutWarningModal.style.display = 'none';
});

// Delete Account
deleteAccountBtn.addEventListener('click', () => {
	closeModal();
	deleteAccountWarningModal.style.display = 'block';
});

noDeleteAccountBtn.addEventListener('click', () => {
	deleteAccountWarningModal.style.display = 'none';
	openAccountInfoModal();
});

// Burger Menu
burgerMenuContainer.addEventListener('click', () => {
	if (accountBtn.style.display == 'none') {
		accountBtn.style.display = 'block';
		signOutBtn.style.display = 'block';
	} else {
		accountBtn.style.display = 'none';
		signOutBtn.style.display = 'none';
	}
});

// Media Query for Burger Menu
function isMobileDevice() {
	return window.matchMedia('(max-width: 500px)').matches;
}

isMobileDevice();

if (isMobileDevice == true) {
	accountBtn.style.display = 'none';
	signOutBtn.style.display = 'none';
}

// Drag and Drop
setTimeout(() => {
	for (const card of cards) {
		card.addEventListener('dragstart', dragStart);
		card.addEventListener('dragend', dragEnd);
		card.addEventListener('dragover', dragOver);
		card.addEventListener('dragleave', dragLeave);
		card.addEventListener('drop', dragDrop);
	}
}, 2000);

// TODO: Update column and row of held book and all books beneath held book's original position

function dragStart() {
	setTimeout(() => this.classList.add('invisible'), 0);
	held = this;
}

function dragEnd() {
	this.classList.remove('invisible');
}

function dragOver(e) {
	e.preventDefault();
	if (!this.draggable) {
		return;
	} else {
		this.classList.add('hovered');
	}
}

function dragLeave() {
	this.classList.remove('hovered');
}

function dragDrop() {
	if (!this.draggable) {
		return;
	} else {
		bookGrid.insertBefore(held, this);
		this.classList.remove('hovered');
	}
}
