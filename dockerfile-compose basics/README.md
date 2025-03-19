# Dockerfile and Docker-Compose Basics

The [docker-compose.yml file](./docker-compose.yml) in this folder demonstrates how to build a Docker image of your code, and then run it with Docker Compose functionality.

This folder contains a very simple application: [app.js](./app.js). It is a single-file NodeJS application that outputs some text to the terminal and then exits—it does not get much simpler than this. This application does not require any dependencies/libraries, only NodeJS to run it. You can run the application directly with the command `node app.js`, which will then output `Hello World`.

The [Dockerfile](./Dockerfile) defines the execution environment of the app and sets up the application within it. Other projects may specify `Ubuntu` as their environment, for example, but this example specifies `Node` which is smaller and specialised (to reduce any unnecessary [bloat](https://en.wikipedia.org/wiki/Software_bloat)). It is important to reduce the size of the base image, which is downloaded when you build your image. You can read more about creating a Dockerfile with [Docker tutorials](https://docs.docker.com/get-started/) (following a step-by-step guide) and go further and read about [best practices for writing a Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).

As this example is a simple application, the Dockerfile only needs to copy the source code file `app.js` when building the Docker image. It is worth noting that, as JavaScript is an interpreted language, we copy the source files directly. If you write a Java application, for example, you would copy all of the compiled files into the Docker image.

Now run `docker compose up` in your terminal to see the application be built and run as a container.

## Build Dockerfile only

Suppose you wish to build a Dockerfile directly (i.e., without Docker-Compose). In that case, you should use the docker build terminal command `docker build -t <name>:<tag> <path>`. `-t <name>:<tag>` gives it a name you specify, making it easier to locate the built image later. For example:

```zsh
docker build -t myapp:latest .
```

Now the Docker image is built, you can run it as a Docker Container with the following command:

```zsh
docker run myapp:latest
```

> [!TIP]
> Use `-d` to run a container in detached mode (i.e., run in the background): `docker run -d myapp:latest`
