Demo: https://limitless-caverns-29210.herokuapp.com/index.html#/

A Vue.js E-Commerce Application demo 

Frontend:
webpack 2.6.1,
vue 2.3.3,
vue-router 2.7.0,
vuex,
Bootstrap 3 components

node_modules included

Backend: Clone the repository named Laravel-rest-Vue.js-e-commerce,
cd Laravel-rest-Vue.js-e-commerce directory, 
configure the .env file, change the Database connections and Mail driver credentials to your credentials.

``` bash 
php artisan migrate 
## used to add new tables, columns, or indexes to your database
php artisan serve 
## Laravel development server started on http://localhost:8000. Now you can point your browser to http://localhost:8000 and see your application.
Go back to vue's folder open src folder directory, configure config.js change the apiDomain base url to http://localhost:8000 which is where the laravel development server started. 

``` 
Backend: 
php 5.6.4,
laravel/framework 5.4.,
laravel/passport": ^4.0


# jsvue

> A Vue.js project

## Build Setup

``` bash

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

