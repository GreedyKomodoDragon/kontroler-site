---
title: "Kontroler APIs"
description: "Understanding the Kubernetes APIs available in Kontroler"
---

## Kubernetes APIs

Kontroler provides several Kubernetes custom resources that work together to define and execute workflows:

1. **DAG** - Defines the workflow structure and task relationships
2. **DagRun** - Represents an execution instance of a DAG
3. **DagTask** - Reusable task definitions that can be referenced by DAGs

### DAG (Directed Acyclic Graph)

The DAG resource defines your workflow structure:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-example
spec:
  parameters:
    - name: param1
      defaultValue: value
  task:
    - name: "task1"
      command: ["..."]      # Direct task definition
    - name: "task2"
      taskRef:              # Reference to a DagTask
        name: "shared-task"
        version: 1
```

### DagTask (Reusable Task Definition)

DagTasks allow you to create reusable task templates:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DagTask
metadata:
  name: shared-task
spec:
  command: ["..."]
  image: "alpine:latest"
  parameters:
    - param1          # Parameters this task accepts
  podTemplate:        # Kubernetes pod configuration
    resources:
      requests:
        memory: "64Mi"
```

### DagRun (Workflow Execution)

DagRun resources represent individual executions of a DAG. They allow you to:
- Start new workflow executions
- Override default parameters
- Track execution status

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DagRun
  name: dagrun-sample5
spec:
  dagName: dag-sample1    # Reference to the DAG to execute
  parameters:             # Optional: Override default parameters
    - name: first
      fromSecret: secret-name-new    # Use value from a Kubernetes secret
    - name: second
      value: value_new               # Direct value override
```

## Task Reusability

### Using DagTasks in DAGs

1. **Define Once, Use Many Times**
   - Create common task patterns as DagTasks
   - Reference them in multiple DAGs
   - Maintain consistency across workflows

2. **Reference Syntax**
   ```yaml
   task:
     - name: "my-task"
       taskRef:
         name: "shared-task"    # Name of the DagTask
         version: 1             # Version
   ```

3. **Parameter Passing**
   - DAG parameters must match DagTask requirements
   - Parameters flow through the taskRef

## Best Practices

1. **Task Organization**
   - Create DagTasks for common operations
   - Version tasks for breaking changes
   - Document parameter requirements

2. **Version Management**
   - Use taskRef versions for stability
   - Maintain backward compatibility
   - Document version changes

3. **Resource Management**
   - Define resource limits in DagTasks
   - Override when needed in DAGs
   - Consider environment differences

## Example: Task Reuse

Here's a complete example showing task reuse:

```yaml
# Define a reusable task
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DagTask
metadata:
  name: process-data
spec:
  command: ["python"]
  args: ["-c", "print('Processing data')"]
  image: "python:3.9"
  parameters:
    - inputPath
    - outputPath
  podTemplate:
    resources:
      requests:
        memory: "256Mi"
        cpu: "500m"

---
# Use the task in multiple DAGs
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: workflow1
spec:
  parameters:
    - name: inputPath
      defaultValue: "/data/input1"
    - name: outputPath
      defaultValue: "/data/output1"
  task:
    - name: "process1"
      taskRef:
        name: "process-data"
        version: 1

---
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: workflow2
spec:
  parameters:
    - name: inputPath
      defaultValue: "/data/input2"
    - name: outputPath
      defaultValue: "/data/output2"
  task:
    - name: "process2"
      taskRef:
        name: "process-data"
        version: 1
```

This approach enables:
- Consistent task configuration
- Reduced duplication
- Centralized updates
- Version control of task definitions

