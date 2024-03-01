# Docker-Compose Basics

The [docker-compose.yml file](./docker-compose.yml) in this folder demonstrates basic Docker Compose functionality. It is a simple example that downloads a lightweight pre-configured image (called "[Busybox](https://en.wikipedia.org/wiki/BusyBox)") and then uses `echo` to print a sentence to the terminal. No code is required.

You can use this file to test that Docker is correctly installed in your development environment by navigating to this folder and then running `docker compose up` in your terminal. You should get output that looks similar to this the first time you run this:

```zsh
[+] Running 2/2
 ✔ foo 1 layers [⣿]      0B/0B      Pulled     3.6s 
   ✔ 9ad63333ebc9 Pull complete                0.8s 
[+] Running 2/2
 ✔ Network myapp_default  Created              0.1s 
 ✔ Container myapp-foo-1  Created              0.1s 
Attaching to foo-1
foo-1  | I'm running myapp
foo-1 exited with code 0
```

Subsequent runs of the `docker compose up` command in this folder do not need to download, create, or change the image (it is cached), so it can simply run the cached image, outputting something like this:

```zsh
[+] Running 1/0
 ✔ Container myapp-foo-1  Created              0.0s
Attaching to foo-1
foo-1  | I'm running myapp
foo-1 exited with code 0
```

If you see the text `I'm running myapp` in the terminal output, then you know Docker and Docker Compose are working. 👍
