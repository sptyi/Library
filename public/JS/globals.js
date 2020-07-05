const h1 = document.querySelector('#h1');
const icon = document.querySelector('#icon');
const bookGrid = document.querySelector('#bookGrid');
const addBookModal = document.querySelector('#addBookModal');
const updateBookModal = document.querySelector('#updateBookModal');
const updateBookForm = document.querySelector('#updateBookForm');
const booksForm = document.querySelector('#booksForm');
const createAccountBtn = document.querySelector('#createAccountBtn');
const createAccountForm = document.querySelector('#createAccountForm');
const createAccountError = document.querySelector('#createAccountError');
const editAccountUserNameError = document.querySelector(
	'#editAccountUserNameError'
);
const editAccountEmailError = document.querySelector('#editAccountEmail');
const editAccountPasswordError = document.querySelector(
	'#editAccountPasswordError'
);
const accountInfoModal = document.querySelector('#accountInfoModal');
const editAccountDisplayNameBtn = document.querySelector(
	'#editAccountDisplayNameBtn'
);
const editAccountDisplayNameConfirmBtn = document.querySelector(
	'#editAccountDisplayNameConfirmBtn'
);
const editAccountEmailBtn = document.querySelector('#editAccountEmailBtn');
const editAccountPasswordBtn = document.querySelector(
	'#editAccountPasswordBtn'
);
const accountBtn = document.querySelector('#accountBtn');
const accountDisplayName = document.querySelector('#accountDisplayName');
const accountEmail = document.querySelector('#accountEmail');
const deleteWarningModal = document.querySelector('#deleteWarningModal');
const yesDelete = document.querySelector('#yesDelete');
const noDelete = document.querySelector('#noDelete');
const h2 = document.querySelector('h2');
const divSignOut = document.querySelector('#divSignOut');
const divAccount = document.querySelector('#divAccount');
const signIn = document.querySelector('#signInFormContent');
const signInBtn = document.querySelector('#signInBtn');
const backBtn = document.querySelector('#backBtn');
const signOutBtn = document.querySelector('#signOutBtn');
const signOutWarningModal = document.querySelector('#signOutWarningModal');
const createAccountFormContent = document.querySelector(
	'#createAccountFormContent'
);
const addBookCard = document.querySelector('.addBookCard');
const cards = document.querySelector('#bookGrid').children;
const yesDeleteAccountBtn = document.querySelector('#yesDeleteAccountBtn');
const noDeleteAccountBtn = document.querySelector('#noDeleteAccountBtn');
const bookTitle = document.querySelector('#bookTitle');
const updateBookTitle = document.querySelector('#updateBookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const updateBookAuthor = document.querySelector('#updateBookAuthor');
const createAccountDisplayName = document.querySelector(
	'#createAccountDisplayName'
);
const editAccountDisplayName = document.querySelector(
	'#editAccountDisplayName'
);
let accountPasswordLength = '';
let accountPasswordDots = '';
let bookId = '';
let column = 1;
let firstRow = true;
