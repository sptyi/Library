// Authentication
auth.onAuthStateChanged((user) => {
	if (user) {
		closeModal();
		h2.style.display = 'none';
		h1.textContent = `${auth.currentUser.displayName}'s Library`;
		createAccountBtn.style.display = 'none';
		signInBtn.style.display = 'none';
		backBtn.style.display = 'none';
		logo.style.display = 'none';
		icon.style.display = 'block';
		addBookCard.style.display = 'block';
		burgerMenuContainer.style.display = 'block';
		db.collection('books')
			.orderBy('row')
			.orderBy('column')
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
		bookGrid.innerHTML = '';
		h1.textContent = 'My Library';
		h2.style.display = 'block';
		signInBtn.style.display = 'inline-block';
		signOutBtn.style.display = 'none';
		accountBtn.style.display = 'none';
		logo.style.display = 'block';
		icon.style.display = 'none';
		addBookCard.style.display = 'none';
		burgerMenuContainer.style.display = 'none';
	}
});

// Create Account
createAccountFormContent.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = createAccountFormContent['createAccountEmail'].value;
	let passwordInput = createAccountFormContent['createAccountPassword'].value;
	let passwordVerify =
		createAccountFormContent['createAccountPasswordVerify'].value;
	let password;
	if (passwordInput == passwordVerify) {
		password = createAccountFormContent['createAccountPassword'].value;
	} else {
		createAccountError.style.display = 'inline-block';
		createAccountError.textContent =
			'The password does not match. Please check to be sure the password was entered correctly.';
	}
	accountPasswordLength =
		createAccountFormContent['createAccountPassword'].value.length;
	window.localStorage.setItem('passwordLength', accountPasswordLength);
	const displayName =
		createAccountFormContent['createAccountDisplayName'].value;

	auth
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			auth.currentUser.updateProfile({
				displayName: displayName,
			}),
				setTimeout(() => {
					h1.textContent = `${auth.currentUser.displayName}'s Library`;
				}, 2000);
			auth.currentUser.sendEmailVerification(),
				(createAccountFormContent.style.display = 'none'),
				(signIn.style.display = 'none'),
				(backBtn.style.display = 'none');
		})
		.catch((err) => {
			createAccountError.style.display = 'block';
			createAccountError.textContent = err.message;
		});
});

// Update Account
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

// Sign In
signIn.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signIn['signInEmail'].value;
	const password = signIn['signInPassword'].value;
	accountPasswordLength = signIn['signInPassword'].value.length;
	window.localStorage.setItem('passwordLength', accountPasswordLength);

	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			(signIn.style.display = 'none'), (backBtn.style.display = 'none');
		})
		.catch((err) => {
			loginError.style.display = 'block';
			loginError.textContent = 'Invalid email or password.';
		});
});

// Sign Out
yesSignOut.addEventListener('click', () => {
	auth
		.signOut()
		.then(
			window.localStorage.clear(),
			(signOutWarningModal.style.display = 'none'),
			(loginMessage.textContent = 'You have been logged out of your library.')
		);
});

// Delete Account
yesDeleteAccountBtn.addEventListener('click', () => {
	firebase
		.auth()
		.currentUser.delete()
		.then(function () {
			window.localStorage.clear();
			deleteAccountWarningModal.style.display = 'none';
			loginMessage.textContent = 'Your account has been permanently deleted.';
			createAccountBtn.style.display = 'inline-block';
			signInBtn.style.display = 'none';
		})
		.catch(function (err) {
			deleteAccountError.textContent =
				'There was an error deleting your account. Please log out and back in again to retry.';
		});
});
