# Inoculyst 
(CPSC 471 - G16): Khushi Choksi, Ayesha Saeed, Shanza Raza


## Running the application
Please note that you must have the above technologies installed on your computer to run this project successfully. 

### How to run server-side
#### Set up
- `cd server`
- Log in to MySQL with the command `mysql -u root -p` so that you are on localhost.
- Set up the database by doing the following commands:
  1. `source database/migrations/setup.sql`
  2. `source database/seeders/users.sql`
  3. `source database/seeders/inventory.sql`
  4. `source database/seeders/analytics.sql`
  5. `source database/seeders/distributors.sql`
  6. `source database/seeders/returns.sql`
- Then create a new local user that will be used to run the server with Node.js. These commands will set up the new user and permit it to access the database:
  1. `CREATE USER 'inoculyst_user'@'localhost' IDENTIFIED BY 'inoculyst';`
  2. `GRANT ALL PRIVILEGES ON INOCULYST.* TO 'inoculyst_user'@'localhost';`
  3. `FLUSH PRIVILEGES;`
- Later on, you can simply log into the database using the new user using this command: ` mysql -u inoculyst_user -p`. The password will be `inoculyst`.

#### Running the Node.js server
Note: Please ensure that the database is fully set up (using the above steps) before doing these steps. 
- `cd server` (If you are already in the server directory, you may skip this step). 
- `npm install`
- `node index.js`
  - This will start the server on localhost:8080. Please refer to the `ROUTES.md` file located in server/ROUTES.md to see all the routes in the server application. 

### How to run client-side
#### Set up
- `cd client`
- `npm install --legacy-peer-deps`

#### Running it
- `cd client`
- `npm start`

This will start the development build in your browser.

## Technology stack and versions used
SQL (MySQL), Node.js, Express.js, and React

- react: 19.0.0
- node: v22.14.0
- npm: 10.9.2

### Client-Side Installs
- npm install axios
- npm install react-router-dom
- npm install react-icons
- npm install --save typescript @types/node @types/react @types/react-dom @types/jest
- npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps 

### Server-Side Installs
- npm install mysql2 (and npm install mysql), we are using mysql2 though
- npm install cors
