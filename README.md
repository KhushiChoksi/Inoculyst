# Inoculyst 
(CPSC 471 - G16): Ayesha Saeed, Khushi Choksi, Shanza Raza

## Introduction
### What is Inoculyst? 
A web application aimed to help pharmacies efficiently manage their vaccine inventory by tracking expiration dates, reducing waste, and ensuring no revenue is lost.

### Problem definition
Expired vaccinations lead to financial loss, inventory management issues, and missed revenue opportunities due to human errors and inefficient tracking methods. 

### Scope
The scope of this application is to provide an inventory management system for _one_ pharmacy.

## Running the application
Please note that you must have the listed technologies (Node.js, React, and MySQL) installed on your computer to run this application successfully. For the best results, please ensure the versions match as well. You may find the proper installs at these websites based on your device:
- https://nodejs.org/en/download
- https://dev.mysql.com/downloads/installer/
---------------------

### Installing the project
1. Clone the repository on your computer using the command `git clone https://github.com/KhushiChoksi/Inoculyst.git` or however you prefer to clone git repositories.
2. Ensure that everything has cloned properly.
3. Follow through the next sections to run the code.

---------------------
### How to run server-side
#### Set up the database in MySQL
##### Setting the database up from scratch, before the first run
- `cd server`
- Log in to MySQL with the command `mysql -u root -p` so that you are on localhost.
- Set up the database by doing the following commands:
  ```
  source database/migrations/setup.sql
  source database/seeders/users.sql
  source database/seeders/inventory.sql
  source database/seeders/analytics.sql
  source database/seeders/distributors.sql
  source database/seeders/returns.sql
  ```
- Then create a new local user that will be used to run the server with Node.js. These commands will set up the new user and permit it to access the database:
  ```
  CREATE USER 'inoculyst_user'@'localhost' IDENTIFIED BY 'inoculyst';
  GRANT ALL PRIVILEGES ON INOCULYST.* TO 'inoculyst_user'@'localhost';
  FLUSH PRIVILEGES;
  ```
- Later on, you can simply log into MySQL to access the database using the new user using this command: ` mysql -u inoculyst_user -p`. The password is `inoculyst`.
- Test a query using a command such as `SELECT * FROM BATCH;`. This should display the BATCH table with all the initial data.

##### If you ever need to reset the database, please follow the following steps:
- Log into MySQL: `mysql -u inoculyst_user -p`. The password is `inoculyst`.
- `drop database inoculyst;`
- Set up the database again by doing the following commands:
  ```
  source database/migrations/setup.sql
  source database/seeders/users.sql
  source database/seeders/inventory.sql
  source database/seeders/analytics.sql
  source database/seeders/distributors.sql
  source database/seeders/returns.sql
  ```

#### Running the Node.js server
Note: Please ensure that the database is fully set up (using the above [steps](https://github.com/KhushiChoksi/Inoculyst/edit/main/README.md#set-up-the-database-in-mysql)) before doing these steps. 
- `cd server` (If you are already in the server directory, you may skip this step). 
- `npm install`
- `node index.js`
  - This will start the server on localhost:8080. Please refer to the `ROUTES.md` file located in [server/ROUTES.md](https://github.com/KhushiChoksi/Inoculyst/blob/main/server/ROUTES.md) to see all the routes in the server application.
    - Please note that not all routes were used in the frontend application. 

---------------------
### How to run client-side
Note: First, start the Node.js server after following all the steps [above](https://github.com/KhushiChoksi/Inoculyst/edit/main/README.md#set-up-the-database-in-mysql), and then follow these steps below.
#### Set up
```
cd client
npm install --legacy-peer-deps
```

#### Running it
```
cd client
npm start
```

This will start the development build in your browser.


## Technology stack and versions used
SQL (MySQL), Node.js, Express.js, and React

- react: 19.0.0
- node: v22.14.0
- npm: 10.9.2
- mysql: mysql  Ver 8.0.41 for macos15 on arm64 (MySQL Community Server - GPL) 

### Client-Side Installs
- npm install axios
- npm install react-router-dom
- npm install react-icons
- npm install --save typescript @types/node @types/react @types/react-dom @types/jest
- npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps 

### Server-Side Installs
- npm install mysql2 (and npm install mysql), we are using mysql2 though
- npm install cors

## Sources
View these files to view the sources:
1. https://github.com/KhushiChoksi/Inoculyst/blob/main/client/SOURCES.md
2. https://github.com/KhushiChoksi/Inoculyst/blob/main/server/SOURCES.md
