// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCR7ctwDeT3SvS4OqZXzqsi8FypBlumA2A',
	authDomain: 'library-sptyi.firebaseapp.com',
	databaseURL: 'https://library-sptyi.firebaseio.com',
	projectId: 'library-sptyi',
	storageBucket: 'library-sptyi.appspot.com',
	messagingSenderId: '917004024144',
	appId: '1:917004024144:web:75ea723ad31de4f266d455',
	measurementId: 'G-091E60BMHL',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();

// Cache DOM
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
const burgerMenuContainer = document.querySelector('#burgerMenuContainer');
const burgerMenu = document.querySelector('#burgerMenu');
const mediaQuery = window.matchMedia('(max-width: 500px)');

// Initialize Globals
let accountPasswordLength = '';
let accountPasswordDots = '';
let bookId = '';
let column = 1;
let row = 1;
let firstRow = true;
let held;
