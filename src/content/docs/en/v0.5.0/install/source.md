---
title: "Building from Source"
description: "Explaining how to build all the parts from source"
---

We provide Makefiles for each of the components that make up the system, with a focus on creating docker images. If you wish to run the server and UI outside of Kubernetes you can. It is only the controller that has to be within kubernetes at the moment. 

There are plans to allow the controller outside of kubernetes and connect via the kubernetes API from outside the cluster instead.

We recommend that you use the dockerfile Makefiles as this will handle the dependencies required, this way you will only need to install the tools required to run:

* Make
* Docker

## Controller

### Docker Makefile

Change Directory (cd) into the controller directory within the Github Repo. Then you can run the following and push it into your own registry.

```sh
make docker-build docker-push IMG=<some-registry>/operator:tag DOCKERFILE=Dockerfile/Dockerfile.UBI
```

### Native

Requirements to build:

* go 1.21
* toolchain go1.21.3

Change Directory (cd) into the controller directory within the Github Repo, then run the following:

```sh
go build -a -o manager cmd/main.go
```

## Server

### Docker Makefile

Change Directory (cd) into the server directory within the Github Repo. Then you can run the following and push it into your own registry.

```sh
make docker-build docker-push IMG=<some-registry>/operator:tag DOCKERFILE=Dockerfile/Dockerfile.UBI
```

### Native

Requirements to build:

* go 1.22.0 installed
* toolchain go1.22.3

Change Directory (cd) into the server directory within the Github Repo, then run the following:

```sh
go build -a -o server cmd/main.go
```

## UI

### Docker Makefile

Change Directory (cd) into the UI directory within the Github Repo. Then you can run the following and push it into your own registry.

```sh
make docker-build docker-push IMG=<some-registry>/operator:tag
```

This will create a docker image using NGINX. UBI image coming soon!

### Native

Requirements to build:

* Node v18 or Greater

Change Directory (cd) into the UI directory within the Github Repo, then you can run the following:

```sh
npm install && npm run build
```
