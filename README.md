UXM Presentation
==========

A super simple presentation application that will help you to create, update, delete, share presentation online.  

![Presentation Dashboard](http://uxm.herokuapp.com/store/images/home-cover.bmp)

## Features

It's a single page application ( SPA ) that is based on MEAN stack.

#### Client Side

Client side requires REST API in form of JSON response from back-end.

1. Angular JS 
2. Bootstrap 
3. jQuery ( very little use, for bootstrap dialog, tooltip etc)

#### Server Side 

Back-end is responsible for providing RESTFUL API's nothing more than that, 

1. Node JS
2. Express
3. MongoDB

## Get Started

Here is the step by step solution to get started with this app [Create Presentation Demo](http://uxm.herokuapp.com/#/covers/b4e5a6f8746799d4)

## Install
#### Server side setup

from the project root ( production.js lives here) 
```shell
npm install
```
#### Client side setup

Get inside public folder and do following..

```shell
npm install
bower install
node production.js
```

Now you should able to see project running on port 5000 

```shell
http://localhost:5000/app
```

## Developer setup

1. run server from terminal `node production.js`, now you able to see application running from here `http://localhost:5000/app`

2. go inside `public` folder and run `gulp watch`, keep in mind all client side code resides in `public` folder.
    
    **HTML Changes**
    
    you might want to update `index.html` or want to add some html partials inside `views` folder
    
    **CSS changes**
    
    all css changes shuuld be done inside `public / app / less / custom` folder
    
    **JS changes**
    
    - install all 3rd party libraries using `bower install xxx --save`
    - if plugin you want to install not available through `bower` then please put that inside `vendor` folder.
    - all custom scripts created by you should go inside `scripts` folder.

### Note- 

never forget to run `gulp watch`, it's your best friend, it will do the `compilation of your less` files into css files and do JS linting for you.

```shell
gulp watch
```

## Build

Project is ready for production by just running `gulp` from terminal, it will create create build directory outside your project folder.

```shell
gulp
```

## Useful Resources

1. Dashboard Page -  [dashboard](http://uxm.herokuapp.com/#/)
2. Create presentation cover - [create cover](http://uxm.herokuapp.com/#/create-cover)
3. Add slides to presentation created in #2 [add slides](http://uxm.herokuapp.com/#/addslide)
4. See created presentation sample [view presentation](http://uxm.herokuapp.com/#/covers/701e275088775a60)
5. See all presentation by anonymous user ( Not registered users) [all presentation](http://uxm.herokuapp.com/#/covers)
6. See all users list [All USers](http://uxm.herokuapp.com/#/users)
7. Registered user have ton of features...
    - they can CRUD their profiles
    - they can do CRUD with presentation 

    
