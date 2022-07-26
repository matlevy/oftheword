/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

const replaceUTF = (input: string) => {
  const utf = /&#\d+;/gi;
  const br = /<BR>/gi;
  const withoutUTF = input.replace(utf, "");
  return withoutUTF.replace(br, "").replace("~", "").replace(/\[|\]/gi, "");
};

let bookObj, chapterObj;
const output = {
  books: [],
};

const BOOKS = {
  GEN: "GENESIS",
  EXO: "EXODUS",
  LEV: "LEVITICUS",
  NUM: "NUMERI",
  DEU: "DEUTERONOMIUM",
  JOS: "JOSUE",
  JDG: "JUDICUM",
  RUT: "RUTH",
  SA1: "SAMUHEL I",
  SA2: "SAMUHEL II",
  KG1: "REGUM III",
  KG2: "REGUM IV",
  CH1: "PARALIPOMENON I",
  CH2: "PARALIPOMENON I",
  EZR: "ESDRAE",
  NEH: "NEHEMIAE",
  TOB: "TOBIAE",
  JDT: "JUDITH",
  EST: "ESTHER",
  JOB: "JOB",
  PSA: "PSALMI",
  PRO: "PROVERBIA",
  ECC: "ECCLESIASTES",
  SOL: "CANTICUM CANTICORUM",
  WIS: "SEPIENTIA",
  SIR: "ECCLESIASTICUS",
  ISA: "ISIAS",
  JER: "JEREMIAS",
  LAM: "LAMENTATIONS",
  BAR: "BARUCH",
  EZE: "EZECHIEL",
  DAN: "DANIEL",
  HOS: "OSEE",
  JOE: "JOEL",
  AMO: "AMOS",
  OBA: "ABDIAS",
  JON: "JONAS",
  MIC: "MICHAEA",
  NAH: "NAHUM",
  HAB: "HABACUC",
  ZEP: "SOPHONIAS",
  HAG: "AGGAEUS",
  ZAC: "ZACHARIAS",
  MAL: "MALACHIAS",
  MA1: "MATTHAEUM",
  MA2: "SECUMDUM MATTHAEUM",
  MAT: "MATTHAEUM",
  MAR: "SECUNDUM MARCUM",
  LUK: "SECUNDUM LUCAM",
  JOH: "SECUNDUM IOANNEM",
  ACT: "ACTUS APOSTOLOTUM",
  ROM: "AD ROMANOS",
  CO1: "AD CORINTHIOS I",
  CO2: "AD CORINTHIOS II",
  GAL: "AD GALATAS",
  EPH: "AD EPHESIOS",
  PHI: "AD PHILLIPPENSES",
  COL: "AD COLOSSENSES",
  TH1: "AD THESSALONICENSES I",
  TH2: "AD THESSALONICENSES II",
  TI1: "AD TIMOTHEUM I",
  TI2: "AD TIMOTHEUM II",
  TIT: "AD TITUM",
  PLM: "AD PHILEMONEM",
  HEB: "AD HEBRAEOS",
  JAM: "EPISTULA IACOBI",
  PE1: "EPISTULA PETRI I",
  PE2: "EPISTULA PETRI II",
  JO1: "EPISTULA IOANNIS I",
  JO2: "EPISTULA IOANNIS II",
  III: "EPISTULA IOANNIS III",
  IUD: "EPISTULA IUDAE",
  REV: "APOLOALYPSIS IOANNIS",
};

const read = (input: string[]) => {
  const book = input[0].toLocaleUpperCase();
  const chapter = Number(input[1]);
  const verse = input[2];
  const text = input[3];
  const scripture = replaceUTF(text);

  let bookPrev;
  let chaptPrev;
  let bookName = BOOKS[book.toLocaleUpperCase()];

  if (bookName == undefined) {
    console.log(bookName, book.toLocaleUpperCase());
  }

  if (bookObj == null || bookObj.book != bookName) {
    bookObj = {
      book: bookName,
      chapters: [],
    };
    output.books.push(bookObj);
    //console.info("Created Book: " + bookName);
  }

  if (chapterObj == null || chapterObj.chapter != chapter) {
    chapterObj = {
      chapter: chapter,
      scripture: [],
    };
    console.info(`Adding Chapter ${chapter} to ${book}`);
    bookObj.chapters.push(chapterObj);
  }

  chapterObj.scripture.push(scripture);

  bookPrev = book;
  chaptPrev = chapter;
};

const onEnd = (rowCount: number) => {
  console.log(output);
  fs.writeFileSync("./../src/data/vulgate.json", JSON.stringify(output));
};

fs.createReadStream(path.resolve(__dirname, "../res", "latin_vulgate.txt"))
  .pipe(csv.parse({ headers: false, delimiter: "|" }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => read(row))
  .on("end", onEnd);
