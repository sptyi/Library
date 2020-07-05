// Render current user's cards
function renderBook(doc) {
	if (firebase.auth().currentUser.uid == doc.data().user) {
		column++;
		let div = document.createElement('div');
		if ((firstRow = true && column > 3)) {
			column = 1;
			firstRow = false;
		} else {
			column > 3 ? (column = 1) : column;
		}
		div.setAttribute('data-column', column);
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
		});
	}
}

signInBtn.addEventListener('click', (e) => {
	e.preventDefault();
	signInForm.style.display = 'block';
	signInBtn.style.display = 'none';
	createAccountBtn.style.display = 'none';
	backBtn.style.display = 'inline-block';
	loginMessage.textContent = 'Enter your email and password to sign in:';
});

createAccountBtn.addEventListener('click', (e) => {
	e.preventDefault();
	createAccountForm.style.display = 'block';
	signInBtn.style.display = 'none';
	createAccountBtn.style.display = 'none';
	backBtn.style.display = 'inline-block';
	loginMessage.textContent =
		'Enter your email, password, and a display name to sign up:';
});

backBtn.addEventListener('click', () => {
	createAccountBtn.style.display = 'inline-block';
	createAccountForm.style.display = 'none';
	signInBtn.style.display = 'inline-block';
	signInForm.style.display = 'none';
	backBtn.style.display = 'none';
	loginMessage.textContent =
		'Sign in or create an account below to save and keep track of your library!';
});

// Get current user's cards
// db.collection('books')
// 	.get()
// 	.then(function (querySnapshot) {
// 		querySnapshot.forEach(function (doc) {
// 			if (firebase.auth().currentUser.uid == doc.data().user) {
// 				// doc.data() is never undefined for query doc snapshots
// 				console.log(doc.id, ' => ', doc.data().user);
// 			}
// 		});
// });

addBookCard.addEventListener('click', () => {
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
	});
	updateBookForm.title.value = '';
	updateBookForm.author.value = '';
	updateBookForm.pages.value = '';
}

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

createAccountBtn.addEventListener('click', () => {
	createAccountForm.style.display = 'block';
	createAccountError.style.display = 'none';
});

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

signOutBtn.addEventListener('click', (e) => {
	signOutWarningModal.style.display = 'block';
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
	openAccountInfoModal();
});

/*
Drag and hold card
Hover over other cards and reorder
Drop card and keep in place
Update grid positions in firestore
*/

// Begin drag and drop code.

// Loop through cards and add listeners
for (card of cards) {
	card.addEventListener('dragstart', dragStart);
	card.addEventListener('dragend', dragEnd);
	card.addEventListener('dragover', dragOver);
	card.addEventListener('dragenter', dragEnter);
	card.addEventListener('dragleave', dragLeave);
	card.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
	console.log('holding');
	this.className += ' hold';
	setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
	this.style.gridColumn = 1;
	// this.className = 'fill';
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
	this.className += ' hovered';
}

function dragLeave() {
	this.className -= ' hovered';
	// this.className = 'empty';
}

function dragDrop() {
	this.style.gridColumn = 1;
	// this.className = 'empty';
	// this.append(fill);
}

// End drag and drop code.

// setTimeout(() => {
// 	createGridPositionForCards();
// }, 2000);

// function createGridPositionForCards(doc) {
// 	let i = 0;
// 	db.collection('books').onSnapshot((snapshot) => {
// 		for (card of cards) {
// 			let id = card.dataset.id;
// 			db.collection('books')
// 				.doc(id)
// 				.get()
// 				.then(() => {
// 					if (doc.data().gridPosition.exists == false) {
// 						i++;
// 						db.collection('books').doc(id).update({
// 							gridPosition: i,
// 						});
// 					}
// 				});
// 		}
// 	});
// }
