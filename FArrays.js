
//length
let panaderia = ["pan","galletas","papas", "buñuelos","pandebonos","alpin de chocolate"]

let numProductos = panaderia.length
console.log("el numero disponible de productos de la panaderia es de "+ numProductos)

//at
 const numeros = [5, 12, 8, 130, 44,69,67];
 let index = 3
console.log(`el numero en la posicion ${index} en el arreglo de numero es ${numeros.at(index)} `)

index = -2
console.log(`el numero en la posicion ${index} en el arreglo de numero es ${numeros.at(index)} `)

//concat

const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);

console.log(array3);

//constructor()

const fruits = ["Apple", "Banana"];
console.log(fruits.length); 
console.log(fruits[0]); 

const fruits2 = new Array(2);
console.log(fruits2.length); 
console.log(fruits2[0]); 

//copyWithin
const num = [1,2,3,4,5,6];
console.log(num.copyWithin(2,1,4))

//entries()
const array = ["a", "b", "c"];

const iterator1 = array.entries();

console.log(iterator1.next().value);


console.log(iterator1.next().value);

//every
function verificarTamano(element) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(verificarTamano); 
[12, 54, 18, 130, 44].every(verificarTamano); 

    //otra forma
const verificarTamanoMenor = (currentValue) => currentValue < 40;

const ejemplo = [1, 30, 39, 29, 10, 13];

console.log(ejemplo.every(verificarTamanoMenor));

//fill

const arrayFill = [1, 2, 3, 4];

console.log(arrayFill.fill(0, 2, 4));

console.log(arrayFill.fill(5, 1));

console.log(arrayFill.fill(6));

//filter
const palabras = ["spray", "elite", "exuberant", "destruction", "present"];

const res = palabras.filter((palabras) => palabras.length > 6);

console.log(result);

//find
const arrayFnd = [5, 12, 8, 130, 44];

const found = arrayFnd.find((element) => element > 10);

console.log(found);

