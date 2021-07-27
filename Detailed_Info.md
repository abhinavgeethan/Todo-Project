# Details

## Frontend

Majority of the Frontend is build on React with `create-react-app`.

Minimal amount of raw data is sent between the frontend and backend with React handling most of the processing required for rendering the data in the webapp.

Modals used for the Sign Up, Login & Add Todo forms have been created using the `react-responsive-modal` module for React.

Routes and Links in the app are being handled by the `react-router-dom` module, along with a custom coded Protected route for pages requiring authentication.

The responsive design of the webapp is mostly handled by CSS Media Queries. Breakpoints used are 768px and 1024px.

Additional modules used are:

1. `react-datetime-picker`: For datetime input.
2. `react-token-auth`: For JWT authentication.
3. `shortid`: For generating unique random id's for tasks.

## Authentication

The authentication for the webapp is a JWT (`JSON Web Tokens`) based system.

`flask-praetorian` module which is based on `pyJWT` and `Passlib` is handling the issue of tokens and authentication in the backend.

`react-token-auth` module for React is handling the authenticated requests and auto-refresh of tokens in the frontend. The `useAuth` hook provided by the module is being used to check if one is an authenticated user before directly redirecting them to their profile.

## Backend

The backend is a Python Flask server. It is served by gunicorn in the deployed version on Heroku.

`Flask-SQLAlchemy` is the database interface used. In the version running on Heroku a `Heroku Postgres` postgresql database is used but any SQL database can be used. The database consists of two tables `Users` and `Todos`. User data is stored in the `Users` table while all the Todos are saved in the `Todos` table with a foreign key link to `Users` via `user.id`.

`flask-praetorian` is handling the JWT based authentication as mentioned above and protects the authenticated routes in the server.

`dateutil` module is used to parse the incoming Date string into a python Date object.
