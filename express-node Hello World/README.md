# Container Isolation and Docker-Compose

This example demonstrates how containers are isolated from the system it is running on and how you can expose the web application in this demo so it can be viewed in a web browser.

> "A container is an isolated environment for your code. This means that a container has no knowledge of your operating system, or your files." ([Docker](https://docs.docker.com/guides/walkthroughs/what-is-a-container/)).

This isolation is what makes it good for testing, sharing, and deploying software.

## Example Web Application

The [example Node app](./app.js) has been updated with a simple web framework dependency. The application is configured to listen on port 3000 and serve a web response. To see this app working before we containerise it, install the Node dependencies in the folder with `npm install` and then run it with `node app.js`. The terminal will output `Example app listening on port 3000` and the application won't close (until you force quit it with `CTRL+C`)—this is expected behaviour for a web application, as it needs to listen for requests. When it is running, you can see the web response using a web browser by navigating to [http://localhost:3000/](http://localhost:3000/). It should show: `Hello World! This is a web response.`.

Don't forget to close the application when you are done. This is especially important as the application has exclusive control of the port and no other application can use it (we'll need it free for the copy of the application when we run it as a container).

## Containerising the Web Application

This is very similar to the [previous demo](../dockerfile-compose%20basics/), but with some additional lines in the [Dockerfile](./Dockerfile):

```Dockerfile
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
```

1. `WORKDIR /usr/src/app`: If a Dockerfile does not specify a [`WORKDIR`](https://docs.docker.com/reference/dockerfile/#workdir), it uses a default directory. Using the default working directory throws an error when installing dependencies into this container, so we specify a new one for the app to run in.
2. `COPY package*.json app.js ./`: This is similar to the [`COPY`](https://docs.docker.com/reference/dockerfile/#copy) line previously, but it adds `package*.json` to the list of files to copy. Dependencies are installed into containers; With Node, this is done by including the "package.json" and "package-lock.json" files which specify the dependencies. However, they are not installed yet.
3. `RUN npm install`: The [`RUN`](https://docs.docker.com/reference/dockerfile/#run) instruction installs the dependencies into the container using the specification within the `package-lock.json` file.
4. `EXPOSE 3000`: Specifies the port to be used. Note that the [`EXPOSE`](https://docs.docker.com/reference/dockerfile/#expose) "[instruction doesn't actually publish the port. It functions as a type of documentation](https://docs.docker.com/reference/dockerfile/#expose)". To publish the port, you can use either the `-p` or `-P` commands with `docker run`, or you can specify the ports in a Compose file as in this demo.

There are also some additional lines in the [docker-compose.yml](./docker-compose.yml):

```yml
ports:
  - "3000:3000"
```

This portion of the Compose file maps the container's port to one of the host system's ports—an important step, as the containers are isolated from the host. It is written as "HOST_PORT:CONTAINER_PORT"; Sometimes different software (or different copies of the same software) request the same port on a computer, which is not allowed and the second piece of software will throw an error as it cannot use a port that is already in use. This notation allows you to remap ports for software within containers to avoid clashes. As this demo is a simple example that does not need the port re-mapping, we can map the container's port to the same port number on the host machine: `"3000:3000"`.

Now run `docker compose up` in your terminal to see the application be built and run as a container. In the same way as [running the web app directly](#example-web-application), you will see the terminal output include `Example app listening on port 3000`. Now open the web application in a web browser by navigating to [http://localhost:3000/](http://localhost:3000/). It should show: `Hello World! This is a web response.`.

Don't forget to close the application when you are done by typing `CTRL+C` in the terminal to force it to quit.
