# Todo Webapp

A web application that can keep track of your tasks and when its due. Created as a course project this implements basic fullstack development concepts.

[Hosted Demo Link](https://todo-project-webapp.netlify.app)

## Primary Languages

- Frontend:

  1. React
  2. HTML
  3. CSS

- Backend:
  1. Python

## Running Locally

Assuming that you have Node and Python installed, follow the following steps:

1. ### Clone the repository:

   To clone the repository via command line type:

   ```bash
   git clone https://github.com/abhinavgeethan/Todo-Project
   ```

2. ### Running Frontend:

   - **Installing dependencies**: Navigate to the `frontend` directory and run:
     ```bash
     npm install
     ```
   - **Starting up**: Navigate to the `frontend` directory and run:

     ```bash
     npm start
     ```

3. ### Running Backend:
   - **Installing dependencies**: From the `todo-project` directory, run:
     ```bash
     pip install requirements.txt
     ```
   - **Setting up app**: Navigate to the `backend` directory and execute:
     - In UNIX machines:
       ```bash
       export FLASK_APP=server
       ```
     - In Windows machines:
       ```bash
       $env:FLASK_APP="server"
       ```
   - **Initialising Database**: In the `backend` directory, run:
     ```bash
     flask create_tables
     ```
     If that doesn't work, run `python` in the terminal and in python run:
     ```python
     from server import db,create_app
     db.create_all(app=create_app())
     ```
   - **Starting up Flask Server**: In the `backend` directory, run:
     ```bash
     flask run
     ```
     The Flask development server must now be running at `127.0.0.1:5000/` and the frontend React page at `127.0.0.1:3000/`.

## Additional Details

For additional details regarding the project read [this](/Detailed_Info.md).

## Credits and Resources

Read [this](/Resources.md).
