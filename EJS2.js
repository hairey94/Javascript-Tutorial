//Chapter 2 - Program structure
//Ex1 - Looping a triangle
for (let line = "#"; line.length < 8; line += "#")
    console.log(line);

//Ex2 - FizzBuzz
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 === 0) output += "Fizz";
    if (n % 5 === 0) output += "Buzz";
    console.log(output || n);
}

//Ex3 - Chessboard
const SIZE = 8;
let pattern = "";
for (let n = 1; n <= SIZE; n++) {
    for (let m = 1; m <= SIZE; m++) {
        if ((n+m)%2 === 0) {
            pattern += " ";
        } else {
            pattern += "#";
        }
    }
    pattern += "\n";
}
console.log(pattern);

//Chapter 3 - Functions
//Ex1 - Minimum
function min(a, b) {
    return (a < b ? a : b);
}
console.log(min(3,2));

//Ex2 - Recursion
function isEven(a) {
    if (a === 0) {
        return true;
    } else if (a === 1) {
        return false;
    } else if (a < 0) {
        return isEven(-a);
    } else {
        return isEven(a-2);
    }
}
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));

//Ex3 - Bean counting
function countChar(arg, charac) {
    let count = 0;
    for (let i = 0; i < arg.length; i++) {
        if (arg[i] === charac) {
            count += 1;
        }
    }
    return count;
}
console.log(countChar("kakkerlak", "k"));

//Chapter 4 - Data Structures: Objects and Arrays
//Ex1 - The sum of a range
function range(start, end, step = start < end ? 1 : -1) {
    let list = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            list.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            list.push(i);
        }
    }
    return list;
}
console.log(range(1,10,2));
console.log(range(5,2,-1));

function sum(array) {
    let total = 0;
    for (value of array) {
        total += value;
    }
    return total;
}
console.log(sum(range(1,10)));

//Ex2 - Reversing an array
function reverseArray(array) {
    let reverse = [];
    for (let i = array.length-1; i >= 0; i--) {
        reverse.push(array[i]);
    }
    return reverse;
}
console.log(reverseArray(["A", "B", "C"]));

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}
console.log(reverseArrayInPlace([1,2,3,4,5]));

//Ex3 - A list
function arrayToList(array) {
    let list = null;
    for (let i = array.length-1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}
console.log(arrayToList([10,20]));

function listToArray(list) {
    let array = [];
    for (node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}
console.log(listToArray(arrayToList([10,20,30])));

function prepend(element, list) {
    return {value: element, rest: list};
}
console.log(prepend(10, prepend(20, null)));

function nth(list, num) {
    if (!list) {
        return undefined;
    } else if (num === 0) {
        return list.value;
    } else {
        return nth(list.rest, num-1);
    }
}
console.log(nth(arrayToList([10, 20, 30]), 1));

//Ex4 - Deep comparison
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    } else if (obj1 === null || typeof obj1 != "object" || obj2 === null || typeof obj2 != "object") {
        return false;
    } else if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    } else {
        for(let key of Object.keys(obj1)) {
            if (!Object.keys(obj2).includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            } else {
                return true;
            }
        }
    }
}
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

//Chapter 5 - Higher-Order Functions
//Ex1 - Flattening
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((flat, current) => flat.concat(current), []));

//Ex2 - Your own loop
function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}
loop(3, n => n > 0, n => n - 1, console.log);

//Ex3 - Everything
function every(array, predicate) {
    for (let element of array) {
        if(!predicate(element)) {
            return false;
        }
    }
    return true;
}

function every2(array, predicate) {
    return !array.some(element => !predicate(element));
}
console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));

//Chapter 6 - The Secret Life of Objects
//Ex1 - A vector type
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

//Ex2 - Group
class Group {
    #members = [];

    add(value) {
        if (!this.has(value)) {
            this.#members.push(value);
        }
    }

    delete(value) {
        this.#members = this.#members.filter(v => v !== value);
    }

    has(value) {
        return this.#members.includes(value);
    }

    static from(collection) {
        let group = new Group;
        for (let value of collection) {
            group.add(value);
        }
        return group;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this.#members);
    }
}
let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

//Ex3 - Iterable groups
class GroupIterator {
    #members;
    #position;

    constructor(members) {
        this.#members = members;
        this.#position = 0;
    }

    next() {
        if (this.#position >= this.#members.length) {
            return {
                done: true
            }
        } else {
            let result = {value: this.#members[this.#position], done: false};
            this.#position++;
            return result;
        }
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

//Chapter 7 - Project: A Robot
//Ex3 - Persistent group
class PGroup {
    #members;
    constructor(members) {
        this.#members = members;
    }

    add(value) {
        if (this.has(value)) return this;
        return new PGroup(this.#members.concat([value]));
    }

    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup(this.#members.filter(m => m !== value));
    }

    has(value) {
        return this.#members.includes(value);
    }

    static empty = new PGroup([]);
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));