const myName = "Marcos";
const idade0 = 46;
const idade1 = 30;
const idade2 = 31;
const idade3 = 60;

function printData() {
    console.log("Nome: " + myName);
    console.log("idade: " + idade0);
}
printData();

function sum(number1, number2) {
    const result = number1 + number2;
    return result;
        
}
const somadasidades0 = sum(idade0, idade1);
console.log("idade0 + idade1: " + somadasidades0);

const somadasidades1 = sum(idade2, idade3);
console.log("idade2 + idade3: " + somadasidades1);