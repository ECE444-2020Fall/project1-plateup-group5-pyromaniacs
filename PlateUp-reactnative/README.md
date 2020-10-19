# Plate Up

This application is made using the Argon React Native app template. See https://demos.creative-tim.com/argon-react-native/.

## Licensing

⚠️ **Do not remove any licensing content**. ⚠️

Credits Argon React Native for their app template.

- Copyright 2020 Creative Tim (https://www.creative-tim.com/)

- Licensed under MIT (https://github.com/creativetimofficial/argon-react-native/blob/master/LICENSE.md), also see LICENSE.md

## Local Development

First install all package dependencies using `npm install`.

### Without Backend Server Running

There is an option to run the application using stubbed data. We use MirageJS to make this possible. See `mock-http.js` to see what HTTP requests are stubbed out. You may need to add additional ones. To use stubbed data, see `App.js` and uncomment the code `mockHTTP()`.

### With Backend Server Running

Follow the steps in `../README.md` to get the backend Flask server running. For the react-native application to be able to talk to the backend, you must configure the environment variable SERVER_URL. See the next section for configuring environment variables.

### Environment Variables

Environmental variables used in the project must be defined within an `env.js` file in the root directory for the React
Native portion of the application. This file is not included in the repository, as developers are expected to have their
own local version. The format is as follows:

```
const env = {
    SERVER_URL: "insert_url_here";
}

export default env;
```

- SERVER_URL: This is the url to the Flask server that the frontend will use to send requests to. If running the application
  over LAN, use the public IPv4 address of the computer running the server, followed by :5000 for the port. E.g.
  SERVER_URL: "http://192.168.0.18:5000";

### Starting React Native Application

Run `npm start`

## Current Status

The repo is still in its early stages, it is primarily the Argon React Native app template. Over time, custom functionality will be introduced.
