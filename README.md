# proyectoDrones
Implementation of a distributed system with Python, in this project i have been working with Python, Sockets, Kafka, Pymongo.

The core o the app its the remote control of drons, being able to act depending on certains conditions. For instance, we have acces to de API of OpenWeather so we have to check temperatures on a place before perfom. Then with have a .json file to tell the drones where they have to go and after complete the figures they should go back to the base to start a new show in a different city.

This app its configurated to show up in 3 different computers. In the first one we should raise up with Docker Kafka and the frontend of AD_Front. 

Meanwhile in the second computer, we should raise up our data base Pymongo with Docker. After this step we can start with the most important code of the app, AD_Registry, its the core of our app, it will control de flow of the app and to keep the drons update using messages with Kafka bcecause they will be runing in other computer. After we need to lunch AD_Registry, this its going to be the resposible to register the drons on our Pymongo database. It will be connected with the drons using Sockets connection.

Last but not least, in the thrid computer we will create the drons.
