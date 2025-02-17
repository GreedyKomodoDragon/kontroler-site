---
title: "Helm Installation"
description: "Guide to installing Kontroler using Helm"
---

## Prerequisites
- Kubernetes cluster (1.16+)
- Helm v3.x installed
- Git installed
- Access to clone the Kontroler repository

## Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/GreedyKomodoDragon/Kontroler.git
cd Kontroler/helm/kontroler
```

2. **Configure Values**
Create a custom `values.yaml` file or modify the existing one. Key configurations:

```yaml
# Basic installation with SQLite
db:
  type: sqlite
  sqlite:
    pvc:
      accessModes: ["ReadWriteMany"]
      size: 2Gi

# For log storage (required)
logStorage:
  enabled: true
  type: s3
  s3:
    bucketName: your-bucket
    region: your-region
    useCred: true
    secret:
      name: s3-creds
      idKey: AWS_ACCESS_KEY_ID
      accessKey: AWS_SECRET_ACCESS_KEY
```

3. **Install the Chart**
```bash
# Basic installation with default values
helm install kontroler .

# With custom values file
helm install kontroler . -f my-values.yaml
```

## Component Configuration

### Database Settings
Choose between SQLite and PostgreSQL:

```yaml
# SQLite Configuration
db:
  type: sqlite
  sqlite:
    path: /data
    fileName: database.db
    pvc:
      size: 2Gi

# PostgreSQL Configuration
db:
  type: postgresql
  postgresql:
    name: kontroler
    endpoint: your-postgres-host:5432
```

### Controller Settings
```yaml
controller:
  enabled: true
  image: greedykomodo/kontroler-controller:0.11.0
  resources:
    limits:
      cpu: 500m
      memory: 128Mi
    requests:
      cpu: 10m
      memory: 64Mi
```

### Server Settings
```yaml
server:
  enabled: true
  image: greedykomodo/kontroler-server:0.11.0
  replicaCount: 1
  service:
    type: ClusterIP
    port: 8080
```

### UI Settings

Currently we use a reverse proxy to expose the server for the UI, this is just the default way and you can disable this if you wish.

```yaml
ui:
  name: "kontroler-ui"
  enabled: true
  replicaCount: 1
  image: greedykomodo/kontroler-ui:0.11.0
  imagePullPolicy: Always
  env:
    API_URL: "http://localhost:3000"
    WS_URL: "ws://localhost:3000"
  serviceAccount:
    create: true
    annotations: {}
    name: "ui-sa"
  nginx:
    mtls:
      enabled: false
      insecure: true
      certs:
        caCertSecretName: ca-secret
        certSecretName: my-tls-secret
        keySecretName: my-tls-secret
    configOverride: ""
    reverseProxy: 
      enabled: true
      caCertSecretName: ca-secret
      certSecretName: my-tls-secret
      keySecretName: my-tls-secret
```

## Security Configuration

### TLS/mTLS
Enable secure communications:

```yaml
server:
  mtls:
    enabled: true
    insecure: false
    certs:
      caCertSecretName: your-ca-secret
      certSecretName: your-cert-secret
      keySecretName: your-key-secret
```

### RBAC Settings
Configure cluster access:

```yaml
rbac:
  namespaces:
    - "default"
    - "your-namespace"
```

## Verification

Check the installation:
```bash
# Verify pods are running
kubectl get pods -l "app.kubernetes.io/name=kontroler"

# Check services
kubectl get svc -l "app.kubernetes.io/name=kontroler"
```

## Upgrading

To upgrade an existing installation:
```bash
helm upgrade kontroler . -f my-values.yaml
```

## Uninstallation

Remove Kontroler:
```bash
helm uninstall kontroler
```

## Common Issues

1. **PVC Issues**
   - Ensure storage class supports your access mode
   - Verify PVC binding if using SQLite

2. **Database Connection**
   - Check database credentials
   - Verify database endpoint accessibility

3. **S3 Storage**
   - Validate S3 credentials
   - Ensure bucket permissions
   - Check endpoint configuration if using MinIO
