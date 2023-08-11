### Conceptual Exercise

Answer the following questions below:

-   What are some ways of managing asynchronous code in JavaScript?

    -   asynchronous code returns a promise which is then resolved later. There are ways to handle the promise and then (`.then()`) do something once it's resolved. Or you can use `async` functions and `await`

-   What is a Promise?

    -   A Promise is an object that is returned when JS is running asynchronous code. It is resolved when the code runs.

-   What are the differences between an async function and a regular function?

    -   async functions will return promises. We can then `await` the result of that promise

-   What is the difference between Node.js and Express.js?

    -   Node.js is a server-side JavaScript environment. Express.js is a framework, akin to Flask.

-   What is the error-first callback pattern?

    -   Error-first is common when using the node fs module. The first parameter passed into the callback will be an 'error' object

-   What is middleware?

    -   middleware is code that will run in the **middle** of the request-response cycle.

-   What does the `next` function do?

    -   the `next` function tells the server to run the next piece of applicable code. If there is a parameter to the `next` function, it will treat it as an `error` and run the error handling code

-   What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
    const elie = await $.getJSON("https://api.github.com/users/elie");
    const joel = await $.getJSON("https://api.github.com/users/joelburton");
    const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

    return [elie, matt, joel];
}
```

### Issues with taht code above:

-   It might be a good idea to set up a base url.
-   Also use Promise.all as such:

    ```js
    async function catchSomeOfEmParallel() {
        let baseURL = "https://pokeapi.co/api/v2/pokemon";
        let pokemon = await Promise.all([
            axios.get(`${baseURL}/1/`),
            axios.get(`${baseURL}/2/`),
            axios.get(`${baseURL}/3/`),
        ]);

        console.log(`The first pokemon is ${pokemon[0].data.name}`);
        console.log(`The second pokemon is ${pokemon[1].data.name}`);
        console.log(`The third pokemon is ${pokemon[2].data.name}`);
    }
    ```
