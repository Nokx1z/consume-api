# 🔍 CONSUME-API

Este proyecto es una aplicación web sencilla desarrollada como parte de una asignación para demostrar el manejo de la programación asíncrona en JavaScript. Permite a los usuarios buscar personajes de la serie animada "Rick and Morty" por nombre.

## 🚀 Requerimientos y Funcionalidad Clave

El objetivo principal de este proyecto es cumplir con los siguientes puntos de la asignación:

Uso de fetch(): Realizar peticiones HTTP GET a la Rick and Morty API.

Programación Asíncrona: El flujo completo está implementado utilizando la sintaxis moderna async/await dentro de una función asíncrona para simplificar el manejo de las Promesas.

Funcionalidad de Búsqueda: El usuario puede ingresar un nombre en el campo de texto para filtrar los resultados de la API.

Manejo de Errores: Implementación de lógica robusta utilizando try...catch para capturar y notificar al usuario sobre:

Errores de conexión o servidor.

Errores específicos 404 (cuando el personaje no existe).

Muestra de Datos Dinámica: Renderizado de la imagen, nombre, estado, especie, origen y género del personaje en tarjetas con diseño de Bootstrap.

API Utilizada

Rick and Morty API  
```http
  GET https://rickandmortyapi.com/api/
  ```

Endpoint: 
```http
https://rickandmortyapi.com/api/character/?name={nombre}
```

## 🛠️ Stack Tecnológico

Componente

Herramienta

Propósito

Estructura

HTML5

Estructura básica de la página.

Estilos y Layout

Bootstrap 5.3.3

Responsividad, grid de tarjetas, y elementos UI (botones, alertas, spinner).

Lógica Asíncrona

JavaScript (ES6+), async/await

Control del flujo asíncrono y manipulación del DOM.

## 🛡️ Implementación del Manejo de Errores (async/await)

El manejo de errores se gestiona de manera centralizada en la función asíncrona getCharacters mediante un bloque try, catch.

Bloque try: Contiene la lógica de la petición (await fetch(url)).

Verificación HTTP: Dentro del try, se verifica if (!response.ok). Si el código de estado es un 404, se lanza un throw new Error() con un mensaje específico.

Bloque catch: Captura cualquier error lanzado, ya sea un fallo de red o un error HTTP lanzado manualmente.

Función displayError: El catch llama a displayError(e.message) para mostrar una alerta de Bootstrap (alert-danger) al usuario.

De esta manera, la aplicación es estable y proporciona retroalimentación clara al usuario, diferenciando entre un fallo de conexión y la falta de resultados.


