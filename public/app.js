const bookGrid = document.querySelector('#bookGrid');
const addBookBtn = document.querySelector('#addBookBtn');
const popup = document.querySelector('#popup');
const booksForm = document.querySelector('#booksForm');
const menuBtn = document.querySelector('#menuBtn');
const menu = document.querySelector('#menu');
const signInBtn = document.querySelector('#signInBtn');
const signUpBtn = document.querySelector('#signUpBtn');
const signInForm = document.querySelector('#signInForm');
const signUpForm = document.querySelector('#signUpForm');
let myLibrary = [];

addBookBtn.addEventListener('click', () => {
	openPopup();
});

function renderBook(doc) {
	let div = document.createElement('div');
	div.setAttribute('data-id', doc.id);
	div.setAttribute('class', 'card');
	bookGrid.appendChild(div);

	let title = document.createElement('div');
	title.textContent = doc.data().title;
	div.appendChild(title);

	let author = document.createElement('div');
	author.textContent = `by ${doc.data().author}`;
	div.appendChild(author);

	let pages = document.createElement('div');
	pages.textContent = `${doc.data().pages} pages`;
	div.appendChild(pages);

	let read = document.createElement('div');
	if (doc.data().read) {
		read.textContent = `I've already read this book`;
	} else {
		read.textContent = `I haven't read this book yet`;
	}
	div.appendChild(read);

	let deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('class', 'deleteBtn');
	deleteBtn.textContent = '\u00D7';
	div.appendChild(deleteBtn);

	deleteBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('books').doc(id).delete();
	});
}

/*
db.collection('books')
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			renderBook(doc);
		});
	});

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	console.log(this);
}

var theFellowshipOfTheRing = new Book(
	'The Lord of the Rings: The Fellowship of the Ring',
	'J. R. R. Tolkien',
	'479',
	true
);
*/

booksForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addBookToLibrary();
	closePopup();
});

function addBookToLibrary() {
	db.collection('books').add({
		title: booksForm.title.value,
		author: booksForm.author.value,
		pages: booksForm.pages.value,
		read: booksForm.read.value,
	});
	booksForm.title.value = '';
	booksForm.author.value = '';
	booksForm.pages.value = '';
	booksForm.read.value = '';
}

db.collection('books')
	.orderBy('author')
	.onSnapshot((snapshot) => {
		let changes = snapshot.docChanges();
		changes.forEach((change) => {
			console.log(change.doc.data());
			if (change.type == 'added') {
				renderBook(change.doc);
			} else if (change.type == 'removed') {
				let div = bookGrid.querySelector('[data-id=' + change.doc.id + ']');
				bookGrid.removeChild(div);
			}
		});
	});

window.addEventListener('click', outsidePopupClick);

function closePopup() {
	popup.style.display = 'none';
}

function outsidePopupClick(e) {
	if ((e.target == popup) | (e.target == menu)) {
		closePopup();
		closeMenu();
	}
}

function openPopup() {
	popup.style.display = 'block';
}

function closeMenu() {
	menu.style.display = 'none';
}

menuBtn.addEventListener('click', () => {
	if (menuBtn.classList.contains('menuOpen')) {
		menuBtn.classList.remove('menuOpen');
	} else {
		menuBtn.setAttribute('class', 'menuOpen');
		menu.style.display = 'block';
	}
});

signInBtn.addEventListener('click', () => {
	if (signInForm.classList.contains('signInOpen')) {
		signInForm.classList.remove('signInOpen');
	} else {
		signInForm.setAttribute('class', 'signInOpen');
		signInForm.style.display = 'block';
	}
});

signUpBtn.addEventListener('click', () => {
	if (signUpForm.classList.contains('signUpOpen')) {
		signUpForm.classList.remove('signUpOpen');
	} else {
		signUpForm.setAttribute('class', 'signUpOpen');
		signUpForm.style.display = 'block';
	}
});
