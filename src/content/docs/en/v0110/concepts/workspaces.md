---
title: "Workspaces"
description: "Learn how to share data between tasks using Kontroler workspaces"
---

## Workspaces in Kontroler

Workspaces provide a shared persistent storage area that all tasks in a DAG can access. This feature enables data sharing and state persistence between tasks in your workflow.

## Basic Configuration

Enable a workspace by adding the workspace configuration to your DAG:

```yaml
spec:
  workspace:
    enable: true
    pvc:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
      storageClassName: standard
      volumeMode: Filesystem
```

When enabled, each task in your DAG automatically gets access to the workspace at `/workspace`.

## How It Works

1. **PVC Creation**: Kontroler automatically creates a PersistentVolumeClaim (PVC) based on your configuration
2. **Mounting**: Each task pod mounts the PVC at `/workspace`
3. **Lifecycle**: The PVC persists throughout the entire DAG execution
4. **Sharing**: All tasks can read from and write to the shared space

## Possible Use Cases

1. **File Passing**
```yaml
task:
  - name: "producer"
    command: ["sh", "-c"]
    args: ["echo 'data' > /workspace/output.txt"]
  
  - name: "consumer"
    command: ["sh", "-c"]
    args: ["cat /workspace/output.txt"]
    runAfter: ["producer"]
```

2. **Data Processing**
```yaml
task:
  - name: "download"
    command: ["wget"]
    args: ["-O", "/workspace/data.csv", "http://example.com/data.csv"]
  
  - name: "process"
    command: ["python"]
    args: ["-c", "import pandas as pd; df = pd.read_csv('/workspace/data.csv')"]
    runAfter: ["download"]
```

## Configuration Options

### Storage Class
```yaml
workspace:
  enable: true
  pvc:
    storageClassName: "fast-ssd"  # Specify storage class
```

### Access Modes
```yaml
workspace:
  enable: true
  pvc:
    accessModes:
      - ReadWriteOnce     # Single node access
      # - ReadWriteMany   # Multi-node access
```

### Resource Requests
```yaml
workspace:
  enable: true
  pvc:
    resources:
      requests:
        storage: 5Gi      # Request 5GB of storage
```

## Best Practices

1. **Size Appropriately**
   - Request enough storage for your workflow
   - Consider peak usage requirements
   - Account for temporary files

2. **Access Modes**
   - Use `ReadWriteOnce` for single-node workflows
   - Consider `ReadWriteMany` for distributed tasks
   - Check storage class compatibility

3. **Performance**
   - Choose appropriate storage class
   - Monitor I/O patterns
   - Consider task sequence

## Example DAG with Workspace

Here's a shortened example showing workspace usage:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: workspace-example
spec:
  workspace:
    enable: true
    pvc:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
      storageClassName: standard
  task:
    - name: "write-data"
      command: ["sh", "-c"]
      args: ["echo 'Hello from task 1' > /workspace/message.txt"]
    
    - name: "read-data"
      command: ["sh", "-c"]
      args: ["cat /workspace/message.txt"]
      runAfter: ["write-data"]
```

## Limitations

1. **Storage Class Compatibility**
   - Must be supported by your cluster
   - Check available storage classes
   - Verify access mode support

2. **Performance**
   - Network storage may impact speed
   - Consider I/O requirements
   - Test with representative data

3. **Concurrency**
   - Handle file locking if needed
   - Consider parallel task access
   - Be aware of race conditions

