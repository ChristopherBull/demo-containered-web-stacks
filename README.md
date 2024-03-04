# Demo: Containerised Web Stacks

Example web stacks that are containerised. This repository uses Docker and Compose to build and manage its containers.

## Demonstrations

This repository has the following demos:

- [Basic Docker Compose](./docker-compose%20basics/) -- Test your Docker installation.
- [Basic Dockerfile and Docker Compose](./dockerfile-compose%20basics/) -- Build and run one simple container image.

## What is "Docker Compose"?

Containers are software/code that is packaged into "[Standardized Units for Development, Shipment and Deployment](https://www.docker.com/resources/what-container/)". [Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container applications. Containers are important for [reliably sharing, testing, and deploying](https://www.ibm.com/blog/the-benefits-of-containerization-and-what-it-means-for-you/) applications, and using Compose enables containers to be easily shared and run together.

For example, a simple web application could be split into a few containers and shared (and tested) on all development team members' computers, if needed:

```mermaid
graph LR;
    id1(Front-end)<-->id2(Logic);
    id2(Logic)<-->id3(Database);
```

<!-- Textual diagram (if Mermaid.js not available) -->
<!-- [Front-end] <-> [Logic] <-> [Database] -->

Compose files are written in [YAML](https://yaml.org/), a common language often used to write configuration files.
