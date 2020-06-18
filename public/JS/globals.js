const h1 = document.querySelector('#h1');
const bookGrid = document.querySelector('#bookGrid');
const addBookBtn = document.querySelector('#addBookBtn');
const addBookModal = document.querySelector('#addBookModal');
const updateBookModal = document.querySelector('#updateBookModal');
const updateBookForm = document.querySelector('#updateBookForm');
const booksForm = document.querySelector('#booksForm');
const menuBtn = document.querySelector('#menuBtn');
const menuModal = document.querySelector('#menuModal');
const signInBtn = document.querySelector('#signInBtn');
const createAccountBtn = document.querySelector('#createAccountBtn');
const signInModal = document.querySelector('#signInModal');
const createAccountModal = document.querySelector('#createAccountModal');
const createAccountError = document.querySelector('#createAccountError');
const editAccountUserNameError = document.querySelector('#editAccountUserNameError');
const editAccountEmailError = document.querySelector('#editAccountEmail');
const editAccountPasswordError = document.querySelector('#editAccountPasswordError');
const accountInfoModal = document.querySelector('#accountInfoModal');
const editAccountDisplayNameBtn = document.querySelector(
	'#editAccountDisplayNameBtn'
);
const editAccountDisplayNameConfirmBtn = document.querySelector('#editAccountDisplayNameConfirmBtn')
const editAccountEmailBtn = document.querySelector('#editAccountEmailBtn');
const editAccountPasswordBtn = document.querySelector('#editAccountPasswordBtn');
const accountBtn = document.querySelector('#accountBtn');
const accountDisplayName = document.querySelector('#accountDisplayName');
const accountEmail = document.querySelector('#accountEmail');
const deleteWarningModal = document.querySelector('#deleteWarningModal');
const yesDelete = document.querySelector('#yesDelete');
const noDelete = document.querySelector('#noDelete');
const h2 = document.querySelector('h2');
const divSignOut = document.querySelector('#divSignOut');
const divAccount = document.querySelector('#divAccount');
const signIn = document.querySelector('#signInModalContent');
const signOutBtn = document.querySelector('#signOutBtn');
const signOutWarningModal = document.querySelector('#signOutWarningModal');
const createAccountModalContent = document.querySelector(
	'#createAccountModalContent'
);
// const yesDeleteAccountBtn = document.querySelector('#yesDeleteAccountBtn');
// const noDeleteAccountBtn = document.querySelector('#noDeleteAccountBtn');
let accountPasswordLength = '';
let accountPasswordDots = '';
let bookId = '';
