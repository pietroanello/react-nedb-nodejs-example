# Simple React App with NodeJS Express that save data with neDB

A simple app that stores form data in neDB database and return it in a component with a fetch request.

## How it works

In the project directory, you can run `npm start`, that execute `npm run build && (cd server && npm start)`.

Then, on http://localhost:5000 you'll see the build of the React project with a single component that return a form.
With the "Add" button you'll send the info to the server with a fetch POST request and stores them in a new neDB document inside `server/collections`.

After the fetch, the React component makes a GET request and the server returns data that update the state of the component.

If you click on Delete User, the React component makes a DELETE request, and the server returns data that update the state of the component.

### Dependecies

`express ^4.17.1` `nedb ^1.8.0` `nodemon ^2.0.6`
