const userAuth = firebase.auth();
auth.onAuthStateChanged((user) => {
	if (user) {
		closeSignInModal();
		h2.style.display = 'none';
		h1.textContent = `${auth.currentUser.displayName}'s Library`;
		addBookBtn.style.display = 'block';
		signInBtn.style.display = 'none';
		createAccountBtn.style.display = 'none';
		signOutBtn.style.display = 'block';
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
						let div = bookGrid.querySelector('[data-id=' + change.doc.id + ']');
						bookGrid.removeChild(div);
						renderBook(change.doc);
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
		signOutBtn.style.display = 'none';
		divSignOut.style.gridRow = '3 / 3';
		accountBtn.style.display = 'none';
		divAccount.style.gridRow = '4 / 4';
	}
});

createAccountModalContent.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = createAccountModalContent['createAccountEmail'].value;
	const password = createAccountModalContent['createAccountPassword'].value;
	accountPasswordLength =
		createAccountModalContent['createAccountPassword'].value.length;
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

editAccountDisplayNameConfirmBtn.addEventListener('click', () => {
	auth.currentUser
		.updateProfile({
			displayName: editAccountDisplayName.value,
		})
		.then(
			(h1.textContent = `${auth.currentUser.displayName}'s Library`),
			(editAccountDisplayNameBtn.style.display = 'inline-block'),
			(editAccountDisplayName.style.display = 'none'),
			(editAccountDisplayNameConfirmBtn.style.display = 'none'),
			(accountDisplayName.textContent = `Your new display name is now ${editAccountDisplayName.value}.`)
		);
});

editAccountEmailConfirmBtn.addEventListener('click', () => {
	auth.currentUser
		.updateProfile({
			email: editAccountEmail.value,
		})
		.then(
			(editAccountEmailBtn.style.display = 'inline-block'),
			(editAccountEmail.style.display = 'none'),
			(editAccountEmailConfirmBtn.style.display = 'none'),
			(accountEmail.textContent = auth.currentUser.email),
			(editAccountEmailConfirmBtn.style.display = 'none')
		);
});

editAccountPasswordConfirmBtn.addEventListener('click', (currentUser) => {
	auth
		.sendPasswordResetEmail(auth.currentUser.email)
		.then(
			(accountPassword.textContent = accountPasswordDots),
			(editAccountPasswordConfirmBtn.style.display = 'none')
		);
});

signIn.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signIn['signInEmail'].value;
	const password = signIn['signInPassword'].value;
	accountPasswordLength = signIn['signInPassword'].value.length;

	auth.signInWithEmailAndPassword(email, password);
});

yesSignOut.addEventListener('click', () => {
	auth
		.signOut()
		.then(
			(signOutWarningModal.style.display = 'none'),
			(loginMessage.textContent = 'You have been logged out of your library.')
		);
});

yesDeleteAccountBtn.addEventListener('click', () => {
	admin
		.auth()
		.deleteUser(firebase.auth().currentUser.uid)
		.then(function () {
			deleteAccountWarningModal.style.display = 'none';
		})
		.catch(function (error) {
			console.log('Error deleting user:', error);
		});
});
