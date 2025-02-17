---
title: "Building from Source"
description: "Instructions for building Kontroler components from source"
---

## Prerequisites

- **Controller & Server**:
  - Go 1.23 or higher
  - Make
  - Docker (for container builds)

- **UI**:
  - Node.js v21.x
  - npm or yarn
  - Docker (for container builds)

## Docker Builds (Recommended)

We strongly recommend using our Dockerfiles for building components, especially for production deployments. The controller must run within Kubernetes to function properly.

### Standard Builds
```bash
# Build Controller
docker build -f controller/Dockerfile -t kontroler-controller:local .

# Build Server
docker build -f server/Dockerfile -t kontroler-server:local .

# Build UI
docker build -f ui/Dockerfile -t kontroler-ui:local .
```

### UBI (Universal Base Image) Builds
We provide Red Hat UBI-based images for enhanced security and enterprise compatibility:

```bash
# Build Controller (UBI)
docker build -f controller/Dockerfile.UBI -t kontroler-controller:ubi .

# Build Server (UBI)
docker build -f server/Dockerfile.UBI -t kontroler-server:ubi .
```

## Building from Source (Development)

While not recommended for production, you can build components directly for development:

### Controller
```bash
cd controller
go mod download
go build -o kontroler-controller cmd/main.go
```

### Server
```bash
cd server
go mod download
go build -o kontroler-server cmd/main.go
```

### UI
```bash
cd ui
npm install
npm run build
```

## Important Notes

1. **Production Deployments**:
   - Always use container builds for production
   - The controller must run in-cluster
   - Use UBI images for enhanced security requirements

2. **Development Builds**:
   - Direct builds are suitable for testing and development
   - Some features require running in Kubernetes
   - Local builds may not have all production optimizations

3. **Version Compatibility**:
   - Keep Go and Node.js at recommended versions
   - Use matching component versions
   - Follow semantic versioning for dependencies

## Getting Help

If you encounter build issues:
- Check our GitHub issues
- Ensure prerequisites are met
- Verify your Docker environment
- Join our community discussions
