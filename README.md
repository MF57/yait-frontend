# YAIT - frontend

##Configuration

In app folder there is a conf.js_template which is a template file for configuration properties
of the application.

You have to create config.js file in the same folder, copy properties from the template
and fill in properties' values.

window.backendUrl is the baseUrl of the backend yait application

Example:

```
window.backendUrl = "http://yourdomain:8080/";

```

It is important to end the url with '/'


##How to run outside of docker?

Required software: node, npm, bower, sass

```
npm install
bower install
grunt serve
```

##How to use with docker?

```
docker build -t yait-frontend .
docker run --network="host" --name="yait-frontend" yait-frontend 

```


