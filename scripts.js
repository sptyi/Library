function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	console.log(this.info);
}

var theFellowshipOfTheRing = new Book(
	'The Lord of the Rings: The Fellowship of the Ring',
	'J. R. R. Tolkien',
	'479',
	true
);

console.log(theFellowshipOfTheRing);
