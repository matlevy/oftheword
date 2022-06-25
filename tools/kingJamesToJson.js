const fs = require("fs");

const raw = fs.readFileSync("./../res/king_james.json");
const theBible = JSON.parse(raw);
const output = {
  books: []
};

let index = 0;
let maxOut = 999999;

let bookObj, chapterObj;

for (row of theBible) {
  index += 1;
  //
  if (index>maxOut) {
    break;
  }
  //
  const chapt = row.scripture.match(/\d{0,3}\:/gi)[0].replace(":", "");
  const verse = row.scripture.match(/\:\d{0,3}/gi)[0].replace(":", "");
  const book = row.scripture.replace(` ${chapt}:${verse}`, "");
  //
  let bookPrev = null;
  let chaptPrev = null;
  
  if (bookObj==null || bookObj.book != book.toLocaleUpperCase() ) {
    bookObj = {
      book: book.toLocaleUpperCase(),
      chapters: [],
    };
    output.books.push(bookObj);
    console.info("Created Book: " + book);
  }

  if (chapterObj == null || chapterObj.chapter != chapt ) {
    chapterObj = {
      chapter: chapt,
      scripture: [],
    };
    console.info(`Adding Chapter ${chapt} to ${book}`);
    bookObj.chapters.push(chapterObj);
  }

  //console.log(chapterObj);

  chapterObj.scripture.push(row.text);

  bookPrev = book;
  chaptPrev = chapt;
}

console.log(output);

fs.writeFileSync('output/kjv.json', JSON.stringify(output));