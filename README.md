# Arrays Functions

**length:** nos permite contar la cantidad de elementos dentro de un array.

**at:** Permite devolver un elemento de una determinada posición mediante obtener un número entero, también permite usar números negativos enteros para obtener la posición de los últimos elementos de la lista.

**concat():** Nos permite la concatenación de 2 o más arrays. sigue la estructura de array1.concat(array2)
 es decir, se menciona primero un array, luego se usa .concat() y dentro de los parentesis se pone el array a concatenar.

 **constructor():** Es un metodo para crear un objetos array.

 **copyWithin:** Nos permite copiar una sección de un arreglo dentro del mismo y devuelve el arreglo modificado sin modificar el tamaño original del arreglo. Sigue una sintaxis de: 
 arr.copyWithin(target)
 arr.copyWithin(target, start)
 arr.copyWithin(target, start, end)

 target: donde va a empezar la sección en la ubicación de nuestro arreglo
 start: la posicion por la cual se cambiaria el target 
 end: es el limite o hasta donde se copia la sección pero sin incluirla.

**entries:** Nos permite retornar un objeto de tipo array iterador el cual contiene los pares claves valor  para cada indice del arreglo. 
tener en cuenta que el next() lo usamos teniendo en cuenta que estamos trabajando con un objeto iterador, su función es la de devolver el valor siguiente, es decir avanza una posicion del objeto iterador.

**every:** Nos permite probar si todos los elementos del array pasan por la funcion dada (puede ser mediante function o arrow functions)m y retorna un valor booleano, si todos los elementos cumple es true y si al menos 1 de los elementos no cumpla nos retorna false.

 **fill:**  Nos permite cambiar elementos del arreglo por uno estatico, es decir, podemos cambiar 1 valor como 0 y reemplazarlo desde el indice start hasta el end.

 sintaxis: arr.fill(valor)
           arr.fill(valor,star)
           arr.fill(valor,star,end).

**filter:** crea un array el cual esta compuesto por elementos que cumplan la condicion que este en la funcion dada.

**find:** devuelve el valor del primer elemento del array que cumpla la condicion de la funcion.

**findIndex:**  Devuelve el indice(posicion) del primer elemento del array que cumpla con la función.

**FindLast:** devuelve el valor del ultimo elemento del array que cumpla la condicion de la funcion.

**FindLastIndex:** Devuelve el indice(posicion) del ultimo elemento del array que cumpla con la función.

**flat:** Crea una nueva matriz con todos los elementos del sub array (array dentro de otro array)concadenados recursivamente hasta la profundidad especificada.
Cuando se habla de profundidad se refiere a que tan plano o que tantos subarrays queremos quitar en la nueva matriz
    Ej: [0, 1, 2, [3, 4]] -> [0, 1, 2, 3, 4] -> Hay 2 array, se usa el flat() y quita 1 sub array y lo concatena para que asi quede es el array principal.

**flatMap:** primero mapea mediante el uso de una funciòn y luego aplana el resultado en una matriz. 

**forEach:** Ejecuta la funcion para cada elemento del array.
