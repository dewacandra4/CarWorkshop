# Getting started CarWorkshop

## Installation Laravel

Please check the laravel offical installation documentation . [Official Documentation](https://laravel.com/docs/9.x/installation)

## Run Laravel
Clone the repository

```bash
    git clone git@github.com:dewacandra4/CarWorkshop.git
```

Switch to the repository folder and laravel folder
```bash
    cd CarWorkshop
    cd Backend
```

Install dependencies 

```bash
    composer install
```

Generate new app key
```bash
    php artisan key:generate
```

Generate JWT authentication secret key
```bash
    php artisan jwt:generate
```

Set the database connection in the .env file

Run database migrations (or you can manully import the database file db_carworkshop.sql in the database folder )

```bash
    php artisan migrate
```

Start the local server

```bash
    php artisan serve
```

Access the server using browser at http://127.0.0.1:8000/ or http://localhost:8000

## Installation React JS 
Getting Started with Create React App

You need to have Node >= 14.0.0 and npm >= 5.6 on your machine to run and create a react project: 
```bash
npx create-react-app my-app
cd my-app
npm start

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run React 

Open the command / bash on your machine and run:

```bash
    cd CarWorkshop
    cd Frontend
    npm start
```
to run the local server and access the server using browser at http://127.0.0.1:3000/ or http://localhost:3000

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

## Entity Relationship Diagram (Crow's Foot)
![ERD_Crows_Foot](https://i.ibb.co/Hh66dZJ/ERD-Crow-Foot-Car-Workshop.jpg)

## State Machine Diagram
![State Machine Diagram](https://i.ibb.co/hH63p1w/State-Machine-Diagram.jpg)

## Public Link Postman
Open [CarWorkshop_PostMan](https://www.postman.com/supply-technologist-56058075/workspace/carworkshop/collection/19178862-65452c23-6cb6-4f4d-ba66-d6117388212d?action=share&creator=19178862)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
