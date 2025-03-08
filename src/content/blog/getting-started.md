---
title: "Getting Started with Kontroler"
description: "Learn how to set up your first workflow engine in Kubernetes using Kontroler. This guide covers installation, basic concepts, and your first workflow."
publishDate: "2025-03-08"
image:
  src: "https://raw.githubusercontent.com/GreedyKomodoDragon/kontroler-site/refs/heads/main/images/deployment.png"
  alt: "Kubernetes and Kontroler logos"
---

# Getting Started with Kontroler

Welcome to Kontroler! This guide will walk you through the process of setting up your first workflow engine in Kubernetes using Kontroler.

## What is Kontroler?

Kontroler is a powerful, cloud-native workflow engine built specifically for Kubernetes. It allows you to define, orchestrate, and manage complex workflows directly within your Kubernetes cluster, providing deeper integration with your existing Kubernetes resources and better visibility into your workflow execution.

## Prerequisites

Before you begin, make sure you have:

- A running Kubernetes cluster (v1.16 or later)
- kubectl configured to communicate with your cluster
- Helm v3.x installed (for the easiest installation method)
- Git installed (if cloning the repository)

## Installation

### Using Helm (Recommended)

The simplest way to install Kontroler is using Helm:

```bash
# Clone the repository
git clone https://github.com/GreedyKomodoDragon/Kontroler.git
cd Kontroler/helm/kontroler

# Create a values.yaml file or use the existing one

# Install Kontroler
helm install kontroler . -f my-values.yaml
```

### Component Configuration

Kontroler consists of three main components:

1. **Controller**: Manages workflow execution
2. **Server**: Provides API access
3. **UI**: Web interface for workflow management

You can customize each component in your values.yaml file:

```yaml
controller:
  enabled: true
  image: greedykomodo/kontroler-controller:0.11.0
  resources:
    limits:
      cpu: 500m
      memory: 128Mi

server:
  enabled: true
  image: greedykomodo/kontroler-server:0.11.0
  replicaCount: 1

ui:
  enabled: true
  replicaCount: 1
  image: greedykomodo/kontroler-ui:0.11.0
```

## Verifying the Installation

Once installed, check that the Kontroler components are running:

```bash
# Verify pods are running
kubectl get pods -l "app.kubernetes.io/name=kontroler"

# Check services
kubectl get svc -l "app.kubernetes.io/name=kontroler"
```

## Your First Workflow

Let's create a simple workflow that demonstrates the basic concepts. Create a file named `hello-workflow.yaml`:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: hello-world
spec:
  task:
    - name: hello
      image: alpine
      command: ["echo"]
      args: ["Hello, Kontroler!"]
      
    - name: world
      image: alpine
      command: ["echo"]
      args: ["The workflow is running successfully!"]
      runAfter:
        - hello
```

Apply this to your cluster:

```bash
kubectl apply -f hello-workflow.yaml
```

### Tracking Your Workflow

You can check the status of your workflow:

```bash
kubectl get dags
```

To see detailed information about your workflow execution:

```bash
kubectl describe dag hello-world
```

## Using the Kontroler Dashboard

Kontroler comes with a built-in dashboard that provides visualization and management capabilities:

1. Access the dashboard by port-forwarding the service:
   ```bash
   kubectl port-forward svc/kontroler-ui 8080:80
   ```

2. Open your browser and navigate to `http://localhost:8080`

3. The dashboard will show your workflows, their execution status, logs, and allow you to create and manage workflows through a user-friendly interface.

## Next Steps

Now that you've deployed your first workflow, you can:

1. Explore more complex workflow patterns with parallel execution
2. Set up scheduled workflows using the cronjob feature
3. Create reusable workflow templates
4. Implement workspace sharing between tasks

Stay tuned for our next guide on advanced workflow patterns in Kontroler where we'll dive deeper into these concepts.

## Troubleshooting

If you encounter any issues during installation or workflow execution:

- Check the controller logs:
  ```bash
  kubectl logs -l app.kubernetes.io/component=controller -l app.kubernetes.io/name=kontroler
  ```

- Verify database connection if using PostgreSQL
  ```bash
  # Check database secret exists
  kubectl get secret <your-db-secret>
  ```

- For S3 storage issues, validate your credentials and bucket permissions

- Visit our GitHub repository to report issues or search for solutions

Happy orchestrating with Kontroler!
