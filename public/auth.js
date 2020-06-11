auth.onAuthStateChanged((user) => {
	if (user) {
		closeSignInModal();
		h2.style.display = 'none';
		db.collection('books')
			.orderBy('author')
			.onSnapshot((snapshot) => {
				let changes = snapshot.docChanges();
				changes.forEach((change) => {
					if (change.type == 'added') {
						renderBook(change.doc);
					} else if (change.type == 'removed') {
						let div = bookGrid.querySelector('[data-id=' + change.doc.id + ']');
						bookGrid.removeChild(div);
					}
				});
			});
	} else {
		closeMenuModal();
		bookGrid.innerHTML = '';
		h2.style.display = 'block';
	}
});

const h2 = document.querySelector('h2');

const createAccountModalContent = document.querySelector(
	'#createAccountModalContent'
);
const signIn = document.querySelector('#signInModalContent');
const signOut = document.querySelector('#signOutBtn');

createAccountModalContent.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = createAccountModalContent['createAccountEmail'].value;
	const password = createAccountModalContent['createAccountPassword'].value;

	auth.createUserWithEmailAndPassword(email, password).then((cred) => {
		const modal = document.querySelector('#createAccountModal');
		closecreateAccountModal();
	});
});

signIn.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signIn['signInEmail'].value;
	const password = signIn['signInPassword'].value;

	auth.signInWithEmailAndPassword(email, password);
});

signOut.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut();
});
