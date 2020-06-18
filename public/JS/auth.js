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
	window.localStorage.setItem('passwordLength', accountPasswordLength);
	const displayName =
		createAccountModalContent['createAccountDisplayName'].value;

	auth
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			auth.currentUser.updateProfile({
				displayName: displayName,
			}),
				(h1.textContent = `${auth.currentUser.displayName}'s Library`),
				auth.currentUser.sendEmailVerification(),
				closeCreateAccountModal();
		})
		.catch((err) => {
			createAccountError.style.display = 'block';
			createAccountError.textContent = err.message;
		});
});

editAccountDisplayNameConfirmBtn.addEventListener('click', () => {
	if (editAccountDisplayName.value.length > 0) {
		auth.currentUser
			.updateProfile({
				displayName: editAccountDisplayName.value,
			})
			.then(() => {
				h1.textContent = `${auth.currentUser.displayName}'s Library`;
				editAccountDisplayNameBtn.style.display = 'inline-block';
				editAccountDisplayName.style.display = 'none';
				editAccountDisplayNameConfirmBtn.style.display = 'none';
				accountDisplayName.textContent = `Your new display name is now ${editAccountDisplayName.value}.`;
			})
			.catch((err) => {
				editAccountDisplayNameError.style.display = 'block';
				editAccountDisplayNameError.textContent = err.message;
			});
	} else {
		editAccountDisplayNameError.style.display = 'block';
		editAccountDisplayNameError.textContent =
			'Display name must have at least 3 characters.';
	}
});

editAccountEmailConfirmBtn.addEventListener('click', () => {
	auth.currentUser
		.updateEmail(editAccountEmail.value)
		.then(() => {
			editAccountEmail.style.display = 'none';
			editAccountEmailConfirmBtn.style.display = 'none';
			accountEmail.textContent = editAccountEmail.value;
			editAccountEmailConfirmBtn.style.display = 'none';
			accountEmail.textContent = `Your new email address is ${editAccountEmail.value}.`;
		})
		.catch((err) => {
			editAccountEmailError.style.display = 'inline-block';
			editAccountEmailError.textContent = err.message;
		});
});

editAccountPasswordConfirmBtn.addEventListener('click', () => {
	auth
		.sendPasswordResetEmail(auth.currentUser.email)
		.then(
			(accountPassword.textContent = 'Password reset email sent.'),
			(editAccountPasswordConfirmBtn.style.display = 'none')
		)
		.catch((err) => {
			editAccountPasswordError.style.display = 'block';
			editAccountPasswordError.textContent = err.message;
		});
});

signIn.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signIn['signInEmail'].value;
	const password = signIn['signInPassword'].value;
	accountPasswordLength = signIn['signInPassword'].value.length;
	window.localStorage.setItem('passwordLength', accountPasswordLength);

	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			closeSignInModal();
		})
		.catch((err) => {
			loginError.style.display = 'block';
			loginError.textContent = err.message;
		});
});

yesSignOut.addEventListener('click', () => {
	auth
		.signOut()
		.then(
			window.localStorage.clear(),
			(signOutWarningModal.style.display = 'none'),
			(loginMessage.textContent = 'You have been logged out of your library.')
		);
});

// yesDeleteAccountBtn.addEventListener('click', () => {
// 	auth
// 		.deleteUser(firebase.auth().currentUser.uid)
// 		.then(() => {
// 			deleteAccountWarningModal.style.display = 'none';
// 			auth.signOut();
// 			loginMessage.textContent = 'Your account has been permanently deleted.';
// 		})
// 		.catch((err) => {
// 			deleteAccountError.style.display = 'block';
// 			deleteAccountError.textContent = err.message;
// 		});
// });
