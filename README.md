# project1-plateup-group5-pyromaniacs
project1-webapp-group5-pyromaniacs created by GitHub Classroom

# Repository Structure
This repo has two main components: (1) Client Application (2) Server Application.

The client application is written in React Native using the Argon React Native Template and its source code lies in `PlateUp-reactnative`. 
The server application is written in Python using Flask and its source code lies in `PlateUp-flask`.

Find additional information in each directory README.md.

# Instructions for Local Development

To build and start the system, first clone the repository <br>
```git clone https://github.com/ECE444-2020Fall/project1-plateup-group5-pyromaniacs && cd project1-plateup-group5-pyromaniacs```<br><br>

You now need to run the client application and server application.

Development Requirements:
1) Docker - Find installation instructions at https://docs.docker.com/get-started/ <br>
2) Mobile Development - Useful to have an android or iOS emulator working. Refer to https://www.youtube.com/watch?v=0-S5a0eXPoc for a tutorial on getting this working.

Launching the server application: ```cd PlateUp-flask && docker-compose up```<br><br>
You can use ctrl-C to exit the container.

Launching the client application:
1) `npm install`
2) `npm start`
3) Connect to your specific emulator

Refer to https://www.youtube.com/watch?v=0-S5a0eXPoc for a general guide on getting a React Native application going. 

You should be good to go now!
