//Chapter 9 - Regular Expressions
//Ex1 - Regexp golf
verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/ious($|\P{L})/u,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the period"]);

verify(/\p{L}{7}/u,
    ["Siebentausenddreihundertzweiundzwanzig"],
    ["no", "three small words"]);

verify(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui,
    ["red platypus", "wobbling nest"],
    ["earth bed", "bedrøvet abe", "BEET"]);


function verify(regexp, yes, no) {
// Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) {
        console.log(`Failure to match '${str}'`);
    }
    for (let str of no) if (regexp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
    }
}

//Ex2 - Quoting style
let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\P{L})'|'(\P{L}|$)/gu, '$1"$2'));

//Ex3 - Numbers again
// Fill in this regular expression.
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}

//Chapter 10 - Modules
//Ex2 - Roads module
//import {buildGraph} from "./Robot";

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

//export const roadGraph = buildGraph(roads.map(r => r.split("-")));

//Chapter 11 - Asynchronous Programming
//Ex1 - Quiet times
import readTextFile from 'readTextFile';
function textFile(filename) {
    return new Promise(resolve => {
      readTextFile(filename, text => resolve(text));
    });
  }
  
  textFile("plans.txt").then(console.log);

async function activityTable(day) {
    let table = [];
    for (let i = 0; i < 24; i++) table[i] = 0;
    let logFileList = await textFile("camera_logs.txt");
    for (let filename of logFileList.split("\n")) {
        let log = await textFile(filename);
        for (let timestamp of log.split("\n")) {
            let date = new Date(Number(timestamp));
            if (date.getDay() == day) {
                table[date.getHours()]++;
            }
        }
    }
    return table;
}

activityTable(1)
    .then(table => console.log(activityGraph(table)));

//Ex2 - Real promises
function activityTable2(day) {
    let table = [];
    for (let i = 0; i < 24; i++) table[i] = 0;
    return textFile("camera_logs.txt").then(files => {
        return Promise.all(files.split("\n").map(name => {
            return textFile(name).then(log => {
                for (let timestamp of log.split("\n")) {
                    let date = new Date(Number(timestamp));
                    if(date.getDay() == day) {
                        table[date.getHours()]++;
                    }
                }
            });
        }));
    }).then(() => table);
}

activityTable2(6)
    .then(table => console.log(activityGraph(table)));

//Ex3 - Building promise.all
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let pending = promises.length;
        for(let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                results[i] = result;
                pending--;
                if (pending == 0) resolve(results);
            }).catch(reject);
        }
        if (promises.length == 0) resolve(results);
    });
}

// Test code.
Promise_all([]).then(array => {
    console.log("This should be []:", array);
  });
  function soon(val) {
    return new Promise(resolve => {
      setTimeout(() => resolve(val), Math.random() * 500);
    });
  }
  Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array);
  });
  Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
      console.log("We should not get here");
    })
    .catch(error => {
      if (error != "X") {
        console.log("Unexpected failure:", error);
      }
    });