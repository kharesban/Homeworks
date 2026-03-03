## Challenge02 - Pagina gestión de Estudiantes ##

### Cómo funciona el codigo? ###
en el archivo lista.tsx se encuentra la creacion de un interface Estudiante  que nos ayuda a la creación de estudiantes con un nombre y celular. Tambien, todo lo relacionado a como agregar, la lista
inicial y eliminar esta dentro de este archivo.

Por el lado de la funcion ListarEstudiantes, aqui vemos que hace uso de parametros como el interface y una funcion onEliminar que permite sacar estudiantes de esa lista. En esa función si el array queda vacio nos muestra un mensaje donde dice que no se encontraron estudiantes, en caso contrario
retorna una lista con una key de cada estudiante y su celular, adiccionalmente tiene el boton "X" que nos sirve para eliminar(onEliminar).

En la funcion AgregarE, se ve todo el proceso necesario para crear un estudiante, desde las constantes nombres que tienen estado inicial vacio, hasta el relacionar nuestro interface Estudiante con los datos del nombre y celular que estamos usando aquí. 
Todo esto nos retorna un html donde esta el input que nos ayudara a coger los valores que el usuario digite mediante un reactEvents, en este caso el evento de onChange que nos permite actualizar el nombre y celular para despues mediante el boton crear poder crear el usuario.



