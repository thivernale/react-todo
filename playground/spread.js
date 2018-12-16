/*function  add(a, b) {
    console.log(a, b);
    return a + b;
}

console.log(add(3, 1));

var toAdd = [9, 5];
toAdd.unshift(null);

console.log(add.bind.apply(add, toAdd)());

toAdd.shift();

console.log(add(...toAdd));

var groupA = ['Jen', 'Cory'];
var groupB = ['Vikram'];

var final = [...groupA, ...groupB];

console.log(final);*/

var person = ['Ha', 34];
var person2 = ['Ho', 25];
// Hi, <person>, you are <age>
function greetPerson (name, age) {
    console.log(`Hi ${name}, you are ${age}`);
}
greetPerson(...person);
greetPerson(...person2);

var names = ['Mike', 'Ben'];
var final = ['me'];

function greetGroup(names) {
    names.forEach(function(name) {
        console.log(`Hi ${name}`);
    });
}

final = [...final, ...names];
greetGroup(final);

