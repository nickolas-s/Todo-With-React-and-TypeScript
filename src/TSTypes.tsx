/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// ------- Basic types -------
const name = 'Nick';
const points = 36;
let age: number | string; // union
let isStudent: boolean;
let hobbies: string[]; // array of strings
let ages: number[]; // array of numbers
let role: [number, string]; // tupel
let city: any; // not recomended
let personCity: unknown; // use it instead of type 'any'

// ------- Objects - alias type -------
type Person = {
  name: string;
  age?: number; // "?" means the property is optional
};

const person: Person = {
  name: 'nick',
};

// ------- Objects - alias interface -------
interface Person2 {
  name: string;
  age?: number; // "?" means the property is optional
}

// extendes the properpy of one object to another
// you can also extendes the properties of a 'type' object
interface Guy extends Person2 {
  profession: string;
}

const me: Guy = {
  name: 'nick',
  profession: 'Dev',
};

let lostsOfPeople: Person2[]; // creates an array of the object Person.

// ------- functions -------
function printName(name2: string) {
  console.log(name2);
}

printName('Nick');

let printLastName: (lastName: string) => void; // void returns 'undefined'
let printLastName2: (lastnName: string) => never; // never returns nothing

export {};
