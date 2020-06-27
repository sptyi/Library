function renderBook(doc) {
	if (firebase.auth().currentUser.uid == doc.data().user) {
		let div = document.createElement('div');
		div.setAttribute('data-id', doc.id);
		div.setAttribute('class', 'card');
		div.setAttribute('draggable', 'true');
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
		if (doc.data().read) {
			read.textContent = 'I have already read this book!';
			let card = div.parentElement;
			div.setAttribute('class', 'cardRead');
		} else {
			read.textContent = 'I should read this book...';
		}
		div.appendChild(read);

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
			updateBookForm.read.checked = doc.data().read;
			updateBookModal.style.display = 'block';
		});
	}
	return (booksLoaded = true);
}

addBookBtn.addEventListener('click', () => {
	addBookModal.style.display = 'block';
});

booksForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addBookToLibrary();
	closeModal();
});

function addBookToLibrary() {
	db.collection('books').add({
		title: booksForm.title.value,
		author: booksForm.author.value,
		pages: booksForm.pages.value,
		read: booksForm.read.checked,
		user: firebase.auth().currentUser.uid,
	});
	booksForm.title.value = '';
	booksForm.author.value = '';
	booksForm.pages.value = '';
	booksForm.read = false;
}

updateBookForm.addEventListener('submit', (e) => {
	e.preventDefault();
	updateBook();
	closeModal();
});

function updateBook() {
	db.collection('books').doc(bookId).update({
		title: updateBookForm.title.value,
		author: updateBookForm.author.value,
		pages: updateBookForm.pages.value,
		read: updateBookForm.read.checked,
	});
	updateBookForm.title.value = '';
	updateBookForm.author.value = '';
	updateBookForm.pages.value = '';
	updateBookForm.read.checked = false;
}

window.addEventListener('click', outsideModalClick);

function outsideModalClick(e) {
	if (
		(e.target == addBookModal) |
		(e.target == menuModal) |
		(e.target == signInModal) |
		(e.target == createAccountModal) |
		(e.target == accountInfoModal) |
		(e.target == deleteWarningModal) |
		(e.target == signOutWarningModal) |
		(e.target == updateBookModal) |
		(e.target == deleteAccountWarningModal)
	) {
		closeModal();
	}
}

function closeModal() {
	addBookModal.style.display = 'none';
	updateBookModal.style.display = 'none';
	menuModal.style.display = 'none';
	menuBtn.classList.remove('menuModalOpen');
	signInModalContent.signInEmail.value = '';
	signInModalContent.signInPassword.value = '';
	signInModal.style.display = 'none';
	createAccountModal.style.display = 'none';
	createAccountModalContent.email.value = '';
	createAccountModalContent.password.value = '';
	createAccountModalContent.displayName.value = '';
	accountInfoModal.style.display = 'none';
	deleteWarningModal.style.display = 'none';
	signOutWarningModal.style.display = 'none';
	deleteAccountWarningModal.style.display = 'none';
}

menuBtn.addEventListener('click', () => {
	if (menuBtn.classList.contains('menuModalOpen')) {
		menuBtn.classList.remove('menuModalOpen');
	} else {
		menuBtn.setAttribute('class', 'menuModalOpen hover active');
		menuModal.style.display = 'block';
	}
});

signInBtn.addEventListener('click', () => {
	closeModal();
	signInModal.style.display = 'block';
	loginError.style.display = 'none';
});

createAccountBtn.addEventListener('click', () => {
	closeModal();
	createAccountModal.style.display = 'block';
	createAccountError.style.display = 'none';
});

accountBtn.addEventListener('click', () => {
	closeModal();
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
});

editAccountDisplayNameBtn.addEventListener('click', () => {
	accountDisplayName.textContent = 'Enter new display name:';
	editAccountDisplayNameBtn.style.display = 'none';
	editAccountDisplayName.style.display = 'inline-block';
	editAccountDisplayNameConfirmBtn.style.display = 'inline-block';
});

editAccountDisplayNameConfirmBtn.addEventListener('click', (e) => {
	e.preventDefault();
});

editAccountEmailBtn.addEventListener('click', () => {
	accountEmail.textContent = 'Enter new email address:';
	editAccountEmail.style.display = 'inline-block';
	editAccountEmailBtn.style.display = 'none';
	editAccountEmailConfirmBtn.style.display = 'inline-block';
});

editAccountPasswordBtn.addEventListener('click', () => {
	accountPassword.textContent =
		'Click Okay below to receive an email with a link to change your password.';
	editAccountPasswordBtn.style.display = 'none';
	editAccountPasswordConfirmBtn.style.display = 'inline-block';
});

signOutBtn.addEventListener('click', (e) => {
	e.preventDefault();
	signOutWarningModal.style.display = 'block';
	menuBtn.classList.remove('menuModalOpen');
	menuModal.style.display = 'none';
});

noSignOut.addEventListener('click', () => {
	signOutWarningModal.style.display = 'none';
});

deleteAccountBtn.addEventListener('click', () => {
	closeModal();
	deleteAccountWarningModal.style.display = 'block';
});

noDeleteAccountBtn.addEventListener('click', () => {
	deleteAccountWarningModal.style.display = 'none';
});

document.querySelector('#bookTitle').addEventListener('focus', () => {
	focusedFormInput = bookTitle;
	focusedFormAnimation.play;
});

document.querySelector('#updateBookTitle').addEventListener('focus', () => {
	focusedFormInput = updateBookTitle;
	focusedFormAnimation.play;
});

document.querySelector('#bookAuthor').addEventListener('focus', () => {
	focusedFormInput = bookAuthor;
	focusedFormAnimation.play;
});

document.querySelector('#updateBookAuthor').addEventListener('focus', () => {
	focusedFormInput = updateBookAuthor;
	focusedFormAnimation.play;
});

document
	.querySelector('#createAccountDisplayName')
	.addEventListener('focus', () => {
		focusedFormInput = createAccountDisplayName;
		focusedFormAnimation.play;
	});

document
	.querySelector('#editAccountDisplayName')
	.addEventListener('focus', () => {
		focusedFormInput = editAccountDisplayName;
		focusedFormAnimation.play;
	});

setTimeout(() => {
	createGridPositionForCards();
}, 2000);

function createGridPositionForCards(doc) {
	if (booksLoaded) {
		let i = 0;
		db.collection('books').onSnapshot((snapshot) => {
			for (card of cards) {
				let id = card.dataset.id;
				db.collection('books')
					.doc(id)
					.get()
					.then(() => {
						if (doc.data().gridPosition.exists == true) {
							i++;
							db.collection('books').doc(id).update({
								gridPosition: i,
							});
						}
					});
			}
		});
	}
}

var focusedFormAnimation = anime({
	targets: focusedFormInput,
	borderColor: 'red',
	scale: ['1%', '100%'],
	easing: 'easeOutBounce',
	duration: 500,
	autoplay: false,
});
