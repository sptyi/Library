auth.onAuthStateChanged((user, doc) => {
	if (user) {
		closeSignInModal();
		h2.style.display = 'none';
		h1.textContent = `${auth.currentUser.displayName}'s Library`;
		addBookBtn.style.display = 'block';
		signInBtn.style.display = 'none';
		createAccountBtn.style.display = 'none';
		signOut.style.display = 'block';
		divSignOut.style.gridRow = '2 / 2';
		accountBtn.style.display = 'block';
		divAccount.style.gridRow = '1 / 1';
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
					} else if (change.type == 'modified') {
						title.textContent = doc.data().title;
						author.textContent = `by ${doc.data().author}`;
						pages.textContent = `${doc.data().pages} pages`;
						if (doc.data().read.checked) {
							read.textContent = 'I have already read this book!';
						} else {
							read.textContent = 'I should read this book...';
						}
					}
				});
			});
	} else {
		closeMenuModal();
		bookGrid.innerHTML = '';
		h1.textContent = 'My Library';
		h2.style.display = 'block';
		addBookBtn.style.display = 'none';
		signInBtn.style.display = 'block';
		createAccountBtn.style.display = 'block';
		signOut.style.display = 'none';
		divSignOut.style.gridRow = '3 / 3';
		accountBtn.style.display = 'none';
		divAccount.style.gridRow = '4 / 4';
	}
});

createAccountModalContent.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = createAccountModalContent['createAccountEmail'].value;
	const password = createAccountModalContent['createAccountPassword'].value;
	const displayName =
		createAccountModalContent['createAccountDisplayName'].value;

	auth.createUserWithEmailAndPassword(email, password).then((cred) => {
		const modal = document.querySelector('#createAccountModal');

		auth.currentUser.updateProfile({
			displayName: displayName,
		});
		h1.textContent = `${auth.currentUser.displayName}'s Library`;

		auth.currentUser.sendEmailVerification();

		closeCreateAccountModal();
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
