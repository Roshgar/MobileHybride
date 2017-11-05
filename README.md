This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


## Technical Requirements
To correctly use this application, you need :
  - Internet Connectivity
  - Authorize geolocation
  
  
## Objective of Application
This application is made for (in this instance) pokemonGo users to converge on a location at a set time for a "raid".
First, the user must sign-up and/or log-in to the application.
Once the user is logged in, he can then acces the application. Initially the view will be a map centered on the users location. From this page, the user can modify his profile, add a "Marker" to signal an incoming event, view already created locations and re-center the map if need be.

 # UserPage
 # Locations
 
