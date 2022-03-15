# Ase Delivery

ASE Delivery is a pick-up station (aka. pack station) delivery service, where customers who order items are assigned a box at a pick-up station. The service then delivers the items from a central depot to the customer’s box at the pick-up stations


## Prerequisites

Both for the frontend and the backend:

nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

Go to your project root folder via command line
```
cd your/path/to/game-with-me-backend

```

**Set up your database**

* Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* Start the database server
```
mongod --dbpath "your/path/to/database"
```


## Run the Application


Start the app by running the BackendApplication.java file.

Now browse to the app at `http://localhost:3000`.
