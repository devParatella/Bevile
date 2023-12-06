function exemplovar() {
    var x = 10;
    if (true) {
        var x = 20;
        console.log(x) //20
    }
    console.log(x) //20
}

exemplovar();

function exemplolet() {
    let x = 10;
    if (true) {
        let x = 20;
        console.log(x); //20
    }
    console.log(x); //10
}
exemplolet()

function exemploconst() {
    const x = 10;
    if (true) {
        const x = 20;
        console.log(x) //20
    }
    console.log(x) //10
}

exemploconst();

const obj = {nome: "joao"};
obj.nome = "Maria";
console.log(obj); // nome: "Maria"