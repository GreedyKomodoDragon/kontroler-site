---
title: "Parameters"
description: "Guide to using parameters in Kontroler DAGs"
---

## Using Parameters in DAGs

Parameters allow you to make your workflows dynamic and reusable by injecting values at runtime.

## Defining Parameters in DAGs

Here's an example DAG with parameter definitions:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DAG
metadata:
  name: dag-sample-event
spec:
  parameters:
    - name: first
      defaultFromSecret: secret-name    # Default value from a Kubernetes secret
    - name: second
      defaultValue: value               # Static default value
  task:
    - name: "random"
      image: "alpine:latest"
      command: ["sh", "-c"]
      args: ["if [ $((RANDOM%2)) -eq 0 ]; then echo $second; else exit 1; fi"]
      parameters:
        - first                        # Declare which parameters this task uses
        - second                       
```

### Parameter Types

1. **Secret References**:
   ```yaml
   parameters:
     - name: first
       defaultFromSecret: secret-name
   ```
   - Securely fetch values from Kubernetes secrets
   - Useful for credentials and sensitive data

2. **Static Values**:
   ```yaml
   parameters:
     - name: second
       defaultValue: value
   ```
   - Hardcoded default values
   - Can be overridden in DagRuns

## Using Parameters in Tasks

Tasks must declare which parameters they use:

```yaml
task:
  - name: "task-name"
    parameters:
      - second    # List parameters used by this task
```

## Overriding Parameters in DagRuns

Create a DagRun to execute a DAG with custom parameter values:

```yaml
apiVersion: kontroler.greedykomodo/v1alpha1
kind: DagRun
metadata:
  name: dagrun-sample5
spec:
  dagName: dag-sample1
  parameters:
    - name: first
      fromSecret: secret-name-new    # Override with different secret
    - name: second
      value: value_new               # Override with new value
```

### Parameter Override Types

1. **Secret Override**:
   ```yaml
   parameters:
     - name: first
       fromSecret: secret-name-new
   ```

2. **Direct Value Override**:
   ```yaml
   parameters:
     - name: second
       value: value_new
   ```

## Best Practices

1. **Security**:
   - Use secrets for sensitive information
   - Avoid hardcoding credentials in DAG definitions

2. **Naming**:
   - Use clear, descriptive parameter names
   - Follow consistent naming conventions

3. **Task Declaration**:
   - Always declare parameters used by tasks
   - Only expose necessary parameters to tasks

4. **Default Values**:
   - Provide sensible defaults when possible
   - Document expected parameter formats

## Parameter Scoping

- Parameters are available to tasks that explicitly declare them
- Each task can access only its declared parameters
- Parameter values are immutable during execution

