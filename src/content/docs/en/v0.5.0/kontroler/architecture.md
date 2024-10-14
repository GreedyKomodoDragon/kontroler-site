---
title: "Architecture"
description: "Explaining the architecture of kontroler and what each part does"
---

This section will explain Kontroler is set up and what each component does in the system. Kontoler has been built so that you don't know to deploy all of it components if you wish to bring your own parts along.

For example, if you don't want to use own provided server or UI you can create your own! You will however need to install the controller if you want to use the core of kontroler.

## Overview

[TODO add diagram in here showing the relationship]

## Controller

The core of Kontroler is the Kubernetes Controller, this handle most of the core features that we offer. Currently the controller is created in Go and it built upon the Operator SDK framework. The controller handles several pieces of work:

* The reconcilation of CRD instances (DAG & DagRun) - which basically means it knows how to handle the creation & deletion of DAGs and DagRuns.
* Pod Allocation & Pod Watching - The controller will allocate pods based on conditions in the DAGs you have created and watch for the outcomes to feed into this decision.

The controller does not expose any endpoints that another client can use, all interactions are done via the CRDs. 

### Database Required

In v0.5.0, you must provide a postgresql database that the controller to connect to. This is done to speed up the interactions and to avoid the controller having to see the state of the cluster to understand what pods have executed before. 

How you connect will be shown in the installation pages.

#### No indexes

Currently there database contains no indexing to speed up the retrieval, this is something we will add in, but for the moment you may want to add this in yourself!

### Pods

#### Clean up

Pods are also not kept after they have finished and have been accounted for, their deletion is a marker that their events have been read and in the case that the controller restarts deduplicate events are not re-played. Also avoids your cluster filling up with tons of pods!

#### No Sidecars

Kontroler assumes you are using a single pod container, if you use a sidecar in the current version you will get some odd side-effects! There is a plan to handle these more gracefully. Support for Istio sidecars is not supported but maybe in the future.

### Multiple Controller

If you wish to run multiple distinct controllers you can but you need to create a new Database for each controller. This is required as upon start up the controller will place a unique ID to the database, so allows the controller to keep track of all the pods it has allocated.

Currently if you install two controllers with access to look in the same namespace a DAG applied in one will be applied in both. The same will happen for DagRun which will cause some issues as one of the DAGs may not be able to find the DAG in its Database.


## Server

The server is a Go service that handles:

* Authentication - Currently using Basic Authentication (User-Pass) with a JWT
* CRUD APIs - Basic APIs to view, create and deletion of the CRD objects along
* Basic Stats - Has a basic API that shows some stats about the system e.g. success-rate per day.


### Database

The database is required for the server and assumes that the database has already been set up for the controller, the service will fail if cannot find the tables etc. Currently the authentication and the Dag information is placed in the same database but this will soon change where we will allow you to move authentication into its own Database to avoid auth slowing down the controller.

How you connect will be shown in the installation pages.

### API

There server exposes a REST api that any client can connect to, you can find the full documentation explaining each endpoint [here]().

### mTLS

Server has support for mTLS out of the box so there is no need to run an mTLS proxy in front if you want to improve the security of the system.


## User Interface (UI)

The UI is not built into the server and must be deployed in addition to the server. We have done to decrease the coupling between the two services in the case we want to do a re-write of either. We understand that this does make the deployment of the system more complex if you opt in for both the server & UI, we do however provide a helm chart to hopefully decrease this increase complexity.

The UI is built using SolidJS and is entirely clientside rendered. The provided Dockerfile for the UI builds in the UI and serves it via an NGINX instance. The NGINX within the helm chart also provides the ability to use the NGINX pods as a reverse proxy to allow the UI to access the server. 

### mTLS

UI has support for mTLS out of the box so there is no need to run an mTLS proxy in front if you want to improve the security of the system. This is only within the NGINX image & helm chart, SolidJS will not handle this for you if you wish to use NGINX.