---
title: "CRD APIs"
description: "CRD APIs and how to use them"
---

This section provides an overview of the Custom Resource Definition (CRD) that Kontroler currently supports. You'll learn how to use the CRD, what each field represents, and see practical examples to help you get started.

## Overview

Kontroler’s CRD enables users to define and manage Directed Acyclic Graphs (DAGs) for workflow orchestration directly within a Kubernetes-native environment. Below is a detailed explanation of the CRD’s structure, including all available fields and their functions.

## DAG

### Event Driven vs Scheduled

You can create a DAG as both event driven/trigger or as a scheduled DAG (similar to a CronJob). You do this via the `schedule` field, see the two examples below. 

By omitting the scheduled field you are designating the DAG as <b>Event Driven only</b>, if you create a scheduled DAG you can still execute it in an event driven manner!

```yaml
# Scheduled
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample-cronjob
spec:
  # Runs every min
  schedule: "*/1 * * * *"
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      backoff:
        limit: 3
      conditional:
        enabled: false
        retryCodes: []

# Event Driven
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample-cronjob
spec:
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      backoff:
        limit: 3
      conditional:
        enabled: false
        retryCodes: []
```



### Examples

Below is a series of examples that you can use to create your own DAGs as its much easier to learn the API using examples.

#### Parameters

This example shows you both the value parameter & the secret parameter. 

A secret parameter allows you to provide the name of a secret that will take the value within the secret and export it as an ENV variable. In the current version, you must place the data under the key `data`.

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample
spec:
  parameters:
    # First Parameter
    - name: first
      defaultFromSecret: secret-name
    # Value Parameter
    - name: second
      defaultValue: value
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "if [ $((RANDOM%2)) -eq 0 ]; then echo $second; else exit 1; fi",
        ]
      image: "alpine:latest"
      backoff:
        limit: 5
      parameters:
        - second
      conditional:
        enabled: false
        retryCodes: []
```

#### CronJob

This is an example for how you would create a simple cronjob within Kontroler.

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample-cronjob
spec:
  # Runs every min
  schedule: "*/1 * * * *"
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      backoff:
        limit: 3
      conditional:
        enabled: false
        retryCodes: []
```

#### Multiple Tasks

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample-multi-task
spec:
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      backoff:
        limit: 3
      conditional:
        enabled: true
        retryCodes: [8]
    - name: "random-b"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      runAfter: ["random"]
      backoff:
        limit: 3
      conditional:
        enabled: true
        retryCodes: [8]
    - name: "random-c"
      command: ["sh", "-c"]
      args:
        [
          "echo 'Hello, World!'",
        ]
      image: "alpine:latest"
      runAfter: ["random"]
      backoff:
        limit: 3
      conditional:
        enabled: true
        retryCodes: [8]
```

#### PodTemplates

You can use the podTemplate field to perform various different actions such as volume mounting PVCs, adding affinity & using serviceAccounts.

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample
spec:
  parameters:
    - name: first
      defaultFromSecret: secret-name
    - name: second
      defaultValue: value
  task:
    - name: "random"
      command: ["sh", "-c"]
      args:
        [
          "if [ $((RANDOM%2)) -eq 0 ]; then echo $second; else exit 1; fi",
        ]
      image: "alpine:latest"
      backoff:
        limit: 5
      parameters:
        - second
      conditional:
        enabled: true
        retryCodes: [1]
      podTemplate:
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "791m"
        volumes:
          - name: example-pvc
            persistentVolumeClaim:
              claimName: example-claim  # The name of the PVC
        volumeMounts:
          - name: example-pvc
            mountPath: /data  # Path inside the container where the PVC is mounted
        imagePullSecrets:
          - name: my-registry-secret
        securityContext:
          runAsUser: 1000
          runAsGroup: 3000
          fsGroup: 2000
        nodeSelector:
          disktype: ssd
        tolerations:
          - key: "key1"
            operator: "Equal"
            value: "value1"
            effect: "NoSchedule"
        affinity:
          nodeAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
              nodeSelectorTerms:
                - matchExpressions:
                    - key: "kubernetes.io/e2e-az-name"
                      operator: In
                      values:
                        - e2e-az1
                        - e2e-az2
        serviceAccountName: "custom-service-account"
        automountServiceAccountToken: false
```

## DagRun

### Examples

#### Parameters

You can override the default parameters using the `parameters` field.

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DagRun
metadata:
  name: dagrun-sample
spec:
  dagName: dag-sample
  parameters:
    - name: first
      fromSecret: secret-name-new
    - name: second
      value: value_new
```